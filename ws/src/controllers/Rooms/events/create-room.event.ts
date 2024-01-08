import { Socket } from "socket.io";
import { PrepareRoom, Rooms } from "..";
import { randomUUID } from "node:crypto";

type CreateRoomData = {
    room_name: string;
    playerName: string;
}

export function CreateRoom(socket: Socket, INSTANCE: Rooms){
    socket.on("create_Room", async (data: CreateRoomData)=>{
        const {room_name, playerName} = data
        const roomAlreadyExists = INSTANCE.rooms.find(room => room.room_name === room_name)

        if(roomAlreadyExists){
            socket.emit("room_already_exists")
            return
        }

        const player = {
            socket_id: socket.id,
            player: playerName,
            ready: false,
            deck_id: ""
        }

        const room_id = randomUUID()
        const newRoom: PrepareRoom = {
            room_id,
            room_name,
            host: playerName,
            players: [player],
            messages: [{
                playerName: "sudo ssh root@"+room_name+" -p 22",
                message: `${player.player} criou a sala ${room_name}`
            }],
            inConfront: false
        }
        socket.join(room_id)
        INSTANCE.setRoom = newRoom
        socket.emit("room_created", room_id)
        INSTANCE.emitRooms()
    })
}