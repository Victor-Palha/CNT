import { Server, Socket } from "socket.io";
import {Rooms} from "..";

export class LeaveRoom extends Rooms{
    constructor(io: Server){
        super(io)
        
    }

    public setup(socket: Socket){
        socket.on("leave_Room", (room_id: string)=>{
            const room = this.getRoom(room_id)
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

            this.emitRooms()
            this.io.to(room_id).emit("room_Info", room)
        })
        
    }
}