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

        if(player_id !== room.gameState.getTurnOwner){
            return
        }
        room.gameLogic.climaxPhaseResolver({
            player_guest: room.player_guest,
            player_host: room.player_host
        })

        const {to_player, to_enemy} = INSTANCE.renderGame(room, player_id)

        socket.emit("climax_Phase_End", to_player)
        socket.broadcast.to(room_id).emit("climax_Phase_End", to_enemy)
        //
        if(room.gameState.getWinner !== null){
            INSTANCE._io.of("/game").to(room_id).emit("game_End", {
                winner: room.gameState.getWinner,
                gameState: room.gameState.getRoomState
            })
        }
    })
}