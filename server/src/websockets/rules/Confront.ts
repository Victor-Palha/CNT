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
        activated: boolean;
        chain: number
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
                field: []
            };
    
            return playerData;
        }));

        this.confrontRoom.room_id = room_id;
        this.confrontRoom.players = preparePlayers;

        return this.confrontRoom
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