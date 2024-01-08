import {Rooms, PrepareRoom } from "..";
import { Server } from "socket.io";
import { Socket } from "socket.io";
import { randomUUID } from "node:crypto";

type CreateRoomData = {
    room_name: string;
    playerName: string;
}

/**
 * Represents a class for creating rooms.
 * Extends the Rooms class.
 */
export class CreateRoom extends Rooms{
    constructor(io: Server){
        super(io)
    }
    /**
     * Sets up the event listener for creating rooms.
     * When a connection is made, it listens for the "create_Room" event and handles the creation of a new room.
     */
    public setup(socket: Socket){
        socket.on("create_Room", async (data: CreateRoomData)=>{
            const {room_name, playerName} = data
            const roomAlreadyExists = this.rooms.find(room => room.room_name === room_name)

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
                host: socket.id,
                players: [player],
                messages: [{
                    playerName: "sudo ssh root@"+room_name+" -p 22",
                    message: `${player.player} criou a sala ${room_name}`
                }],
                inConfront: false
            }
            socket.join(room_id)
            this.setRoom = newRoom
            socket.emit("room_created", room_id)
            this.emitRooms()
        })
    }
}