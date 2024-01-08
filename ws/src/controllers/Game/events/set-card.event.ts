import { Socket } from "socket.io";
import { Game } from "..";
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
        const {gameState} = room.setCardOnField(player_id, card, field_id)
        const {to_player, to_enemy} = INSTANCE.renderGame(room, player_id)

        socket.emit("i_Set_Card", to_player)
        socket.broadcast.to(room_id).emit("enemy_Set_Card", to_enemy)

        if(gameState === 2){
            INSTANCE._io.of("/game").to(room_id).emit("start_Action_Phase", gameState)
        }
    })
}