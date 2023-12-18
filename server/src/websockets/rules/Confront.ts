import { Avatars, Cards } from "@prisma/client";
import { CNT } from "./CNT";

export interface ConfrontRoom{
    room_id: string;
    players: PlayerProps[];
    state: 0 | 1 | 2 | 3
}
// 0 - etapa de compra
// 1 - etapa de preparação
// 2 - etapa de ação
// 3 - Climax

type PlayerProps = {
    player: string;
    socket_id: string;
    isPlayerTurn: boolean;
    avatar: Avatars
    hand: Cards[];
    deck: Cards[];
    field: {
        id: string;
        card: Cards;
        empty: boolean;
        activated: {
            isActivated: boolean;
            chain: number;
        }
    }[]
}
type Players = {
    player: string;
    socket_id: string;
    deck_id: string;
}

export class Confront{
    private confrontRoom: ConfrontRoom = {} as ConfrontRoom

    constructor(private cnt: CNT){}

    public async PrepareField(players: Players[], room_id: string) {
        // Prepara os jogadores para o confronto
        const preparePlayers: PlayerProps[] = await Promise.all(players.map(async (player) => {
            this.cnt.id = player.player;
            const deck = await this.cnt.getDeck(player.deck_id);
    
            const currentDeck = this.shuffle(deck?.cards as Cards[]);
            const hand: Cards[] = [];
    
            for (let i = 0; i < 4; i++) {
                hand.push(currentDeck.pop() as Cards);
            }
    
            const playerData: PlayerProps = {
                player: player.player,
                socket_id: player.socket_id,
                isPlayerTurn: false,
                avatar: deck?.avatar as Avatars,
                deck: currentDeck,
                hand: hand,
                field: [{
                    id: `${player.player}-1`,
                    card: {} as Cards,
                    empty: true,
                    activated: {
                        isActivated: false,
                        chain: 0
                    }
                },
                {
                    id: `${player.player}-2`,
                    card: {} as Cards,
                    empty: true,
                    activated: {
                        isActivated: false,
                        chain: 0
                    }
                },
                {
                    id: `${player.player}-3`,
                    card: {} as Cards,
                    empty: true,
                    activated: {
                        isActivated: false,
                        chain: 0
                    }
                }]
            };
    
            return playerData;
        }));

        // Ordena os jogadores com base nos tipos (OFENSIVO, DEFENSIVO, MODERADO)
        const sortedPlayers = preparePlayers.sort(
            (a, b) => this.getAvatarOrder(a.avatar) - this.getAvatarOrder(b.avatar)
        );
    
        // Define a ordem de início com base nos tipos
        sortedPlayers[0].isPlayerTurn = true;

        this.confrontRoom.room_id = room_id;
        this.confrontRoom.players = preparePlayers;
        // O jogo no primeiro turno começa na etapa de preparação
        this.confrontRoom.state = 1;

        return this.confrontRoom
    }

    private getAvatarOrder(avatar: Avatars): number {
        switch (avatar.type_avatar) {
          case "OFENSIVO":
            return 1;
          case "DEFENSIVO":
            return 2;
          case "MODERADO":
            return 3;
          default:
            return 0;
        }
    }

    private shuffle(deck: Cards[]) {
        let currentIndex = deck.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [deck[currentIndex], deck[randomIndex]] = [
            deck[randomIndex], deck[currentIndex]];
        }
      
        return deck;
    }
    
    private startActionPhase(){
        const allCardsAreSetted = this.confrontRoom.players.every(field => field.field.every(card => !card.empty))
        if(allCardsAreSetted){
            this.confrontRoom.state = 2
        }
    }

    public setCardOnField(playerName: string, card: Cards, field_id: string){
        this.confrontRoom.players.map(player => {
            if(player.player === playerName){
                // Set Card in Field
                player.field.map((field)=>{
                    if(field.id === field_id){
                        if(!field.empty){
                            throw new Error('Campo já ocupado')
                        }
                        field.card = card
                        field.empty = false
                    }
                })
                // Remove Card from Hand
                const indexToRemove = player.hand.findIndex(hand => hand.id_card === card.id_card);

                if (indexToRemove !== -1) {
                    player.hand.splice(indexToRemove, 1);
                }
            }
        })
        this.startActionPhase()
    }

    public ativateCard(playerName: string, field_id: string){
        const cardActivated = this.confrontRoom.players.map(player => {
            if(player.player === playerName){
                // Get Card in Field
                const card = player.field.find(field => field.id === field_id)
                if(!card){
                    throw new Error('Campo não encontrado')
                }

                // Activate Card
                card.activated.isActivated = true
                if(card.card.type_card === "HABILIDADE" || card.card.type_card === "HABILIDADE_UNICA"){
                    card.activated.chain = 1
                }
                return card.card
            }
        })

        return cardActivated
    }

    get getRoom(){
        return this.confrontRoom
    }
}