import { Socket } from "socket.io";
import { Game } from "..";
import { Field } from "../../../core/Players/Player";
type SetCardData = {
    room_id: string;
    player_id: string;
    card: any;
    field_id: string;
}

export function SetCard(socket: Socket, INSTANCE: Game){
    socket.on("set_Card", (data: SetCardData)=>{
        const {room_id, player_id, card, field_id} = data;
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_Not_Found")
            return
        }

        const {player, opponent} = room.gameLogic.getPlayersRender({
            player_id,
            player_guest: room.player_guest,
            player_host: room.player_host
        
        })

        room.gameLogic.setCardOnField({
            card,
            field_id,
            player
        })

        // If all cards are on field, start action phase
        if(allCardsAreSetted(player.field, opponent.field)){
            room.gameState.setRoomState = 2
        }

        const {to_player, to_enemy} = INSTANCE.renderGame(room, player_id)

        socket.emit("i_Set_Card", to_player)
        socket.broadcast.to(room_id).emit("enemy_Set_Card", to_enemy)

        if(room.gameState.getRoomState === 2){
            INSTANCE._io.of("/game").to(room_id).emit("start_Action_Phase", 2)
        }
    })
}

// Verify if all cards are on field
const allCardsAreSetted = (player_field: Field[], opponent_field: Field[]) => {
    const fields = [...player_field, ...opponent_field];
    return fields.every(field => field.empty === false);
}