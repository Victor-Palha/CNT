import { Card } from "../Cards/Card";

type Players = {
    player_id: string;
    player_name: string;
    player_avatar: Avatar;
    player_deck: Card[];
    player_hand: Card[];
    player_hit_points: number;
    player_field: Field[];
}

type Field = {
    field_id: string,
    card: Card | null,
    empty: boolean
}

export class Player{
    private player_id: string;
    private player_name: string;
    private player_avatar: Avatar;
    private player_deck: Card[];
    private player_hand: Card[];
    private player_hit_points: number;
    private player_field: Field[];

    constructor({player_id, player_name, player_avatar, player_deck, player_hand, player_hit_points}: Players){
        this.player_id = player_id;
        this.player_name = player_name;
        this.player_avatar = player_avatar;
        this.player_deck = player_deck;
        this.player_hand = player_hand;
        this.player_hit_points = player_hit_points;

        this.player_field = [{
            field_id: `${this.player_id}-1`,
            card: null,
            empty: true
        }, {
            field_id: `${this.player_id}-2`,
            card: null,
            empty: true
        }, {
            field_id: `${this.player_id}-3`,
            card: null,
            empty: true
        }]
    }

    public shuffleDeck(){
        const deck = this.player_deck;
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

    public setCardOnField(card: Card, field_id: string){
        const field = this.player_field.find(field => field.field_id === field_id);

        if(field){
            field.card = card;
            field.empty = false;
        }

        const index = this.player_hand.findIndex(hand => hand.id_card === card.id_card);

        if(index >= 0){
            this.player_hand.splice(index, 1);
        }
    }

    public drawCard(){
        const card = this.player_deck.pop();

        if(card){
            this.player_hand.push(card);
        }
    }

    get field(){
        return this.player_field;
    }

    get avatar(){
        return this.player_avatar;
    }

    get id(){
        return this.player_id;
    }
}