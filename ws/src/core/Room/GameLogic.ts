import { Player } from "../Players/Player";
import { ActivateCardOnFieldRequest, GameLogicRepository, GetPlayersRenderRequest, GetPlayersRenderResponse, InitGameRequest, SetCardOnFieldRequest, SetCardOnFieldResponse } from "../Repository/GameLogic-repository";


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
        player.setCardOnField(card, field_id)

        return {
            player
        }
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
}