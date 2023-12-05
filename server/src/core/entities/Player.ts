import { randomUUID } from "crypto";
import { Deck } from "./Deck";
interface IPlayer{
    id_player?: string;
    username: string;
    email: string;
    password: string;
    decks?: Deck[];
}
export class Player{
    id_player: string;
    username: string;
    email: string;
    password: string;
    decks: Deck[] | null;
    constructor({id_player, username, email, password, decks}: IPlayer){
        this.id_player = id_player ? id_player : randomUUID();
        this.username = username;
        this.email = email;
        this.password = password;
        this.decks = decks ? decks : null;
    }

    get getPlayer(){
        return {
            id_player: this.id_player,
            username: this.username,
            email: this.email,
            password: this.password,
            decks: this.decks
        }
    }
}