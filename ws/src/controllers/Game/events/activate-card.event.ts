import { Socket } from "socket.io";
import { Game } from "..";
type ActivateCardData = {
    field_id: string;
    room_id: string;
    player_id: string;
    target?: string;
}
export function ActivateCard(socket: Socket, INSTANCE: Game){
    socket.on("activate_Card", (data: ActivateCardData)=>{
        const {room_id, player_id, field_id, target} = data;
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_Not_Found")
            return
        }
        const {cardActivated} = room.gameLogic.activateCardOnField({
            field_id,
            player_id,
            player_guest: room.player_guest,
            player_host: room.player_host
        })

        room.gameState.setInChain = true

        room.gameState.setChainEffects = {
            player: room.player_host,
            enemy: room.player_guest,
            field_id,
            target: target || null
        }

        room.gameState.setHistoric = {
            player: player_id,
            turn: room.gameState.getTurnNumber,
            action: "activate_Card",
            card: cardActivated,
            target
        }

        const {opponent} = room.gameLogic.getPlayersRender({
            player_host: room.player_host,
            player_guest: room.player_guest,
            player_id
        })

        // Possible response to ability card
        const cardFromField = opponent.field.filter((field)=>{
            return !field.empty && field.card && !field.card.isActivate;
        })
        //if there is a possible response, return the options
        const abilityCards = cardFromField.filter((card) => {
            return card.card && card.card.type === "HABILIDADE" ||  card.card && card.card.type === "HABILIDADE_UNICA";
        });
        
        const {to_player, to_enemy} = INSTANCE.renderGame(room, player_id)

        if(abilityCards.length > 0){
            socket.broadcast.to(room_id).emit("enemy_Activate_Ability", {
                response: abilityCards,
                to_enemy
            })
        }else {
            socket.broadcast.to(room_id).emit("enemy_Activate_Card", to_enemy)
        }

        socket.emit("i_Activate_Card", to_player)
    })
}