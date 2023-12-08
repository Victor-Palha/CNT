import { randomUUID } from "node:crypto";
import { io } from "../app";
import { CNT, DeckPlayer } from "./rules/CNT";


interface ConfrontRoom{
    room_id: string;
    room_name: string;
    players: {
        player_id: string;
        socket_id: string;
        deck: DeckPlayer;
    }[]
}

interface PrepareRoom{
    room_id: string;
    room_name: string;
    players: {
        socket_id: string;
        player: string;
    }[]
    messages: {
        playerName: string;
        message: string;
    }[]
}

const rooms: ConfrontRoom[] = []
const prepareRooms: PrepareRoom[] = []

io.on("connection", (socket) => {
    console.log("socket conectado", socket.id)
    io.emit("rooms", prepareRooms)

    socket.on("create_Room", async (data)=>{
        const {room_name, player_id} = data as {room_name: string, player_id: string};

        const player = {
            socket_id: socket.id,
            player: await CNT.GetPlayer(player_id) as string
        }
        const room_id = randomUUID()

        const room = {
            room_id,
            room_name: room_name,
            players: [player],
            messages: [{
                playerName: "sudo ssh root@"+randomUUID().slice(0, 5)+" -p 22",
                message: `${player.player} criou a sala ${room_name}`
            }]
        }

        prepareRooms.push(room)

        socket.join(room_id)
        
        socket.emit("room_created", room.room_id)

        io.emit("rooms", prepareRooms)
    })
    
    socket.on("join_Room", async (data)=>{
        const {room_id, player_id} = data as {room_id: string, player_id: string};

        const player = {
            socket_id: socket.id,
            player: await CNT.GetPlayer(player_id) as string
        }

        const room = prepareRooms.find((room) => room.room_id === room_id)
        const playerAlreadyExists = room?.players.find((player) => player.socket_id === socket.id)

        if(!room){
            return
        }else{
            if(!playerAlreadyExists){
                room.players.push(player)
            }else{
                playerAlreadyExists.socket_id = socket.id
            }
        }
        socket.emit("room_joined", room_id)
        socket.join(room_id)

        // if(room && room.players.length === 2){
        //     console.log("room", room.players)
        //     io.to(room_id).emit("players", room.players)
        // }
    })

    socket.on("room_Info", (room_id)=>{
        const room = prepareRooms.find((room) => room.room_id === room_id)
        io.to(room_id).emit("room_Info", room)
        console.log("room", room)
    })

    // socket.on("create_Room", async (data)=>{
    //     const {room_name, player_id, deck_id} = data as {room_name: string, player_id: string, deck_id: string};
    //     console.log(room_name)
    //     const cnt = new CNT()

    //     await cnt.getDeck(deck_id)

    //     const myDeck = cnt.takeInfo()

    //     const player = {
    //         player_id,
    //         socket_id: socket.id,
    //         deck: myDeck
    //     }

    //     const room = {
    //         room_id: randomUUID(),
    //         room_name: room_name,
    //         players: [player]
    //     }

    //     rooms.push(room)
    //     console.log("room", rooms)
    //     socket.join(room_name)
    //     socket.emit("rooms", rooms)
    // })

    socket.on("start_Confront", async (data) => {
        const { room_id, player_id, deck_id } = data;

        const cnt = new CNT()

        await cnt.getDeck(deck_id)

        const myDeck = cnt.takeInfo()

        const player = {
            player_id,
            socket_id: socket.id,
            deck: myDeck
        }

        const room = rooms.find((room) => room.room_id === room_id)
        const playerAlreadyExists = room?.players.find((player) => player.player_id === player_id)

        if(!room){
            return
        }else{
            if(!playerAlreadyExists){
                room.players.push(player)
            }else{
                playerAlreadyExists.socket_id = socket.id
            }
        }
        socket.join(room_id)

        if(room && room.players.length === 2){
            // console.log("room", room.players)
            io.to(room_id).emit("playersDeck", room.players)
        }
    })
    
})