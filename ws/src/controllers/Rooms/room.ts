import { EventEmitter } from 'node:events';
import {Server} from 'socket.io';

export interface PrepareRoom{
    room_id: string;
    room_name: string;
    host: string;
    players: {
        socket_id: string;
        player: string;
        ready: boolean;
        deck_id: string;
    }[]
    messages: {
        playerName: string;
        message: string;
    }[]
    inConfront: boolean;
}

class Rooms extends EventEmitter {
    protected io: Server
    protected rooms: PrepareRoom[] = []
    constructor(roomServer: Server){
        super()
        this.io = roomServer
    }
    protected emitRooms(){
        this.io.emit('rooms', this.rooms)
    }
}

export default Rooms