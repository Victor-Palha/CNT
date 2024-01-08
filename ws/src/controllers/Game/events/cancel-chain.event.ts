import { Socket } from "socket.io";
import { Game } from "..";
type CancelChainData = {
    room_id: string;
    player_id: string;
}
export function CancelChain(socket: Socket, INSTANCE: Game){
    socket.on("cancel_Chain", (data: CancelChainData)=>{
        const {room_id, player_id} = data;
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_Not_Found")
            return
        }
        room.resolveChain()
        const {to_player, to_enemy} = INSTANCE.renderGame(room, player_id)

        socket.emit("deal_Cards", to_player)
        socket.broadcast.to(room_id).emit("deal_Cards", to_enemy)
    })
}