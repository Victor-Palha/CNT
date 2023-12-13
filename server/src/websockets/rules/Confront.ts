import { Avatars, Cards } from "@prisma/client";
import { CntRepository } from "./CNTRepository";

export interface ConfrontRoom{
    room_id: string;
    players: PlayerProps[]
}

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

    constructor(private cnt: CntRepository){}

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

    get getRoom(){
        return this.confrontRoom
    }

    shuffle(deck: Cards[]) {
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
}