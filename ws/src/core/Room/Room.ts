import { Card } from "../Cards/Card";
import { Field, Player } from "../Players/Player";

type Rooms = {
    room_id: string;
    player_host: Player;
    player_guest: Player;
    room_status?: 0 | 1 | 2 | 3;
    // 0 - etapa de compra
    // 1 - etapa de preparação
    // 2 - etapa de ação
    // 3 - Climax
    sockets: string[];
}

interface CardQueue {
    field_id: string;
    target: string | null;
    player: Player;
    enemy: Player;
}

type Historic = {
    player: string;
    turn: number;
    action: string;
    card: Card;
    target?: string;
}

export class OldGameRoom {
    readonly room_id: string;
    private player_host: Player;
    private player_guest: Player;
    
    private turn: number = 1;
    private turnOwner: string;
    private chainEffects: CardQueue[] = [];
    private inChain: boolean;
    private room_state: 0 | 1 | 2 | 3;
    private winner: string | null = null;
    // This sockets represents the sockets that are in the room
    private sockets: string[] = [];
    private historic: Historic[] = [];
    

    constructor({room_id, player_host, player_guest, sockets}: Rooms){
        this.room_id = room_id;
        this.player_host = player_host;
        this.player_guest = player_guest;
        this.turnOwner = "";
        this.inChain = false;
        this.room_state = 1;

        this.sockets = sockets;
    }

    public initGame(): OldGameRoom{
        this.player_host.shuffleDeck();
        this.player_guest.shuffleDeck();

        // Draw 4 cards for each player
        for(let i = 0; i < 4; i++){
            this.player_host.drawCard();
            this.player_guest.drawCard();
        }

        // Set turn owner based on avatar type
        const host = this.setTurnOwner(this.player_host.avatar.type)
        const guest = this.setTurnOwner(this.player_guest.avatar.type)
        
        if(host < guest){
            this.turnOwner = this.player_host.id;
        }
        else if(host > guest){
            this.turnOwner = this.player_guest.id;
        }
        // Randomize turn owner if both players have the same type
        else{
            const randomPlayerStart = Math.floor(Math.random() * 2) + 1;
            if(randomPlayerStart === 1){
                this.turnOwner = this.player_host.id;
            }else{
                this.turnOwner = this.player_guest.id;
            }
        }

        return this;
    }

    public setCardOnField(player_id: string, card: any, field_id: string): {player: Player, gameState: number}{
        const { player, opponent } = this.getPlayers(player_id);
        // Set card on field of player and initialize the card effect
        player.setCardOnField(new Card({
            id_card: card._id,
            ...card
        }), field_id);

        // Verify if all cards are on field
        const allCardsAreSetted = (player_field: Field[], opponent_field: Field[]) => {
            const fields = [...player_field, ...opponent_field];
            return fields.every(field => field.empty === false);
        }

        // If all cards are on field, start action phase
        if(allCardsAreSetted(player.field, opponent.field)){
            this.changePhase = 2;
        }

        return {player, gameState: this.roomState};
    }

    public skipTurn(player_id: string){
        if (this.room_state !== 2) {
            throw new Error("You can only skip the turn in the action phase");
        }
    
        const { player, opponent } = this.getPlayers(player_id);
    
        if (!player.can_skip_turn) {
            throw new Error("Player can't skip the turn");
        }
    
        player.skip_turn();
    
        // if neither player can skip the turn, the game goes to the next phase
        // and if after the skip all cards from opponent are already activated
        const opponentField = opponent.field.filter((field)=> !field.empty);
        const opponentActivatedAllCards = opponentField.every(field => field.card !== null && field.card.isActivate);
        if (!opponent.can_skip_turn || opponentActivatedAllCards) {
            this.changePhase = 3;
        } else {
            this.turnOwner = opponent.id;
        }
    
        return {
            turnOwner: this.turnOwner,
            gameState: this.roomState,
            id: this.room_id,
        };
    }

    public activeCard(field_id: string, player_id: string, target?: string){
        // get player and opponent instances by id
        // the player who activated the card is the 'player'
        const { player, opponent } = this.getPlayers(player_id);
        const field = player.field.find(field => field.field_id === field_id);
        if(!field){
            throw new Error("Field not found");
        }
        const card = field.card;
        if(!card){
            throw new Error("Card not found");
        }
        if(card.activateCard === true){
            throw new Error("Card already activated");
        }
        // Set card as activated
        card.activateCard = true;
        
        // the card effect must go to the queue until be resolved
        this.chain = true;
        this.setChainEffects({
            field_id: field.field_id,
            target: target ? target : null,
            player: player,
            enemy: opponent,
        });
        // add action to historic
        this.historic.push({
            player: player.id,
            turn: this.turnNumber,
            action: "activate",
            card: card,
            target: target ? target : undefined,
        });
        // Possible response to ability card
        const cardFromField = opponent.field.filter((field)=>{
            return !field.empty && field.card && !field.card.isActivate;
        })
        //if there is a possible response, return the options
        const abilityCards = cardFromField.filter((card) => {
            return card.card && card.card.type === "HABILIDADE" ||  card.card && card.card.type === "HABILIDADE_UNICA";
        });
        if(abilityCards.length > 0){
            return abilityCards;
        }
        //Else just resolve Chain
        this.resolveChain()
        return false;
    }

