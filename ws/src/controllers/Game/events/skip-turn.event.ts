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

        const {gameState, new_turn_owner} = room.gameLogic.skipTurn({
            gameState: room.gameState.getRoomState,
            player_guest: room.player_guest,
            player_host: room.player_host,
            player_id
        })
        
        INSTANCE._io.of("/game").to(room_id).emit("skip_Turn", {
            turnOf: new_turn_owner,
            gameState,
            id: room.room_id
        })
    })
}