import { EventEmitter } from 'node:events';
import {Server} from 'socket.io';
import { Events } from './factory/events.factory';

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

export class Rooms extends EventEmitter {
    public _io: Server
    public rooms: PrepareRoom[] = []

    constructor(roomServer: Server){
        super()
        this._io = roomServer
        this.connect()
    }

    private connect(){
        this.io.on('connection', (socket)=>{
            console.log('New connection')
            Events(socket, this)
            this.emitRooms()

            socket.on('disconnect', ()=>{
                console.log('Disconnected')
            })
        })
    }
    public emitRooms(){
        this.io.emit('rooms', this.rooms)
    }
    public getRoom(room_id: string){
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