import { Server } from "socket.io";
import { CNT } from "../rules/CNT";
import { randomUUID } from "crypto";

interface PrepareRoom{
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


type CreateRoomData = {
    room_name: string;
    player_id: string;
}

type JoinRoomData = {
    room_id: string;
    player_id: string;
}

type PlayerReadyData = {
    ready: boolean;
    room_id: string;
    socket_id: string;
}

type SendMessageData = {
    room_id: string;
    message: string;
}

type StartConfrontData = {
    room_id: string;
    player_id: string;
}

export class ConnectToRooms{
    
    constructor(protected gameRooms: Server){}
    protected prepareRooms: PrepareRoom[] = []

    async init(){
        this.gameRooms.on("connection", (socket)=>{
            this.emitRooms()

            socket.on("create_Room", async (data: CreateRoomData)=>{
                const {room_name, player_id} = data

                const roomAlreadyExists = this.prepareRooms.find(room => room.room_name === room_name)

                if(roomAlreadyExists){
                    // TODO: emitir erro
                    return
                }

                const player = {
                    socket_id: socket.id,
                    player: await CNT.GetPlayer(player_id) as string,
                    ready: false,
                    deck_id: ""
                }

                const room_id = randomUUID()

                const room: PrepareRoom = {
                    room_id,
                    room_name: room_name,
                    host: player_id,
                    players: [player],
                    messages: [{
                        playerName: "sudo ssh root@"+room_name+" -p 22",
                        message: `${player.player} criou a sala ${room_name}`
                    }],
                    inConfront: false
                }

                socket.join(room_id)
                this.prepareRooms.push(room)
                socket.emit("room_created", room_id)
                this.emitRooms()
            })

            socket.on("join_Room", async (data: JoinRoomData)=>{
                const {room_id, player_id} = data

                const roomAlreadyExists = this.prepareRooms.find((room) => room.room_id === room_id)

                if(!roomAlreadyExists){
                    // TODO: emitir erro
                    return
                }

                const playerAlreadyExists = roomAlreadyExists.players.find((player) => player.socket_id === socket.id)

                if(playerAlreadyExists){
                    // TODO: emitir erro
                    return
                }

                const player = {
                    socket_id: socket.id,
                    player: await CNT.GetPlayer(player_id) as string,
                    ready: false,
                    deck_id: ""
                }

                roomAlreadyExists.players.push(player)

                socket.emit("room_joined", room_id)
                socket.join(room_id)

                roomAlreadyExists.messages.push({
                    playerName: "sudo ssh root@"+roomAlreadyExists.room_name+" -p 22",
                    message: `${player.player} entrou na sala ${roomAlreadyExists.room_name}`
                })

                this.emitRooms()
            })

            socket.on("leave_Room", (room_id: string)=>{
                const room = this.GetRoomInformation(room_id)
                console.log(room)
                if(!room){
                    return
                }
                room.messages.push({
                    playerName: "cat /var/log/messages_"+room.room_name+".log",
                    message: `${room.players.find((player) => player.socket_id === socket.id)?.player} saiu da sala ${room.room_name}`
                })
                room.players = room.players.filter((player) => player.socket_id !== socket.id)
                
                socket.leave(room_id)
                console.log(room)
                this.emitRooms()
                this.gameRooms.to(room_id).emit("room_Info", room)
            })


            socket.on("choose_Deck", (data)=>{
                const {room_id, deck_id} = data

                const room = this.GetRoomInformation(room_id)
                if(!room){
                    return
                }
                room.players.map((player)=>{
                    if(player.socket_id === socket.id){
                        player.deck_id = deck_id
                    }
                })
            })

            socket.on("room_Info", (room_id: string)=>{
                const room = this.GetRoomInformation(room_id)
                if(room){
                    this.gameRooms.to(room_id).emit("room_Info", room)
                }
            })

            socket.on("player_Ready", (data: PlayerReadyData)=>{
                const {ready, room_id, socket_id} = data
                const room = this.GetRoomInformation(room_id)
                if(!room){
                    // TODO: emitir erro
                    return
                }
                room.players.map((player)=>{
                    if(player.socket_id === socket_id){
                        player.ready = ready
                    }
                })
        
                this.gameRooms.to(room_id).emit("room_Info", room)
            })

            socket.on("send_Message", (data: SendMessageData)=>{
                const {room_id, message} = data;
        
                const room = this.GetRoomInformation(room_id)
                if(!room){
                    // TODO: emitir erro
                    return
                }
                room.messages.push({
                    playerName: room.players.find((player) => player.socket_id === socket.id)?.player as string,
                    message
                })
        
                this.gameRooms.to(room_id).emit("new_Message", room.messages)
            })

            socket.on("start_Confront", ({room_id}: StartConfrontData)=>{
                const room = this.GetRoomInformation(room_id)
                if(!room){
                    return
                }
                if(room.players.length === 2){
                    room.inConfront = true
                    this.gameRooms.to(room_id).emit("start_Confront", room)
                }
                
            })
        })
    }

    private emitRooms(){
        this.gameRooms.emit("rooms", this.prepareRooms)
    }

    protected GetRoomInformation(room_id: string){
            const room = this.prepareRooms.find((room) => room.room_id === room_id)
            if(room){
                return room
            }
            return null
    }
    
}