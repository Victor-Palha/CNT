import { Server, Socket } from "socket.io";
import {Rooms} from "..";

export function LeaveRoom(socket: Socket, INSTANCE: Rooms){
    socket.on("leave_Room", (room_id: string)=>{
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_not_found")
            return
        }

        const player = room.players.find(player => player.socket_id === socket.id)
        if(!player){
            socket.emit("player_not_found")
            return
        }

        const playerIndex = room.players.indexOf(player)
        room.players.splice(playerIndex, 1)
        socket.leave(room_id)

        room.messages.push({
            playerName: "cat /var/log/messages_"+room.room_name+".log",
            message: `${player.player} saiu da sala`
        })

        INSTANCE.emitRooms()
        INSTANCE.io.to(room_id).emit("room_Info", room)
    })
}