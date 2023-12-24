import { Card } from "../Cards/Card";
import { CardEffect } from "../Cards/Cards-Effects/Card-Effect";
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
}

interface CardQueue extends CardEffect {
    id_card: string;
}

export class Room {
    readonly room_id: string;
    private player_host: Player;
    private player_guest: Player;
    private turn: number = 1;
    private turnOwner: string;
    private chainEffects: CardQueue[] = [];
    private room_state: 0 | 1 | 2 | 3;

    constructor({room_id, player_host, player_guest}: Rooms){
        this.room_id = room_id;
        this.player_host = player_host;
        this.player_guest = player_guest;
        this.turnOwner = "";
        this.room_state = 1;
    }

    public initGame(): Room{
        this.player_host.shuffleDeck();
        this.player_guest.shuffleDeck();

        // Draw 4 cards for each player
        for(let i = 0; i < 4; i++){
            this.player_host.drawCard();
            this.player_guest.drawCard();
        }

        // Set turn owner based on avatar type
        const host = this.setTurnOwner(this.player_host.avatar.type)
        const guest = this.setTurnOwner(this.player_host.avatar.type)
        
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
        const { player, opponent } = this.getPlayerById(player_id);
        // Set card on field of player
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
            this.startActionPhase();
        }

        return {player, gameState: this.roomState};
    }

    public skipTurn(player_id: string): string | number{
        if(this.room_state !== 2){
            throw new Error("You only can skip the turn in action phase");
        }
        const { player, opponent } = this.getPlayerById(player_id);

        if(player.can_skip_turn === false){
            throw new Error("Player can't skip the turn");
        }
        player.skip_turn();
        // if neither player can skip the turn, the game goes to the next phase
        if(opponent.can_skip_turn === false){
            this.startClimaxPhase();
            return this.roomState;
        }else{
            this.turnOwner = opponent.id;
            return this.turnOwner;
        }
    }

    public activeCard(field_id: string, player_id: string): void{
        // get player and opponent instances by id
        // the player who activated the card is the player
        const { player, opponent } = this.getPlayerById(player_id);
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
        // Lógica para ativar a carta | Se a carta for de habilidade ou habilidade unica, adicionar na fila de espera
        card.activateCard = true;
        if(card.type === "OFENSIVA" || card.type === "DEFENSIVA"){
            this.applyImmediateEffect(card, player, opponent);
        }else{
            this.setChainEffects({
                id_card: card.id_card,
                applyEffect: card.cardEffect.applyEffect
            });
        }
        // If all cards are activated, start climax phase
        const allCardsAreActivated = (player_field: Field[], opponent_field: Field[]) => {
            const fields = [...player_field, ...opponent_field];
            return fields.every(field => field.card?.activateCard === true);
        }
        if(allCardsAreActivated(player.field, opponent.field)){
            this.startClimaxPhase();
        }

        this.turnOwner = opponent.id;
    }

    private applyImmediateEffect(card: Card, player: Player, opponent: Player): void {
        // Lógica para aplicar imediatamente o efeito da carta ao jogador ou oponente
        switch (card.id_card) {
            case "8eb8961e-b2c1-47fa-8a29-be31d42de60b":
                card.cardEffect?.applyEffect(player.avatar)
                return
            case "4875dcd2-d13d-4425-9c05-1472bdb9466c":
                card.cardEffect?.applyEffect(player.avatar)
                return
            case "af7530ea-a6ce-48cb-9bd7-b71f28cf899e":
                card.cardEffect?.applyEffect(opponent.avatar)
                return
            // Adicione mais casos conforme necessário
        }
    }

    private setChainEffects(cardEffect: CardQueue): void{
        this.chainEffects.push(cardEffect);
    }

    private resolveChainEffects() {
        // Resolver a fila de espera (corrente de efeitos)
        while (this.chainEffects.length > 0) {
            const effect = this.chainEffects.pop(); // Remove o último efeito da fila
            if (effect) {
                // Lógica para aplicar o efeito
                switch (effect.id_card) {
                    case "8eb8961e-b2c1-47fa-8a29-be31d42de60b":
                        effect.applyEffect({});
                        return
                    case "4875dcd2-d13d-4425-9c05-1472bdb9466c":
                        effect.applyEffect({});
                        return
                    case "af7530ea-a6ce-48cb-9bd7-b71f28cf899e":
                        effect.applyEffect({});
                        return
                    // Adicione mais casos conforme necessário
                }
            }
        }
    }
    // todo: adicionar evento para resolver corrente de efeitos
    public resolveChain() {
        this.resolveChainEffects();
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

    public getPlayerById(id: string): {player: Player, opponent: Player}{
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

    private startActionPhase(): void{
        console.log("Action Phase");
        this.room_state = 2;
    }

    private startClimaxPhase(): void{
        console.log("Climax Phase");
        this.room_state = 3;
    }

    public getRoom(){
        return {
            room_id: this.room_id,
            player_host: this.player_host,
            player_guest: this.player_guest,
            turnOwner: this.turnOwner,
            room_state: this.room_state
        }
    }

    get turnOwnerPlayer(): string{
        return this.turnOwner
    }

    get roomState(): number{
        return this.room_state;
    }
}