import { Avatar } from "../Avatares/Avatar";
import { Card } from "../Cards/Card";

type Players = {
    player_id: string;
    player_name: string;
    player_avatar: Avatar;
    player_deck: Card[];
    player_hand: Card[];
    player_field?: Field[];
}

export type Field = {
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
    private player_can_skip_turn: boolean;
    private player_max_cards_hand: number;
    private player_field: Field[];
    private damageMultiplier: number = 1;
    private selfDamageMultiplier: number = 1;

    constructor({player_id, player_name, player_avatar, player_deck, player_hand}: Players){
        this.player_id = player_id;
        this.player_name = player_name;
        this.player_avatar = player_avatar;
        this.player_deck = player_deck;
        // if skip_turn_count is 1, the player can skip the turn
        // if skip_turn_count is 0, the player can't skip the turn
        this.player_can_skip_turn = true;
        this.player_max_cards_hand = 4;
        this.player_hand = player_hand;

        this.player_field = [{
            field_id: `${this.player_name}-1`,
            card: null,
            empty: true
        }, {
            field_id: `${this.player_name}-2`,
            card: null,
            empty: true
        }, {
            field_id: `${this.player_name}-3`,
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

        if(field && field.empty){
            field.card = card;
            field.empty = false;
        }

        const index = this.player_hand.findIndex(hand =>{ 
            if(hand.id_card === card.id_card) return hand;
        });

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

    get hand(){
        return this.player_hand;
    }

    get deck(){
        return this.player_deck;
    }

    set max_cards_hand(max_cards_in_hand: number){
        this.player_max_cards_hand = max_cards_in_hand;
    }

    get max_cards_hand(){
        return this.player_max_cards_hand;
    }

    public skip_turn(){
        if(this.player_can_skip_turn){
            this.player_can_skip_turn=false;
        }
    }

    get can_skip_turn(){
        return this.player_can_skip_turn;
    }

    get damageMultiplierValue(){
        return this.damageMultiplier;
    }
    set damageMultiplierValue(value: number){
        this.damageMultiplier = value;
    }

    get selfDamageMultiplierValue(){
        return this.selfDamageMultiplier;
    }

    set selfDamageMultiplierValue(value: number){
        this.selfDamageMultiplier = value;
    }

    public resetField({ player, enemy }: ResetField) {
        this.player_field.forEach(field => {
            if (field.card !== null) {
                if (field.card.isActivate) {
                    field.card.turns--;
    
                    if (field.card.turns === 0) {
                        this.handleDeactivatedCard(field.card, player, enemy, field);
                    }
                } else {
                    this.handleNonActivateCard(field);
                }
            }
        });
    
        this.player_can_skip_turn = true;
    
        while (this.hand.length < this.max_cards_hand) {
            this.drawCard();
        }
    }
    
    private handleDeactivatedCard(card: Card, player: Player, enemy: Player, field: Field) {
        if (card.owner === player.id) {
            this.deck.unshift(card);
        } else {
            enemy.deck.unshift(card);
        }
    
        if (!card.isNegated || card.effectOccurred) {
            card.cardEffect.revertEffect({ player, enemy });
            card.effectOccurred = false;
        }
    
        field.card = null;
        field.empty = true;
    }
    
    private handleNonActivateCard(field: Field) {
        this.hand.push(field.card as Card);
        field.card = null;
        field.empty = true;
    }
}

type ResetField = {
    player: Player;
    enemy: Player;
}