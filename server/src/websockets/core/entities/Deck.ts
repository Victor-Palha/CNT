import { randomUUID } from "crypto";
import { Avatar } from "./Avatar";
import { Cards } from "./Cards";
interface IDeck {
    id_deck?: string;
    name: string;
    avatar: Avatar;
    cards: Cards[];
    id_player: string;

}
export class Deck{
    private id_deck: string;
    private name: string;
    private avatar: Avatar;
    private cards: Cards[];
    private id_player: string;

    constructor({id_deck, name, cards, id_player, avatar}: IDeck){
        this.id_deck = id_deck ? id_deck : randomUUID();
        this.name = name;
        this.id_player = id_player;
        this.cards = cards;
        this.avatar = avatar;
    }

    get getDeck(){
        return {
            id_deck: this.id_deck,
            name: this.name,
            avatar: this.avatar,
            id_player: this.id_player,
            cards: this.cards
        }
    }
    get avatard(){
        return this.avatar
    }
}