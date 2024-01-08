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
        const isAbility = room.activeCard(field_id, player_id, target)

        const {to_player, to_enemy} = INSTANCE.renderGame(room, player_id)

        socket.emit("i_Activate_Card", to_player)

        if(!isAbility){
            socket.broadcast.to(room_id).emit("enemy_Activate_Card", to_enemy)
        }else{
            socket.broadcast.to(room_id).emit("enemy_Activate_Ability", {
                response: isAbility,
                to_enemy
            })
        }
    })
}