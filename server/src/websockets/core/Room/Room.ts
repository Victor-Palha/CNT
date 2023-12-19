import { Card } from "../Cards/Card";
import { CardEffect } from "../Cards/Cards-Effects/Card-Effect";
import { Player } from "../Players/Player";

type Rooms = {
    room_id: string;
    player_host: Player;
    player_guest: Player;
    turnOwner?: string;
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
    private turnOwner: string;
    private chainEffects: CardQueue[] = [];
    private room_status: 0 | 1 | 2 | 3;

    constructor({room_id, player_host, player_guest}: Rooms){
        this.room_id = room_id;
        this.player_host = player_host;
        this.player_guest = player_guest;
        this.turnOwner = "";
        this.room_status = 1;
    }

    public initGame(){
        this.player_host.shuffleDeck();
        this.player_guest.shuffleDeck();

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

    public activeCard(field_id: string, player_id: string){
        const { player, opponent } = this.getPlayerById(player_id);
        const field = player.field.find(field => field.field_id === field_id);
        if(!field){
            throw new Error("Field not found");
        }
        const card = field.card;
        if(!card){
            throw new Error("Card not found");
        }

        // Lógica para ativar a carta | Se a carta for de habilidade, adicionar na fila de espera | **adicionar Habilidade Unica na pilha de efeitos**
        card.ativateCard = true;
        if(card.type !== "HABILIDADE"){
            this.applyImmediateEffect(card, player, opponent);
        }else{
            this.setChainEffects({
                id_card: card.id_card,
                applyEffect: card.cardEffect.applyEffect
            });
        }

        this.turnOwner = opponent.id;
    }

    private applyImmediateEffect(card: Card, player: Player, opponent: Player) {
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

    public resolveChain() {
        this.resolveChainEffects();
    }

    private setChainEffects(cardEffect: CardQueue){
        this.chainEffects.push(cardEffect);
    }

    private setTurnOwner(type: "OFENSIVO" | "DEFENSIVO" | "MODERADO"){
        switch (type) {
            case "OFENSIVO":
              return 1;
            case "DEFENSIVO":
              return 2;
            case "MODERADO":
              return 3;
          }
    }

    public getPlayerById(id: string){
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

    public startActionPhase(){
        console.log("Action Phase");
        this.room_status = 2;
    }

    public getRoom(){
        return {
            room_id: this.room_id,
            player_host: this.player_host,
            player_guest: this.player_guest,
            turnOwner: this.turnOwner,
            room_status: this.room_status
        }
    }
}