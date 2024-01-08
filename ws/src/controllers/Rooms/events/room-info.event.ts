import { Server, Socket } from "socket.io";
import {Rooms} from "..";

export function RoomInfo(socket: Socket, INSTANCE: Rooms){
    socket.on("room_Info", (room_id: string)=>{
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_not_found")
            return
        }
        INSTANCE.io.to(room_id).emit("room_Info", room)
    })
}