    private setChainEffects(cardEffect: CardQueue): void{
        this.chainEffects.push(cardEffect);
    }

    private resolveChainEffects() {
        // Resolver a fila de espera (corrente de efeitos)
        while (this.chainEffects.length > 0) {
            // pass turn in the end of chain to the enemy of the player who started the chain.
            if(this.chainEffects.length === 1){
                const enemy = this.chainEffects[0].enemy;

                this.turnOwner = enemy.id;
                if (!enemy.can_skip_turn || enemy.field.every(field => field.card?.isActivate)) {
                    this.changePhase = 3;
                }
            }
            const effect = this.chainEffects.pop(); // Remove o último efeito da fila
            if (effect) {
                const field = effect.player.field.find(field => field.field_id === effect.field_id) as Field;
                const cardFromField = field.card;
                if(cardFromField){
                    if(!cardFromField.isNegated){
                        cardFromField.cardEffect.applyEffect({
                            player: effect.player,
                            enemy: effect.enemy,
                            target: effect.target
                        })
                        cardFromField.effectOccurred = true;
                    }
                }
            }
        }
    }

    public resolveChain() {
        this.resolveChainEffects();
        this.chain = false;
    }

    private setTurnOwner(type: "OFENSIVO" | "DEFENSIVO" | "MODERADO"): number{
        switch (type) {
            case "OFENSIVO":
              return 1;
            case "DEFENSIVO":
              return 2;
            case "MODERADO":
              return 3;
          }
    }

    public getPlayers(id: string): {player: Player, opponent: Player}{
        const player = [this.player_host, this.player_guest].find(player => player.id === id);
        const opponent = [this.player_host, this.player_guest].find(player => player.id !== id);
        if(!player || !opponent){
            throw new Error("Player not found");
        }
        return {
            player,
            opponent
        };
    }

    get historicGame(){
        return this.historic;
    }

    set changePhase(value: 0 | 1 | 2 | 3){
        this.room_state = value;
    }

    get turnNumber(): number{
        return this.turn;
    }

    get turnOwnerPlayer(): string{
        return this.turnOwner
    }

    get roomState(): number{
        return this.room_state;
    }

    public climaxPhase(){
        if (this.roomState !== 3) {
            throw new Error("You can only start the climax phase when the room state is 3");
        }
        
        const host = { id: this.player_host.id, avatar: this.player_host.avatar, damageModify: this.player_host.damageMultiplierValue, selfDamageModify: this.player_host.selfDamageMultiplierValue };
        const guest = { id: this.player_guest.id, avatar: this.player_guest.avatar, damageModify: this.player_guest.damageMultiplierValue, selfDamageModify: this.player_guest.selfDamageMultiplierValue  };
        
        // damage calculation
        const hostDamageCaused = host.avatar.atk - guest.avatar.def;
        const guestDamageCaused = guest.avatar.atk - host.avatar.def;
        // if the difference is greater than 0, the damage is dealt to the opponent
        // if the difference is less than 0, the damage is dealt to the player
        if(guestDamageCaused > 0){
            host.avatar.changeHitPoints = (guestDamageCaused * guest.damageModify);
        }else{
            guest.avatar.changeHitPoints = guestDamageCaused * guest.selfDamageModify;
        }
    
        if(hostDamageCaused > 0){
            guest.avatar.changeHitPoints = (hostDamageCaused * host.damageModify);
        }else{
            host.avatar.changeHitPoints = (hostDamageCaused * host.selfDamageModify);
        }

        // Check if any player is dead
        if(host.avatar.hp <= 0){
            this.winner = guest.id;
        }else if(guest.avatar.hp <= 0){
            this.winner = host.id;
        }
        
        // Update room state and turn
        this.room_state = 0;
        this.turn += 1;
        // Reset all cards on field and hand
        // Cards that was activated are removed from field and put on the end of the deck
        // Cards that was not activated are removed from field and put on the hand
        this.player_host.resetField({
            player: this.player_host,
            enemy: this.player_guest,
        });
        this.player_guest.resetField({
            player: this.player_guest,
            enemy: this.player_host,
        });

        this.room_state = 1;
    }

    get winnerPlayer(){
        return this.winner;
    }

    set winnerPlayer(value: string | null){
        this.winner = value;
    }

    get chain(){
        return this.inChain
    }

    set chain(value: boolean){
        this.inChain = value;
    }

    get chainQueue(){
        return this.chainEffects.length;
    }

    get socketsPlayers(){
        return this.sockets;
    }

    public newSocketsPlayers(oldSocket: string, newSocket: string){
        //delete old socket
        const index = this.sockets.indexOf(oldSocket);
        if(index > -1){
            this.sockets.splice(index, 1);
        }
        //add new socket
        this.sockets.push(newSocket);
    }
}