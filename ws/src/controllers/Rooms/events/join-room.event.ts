import { Server, Socket } from "socket.io";
import {Rooms} from "..";
type JoinRoomData = {
    room_id: string;
    playerName: string;
}

export class JoinRoom extends Rooms{
    constructor(io: Server){
        super(io)
        
    }
    
    public setup(socket: Socket){
        socket.on("join_Room", (data: JoinRoomData)=>{
            const {room_id, playerName} = data

            const roomAlreadyExists = this.getRoom(room_id)
            if(!roomAlreadyExists){
                socket.emit("room_not_found")
                return
            }

            const playerAlreadyInRoom = roomAlreadyExists.players.find(player => player.player === playerName || player.socket_id === socket.id)
            if(playerAlreadyInRoom){
                socket.emit("player_already_in_room")
                return
            }

            const player = {
                socket_id: socket.id,
                player: playerName,
                ready: false,
                deck_id: ""
            }

            roomAlreadyExists.players.push(player)
            socket.join(room_id)
            socket.emit("room_joined", room_id)
            roomAlreadyExists.messages.push({
                playerName: "sudo ssh root@"+roomAlreadyExists.room_name+" -p 22",
                message: `${player.player} entrou na sala`
            })

            this.emitRooms()

        })
    }
}