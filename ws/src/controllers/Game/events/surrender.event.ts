import { Socket } from "socket.io";
import { Game } from "..";

export function Surrender(socket: Socket, INSTANCE: Game){
    socket.on("surrender", (room_id: string)=>{
        const room = INSTANCE.getRoom(room_id);
        if(!room){
            return socket.emit("error", "Room not found")
        }
        const {opponent} = room.gameLogic.getPlayersRender({
            player_id: socket.id,
            player_guest: room.player_guest,
            player_host: room.player_host
        })

        room.gameState.setWinner = opponent.id

        INSTANCE._io.of("/game").to(room_id).emit("enemy_Surrended", {
            winner: room.gameState.getWinner,
            message: "Seu oponente se rendeu! Você venceu!"
        })
    })
}