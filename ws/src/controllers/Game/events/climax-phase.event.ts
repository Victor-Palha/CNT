import { Socket } from "socket.io";
import { Game } from "..";

type ClimaxPhaseData = {
    room_id: string;
    player_id: string;
}

export function ClimaxPhase(socket: Socket, INSTANCE: Game){
    socket.on("climax_Phase", (data: ClimaxPhaseData)=>{
        const {room_id, player_id} = data;
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_Not_Found")
            return
        }

        if(player_id !== room.turnOwnerPlayer){
            return
        }
        room.climaxPhase()
        const {to_player, to_enemy} = INSTANCE.renderGame(room, player_id)
        socket.emit("climax_Phase_End", to_player)
        socket.broadcast.to(room_id).emit("climax_Phase_End", to_enemy)
        //
        if(room.winnerPlayer !== null){
            INSTANCE._io.of("/game").to(room_id).emit("game_End", {
                winner: room.winnerPlayer,
                gameState: room.roomState
            })
        }
    })
}