import { Server, Socket } from "socket.io";
import {Rooms} from "..";

export class RoomInfo extends Rooms{
    constructor(io: Server){
        super(io)
        
    }

    public setup(socket: Socket){
        socket.on("room_Info", (room_id: string)=>{
            const room = this.getRoom(room_id)
            console.log(room)
            if(!room){
                socket.emit("room_not_found")
                return
            }
            this.io.to(room_id).emit("room_Info", room)
        })
        
    }
}