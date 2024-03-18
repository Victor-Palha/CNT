import { Socket } from "socket.io";
import { Game } from "..";

export function Surrender(socket: Socket, INSTANCE: Game){
    socket.on("surrender", (room_id: string)=>{
        const room = INSTANCE.getRoom(room_id);
        if(!room){
            return socket.emit("error", "Room not found")
        }
        const {opponent} = room.getPlayers(socket.id)
        room.winnerPlayer = opponent.id

        INSTANCE._io.of("/game").to(room_id).emit("enemy_Surrended", {
            winner: room.winnerPlayer,
            message: "Seu oponente se rendeu! Você venceu!"
        })
    })
}