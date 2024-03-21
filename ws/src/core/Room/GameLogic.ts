import { Card } from "../Cards/Card";
import { Field, Player } from "../Players/Player";
import { ActivateCardOnFieldRequest, ClimaxPhaseResolverRequest, GameLogicRepository, GetPlayersRenderRequest, GetPlayersRenderResponse, InitGameRequest, ResolveChainEffectsRequest, ResolveChainEffectsResponse, SetCardOnFieldRequest, SetCardOnFieldResponse, SkipTurnRequest, SkipTurnResponse } from "../Repository/GameLogic-repository";


export class GameLogic implements GameLogicRepository {

    public initOfTheGame({playerHost, playerGuest}: InitGameRequest){
        playerGuest.shuffleDeck()
        playerHost.shuffleDeck()

        for(let i = 0; i < 4; i++){
            playerGuest.drawCard();
            playerHost.drawCard();
        }

        const hostTurn = this.setTurnOwner(playerHost.avatar.type)
        const guestTurn = this.setTurnOwner(playerGuest.avatar.type)

        if(hostTurn < guestTurn){
            return playerHost
        }else if(hostTurn > guestTurn){
            return playerGuest
        }else{
            return Math.random() > 0.5 ? playerHost : playerGuest
        }
    }

    public setTurnOwner(type: "OFENSIVO" | "DEFENSIVO" | "MODERADO"): number{
        switch (type) {
            case "OFENSIVO":
              return 1;
            case "DEFENSIVO":
              return 2;
            case "MODERADO":
              return 3;
          }
    }
    
    public getPlayersRender({ player_host, player_guest, player_id }: GetPlayersRenderRequest): GetPlayersRenderResponse {

        const player = [player_host, player_guest].find(player => player.id === player_id);
        const opponent = [player_host, player_guest].find(player => player.id !== player_id);

        if(!player || !opponent){
            throw new Error("Player not found");
        }
        return {
            player,
            opponent
        };
    };

    public setCardOnField({card, field_id, player}: SetCardOnFieldRequest): SetCardOnFieldResponse{
        player.setCardOnField(new Card({
            id_card: card._id,
            ...card
        }), field_id)

        return {player};
    }
    // Add others methods from setCardOnField
    public activateCardOnField({ player_id, field_id, player_guest, player_host }: ActivateCardOnFieldRequest){

        const {player} = this.getPlayersRender({player_host, player_guest, player_id})

        const CardOnFieldThatWillActivate = player.field.find(card => card.field_id === field_id)

        if(!CardOnFieldThatWillActivate){
            throw new Error("Card not found")
        }

        const cardToActivate = CardOnFieldThatWillActivate.card

        if(!cardToActivate){
            throw new Error("Card not found")
        }
        if(cardToActivate.activateCard){
            throw new Error("Card already activated")
        }

        cardToActivate.activateCard = true

        return {
            cardActivated: cardToActivate
        }
    };

    public resolveChainEffects({effect_queue}: ResolveChainEffectsRequest): ResolveChainEffectsResponse{
        let gameState = 2
        let new_turn_owner = ""
        while (effect_queue.length > 0) {
            if(effect_queue.length === 1){
                const enemy = effect_queue[0].enemy

                if(!enemy.can_skip_turn || enemy.field.every(field => field.card?.isActivate)){
                    gameState = 3
                }
                new_turn_owner = enemy.id
            }
            const effectFromQueue = effect_queue.pop()
            if(effectFromQueue){
                const cardRelatedToEffect = effectFromQueue.player.field.find(field => field.field_id === effectFromQueue.field_id)?.card

                if(!cardRelatedToEffect){
                    throw new Error("Card not found")
                }

                if(!cardRelatedToEffect.isNegated){
                    cardRelatedToEffect.cardEffect.applyEffect({
                        player: effectFromQueue.player,
                        enemy: effectFromQueue.enemy,
                        target: effectFromQueue.target
                    })

                    cardRelatedToEffect.effectOccurred = true;
                }
            }
        }

        return {
            gameState,
            new_turn_owner
        }
    };
    
    public skipTurn ({gameState, player_guest, player_host, player_id}: SkipTurnRequest): SkipTurnResponse {
        
        if(gameState !== 2){
            throw new Error("You can only skip the turn in the action phase");
        }
        let newGameState: number = gameState;
        let setTurnOwner: string = player_id;

        const {player, opponent} = this.getPlayersRender({player_host, player_guest, player_id})

        if(player.can_skip_turn === false){
            throw new Error("Player can't skip the turn");
        }else{
            player.skip_turn()
        }

        // if neither player can skip the turn, the game goes to the next phase
        // and if after the skip all cards from opponent are already activated
        const opponentField = opponent.field.filter((field)=> !field.empty);

        const opponentActivatedAllCards = opponentField.every(field => field.card !== null && field.card.isActivate);

        if (!opponent.can_skip_turn || opponentActivatedAllCards) {
            newGameState = 3;
        } else {
            setTurnOwner = opponent.id;
        }
    
        return {
            new_turn_owner: setTurnOwner,
            gameState: newGameState,
        };
    };

    public climaxPhaseResolver({player_guest, player_host}: ClimaxPhaseResolverRequest){
        const host = { 
            id: player_host.id, 
            avatar: player_host.avatar,
            damageModify: player_host.damageMultiplierValue, 
            selfDamageModify: player_host.selfDamageMultiplierValue 
        }

        const guest = { 
            id: player_guest.id, 
            avatar: player_guest.avatar, 
            damageModify: player_guest.damageMultiplierValue, 
            selfDamageModify: player_guest.selfDamageMultiplierValue  
        };

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
            return {
                winner: guest.id
            }
        }else if(guest.avatar.hp <= 0){
            return {
                winner: host.id
            }
        }

        return {
            winner: null,
            new_state_game: 0,
        }
    };

    public newTurn({ player_guest, player_host }: ClimaxPhaseResolverRequest){

        player_host.resetField({
            player: player_host,
            enemy: player_guest,
        });

        player_guest.resetField({
            player: player_guest,
            enemy: player_host,
        });

        return {
            new_state_game: 1,
        }
    };
}