import { Socket } from "socket.io";
import { Game } from "..";
type SkipTurnData = {
    room_id: string;
    player_id: string;
}

export function SkipTurn(socket: Socket, INSTANCE: Game){
    socket.on("skip_Turn", (data: SkipTurnData)=>{
        const {room_id, player_id} = data;
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_Not_Found")
            return
        }

        const {gameState, turnOwner, id} = room.skipTurn(player_id)
        INSTANCE._io.of("/game").to(room_id).emit("skip_Turn", {
            turnOf: turnOwner,
            gameState,
            id
        })
    })
}