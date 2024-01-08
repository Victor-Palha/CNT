import { EventEmitter } from 'node:events';
import {Server, Socket} from 'socket.io';

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

type EventsFactory = {
    setup: (socket: Socket) => void;
}

export class Rooms extends EventEmitter {
    public _io: Server
    protected rooms: PrepareRoom[] = []
    private events: EventsFactory = {} as EventsFactory

    constructor(roomServer: Server){
        super()
        this._io = roomServer
    }

    public setupEvents(events: EventsFactory){
        this.events = events
        this.connect()
    }
    private connect(){
        this.io.on('connection', (socket)=>{
            this.events.setup(socket)
            this.emitRooms()
        })
    }
    protected emitRooms(){
        this.io.emit('rooms', this.rooms)
    }
    protected getRoom(room_id: string){
        const room = this.rooms.find((room) => room.room_id === room_id)
        if(room){
            return room
        }
        return null
    }

    set setRoom(room: PrepareRoom){
        this.rooms.push(room)
    }
    get io(){
        return this._io
    }
}