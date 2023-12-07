import { io } from "../app";
import { CNT, DeckPlayer } from "./rules/CNT";


interface Room{
    room_id: string;
    players: {
        player_id: string;
        socket_id: string;
        deck: DeckPlayer;
    }[]
    
}

const rooms: Room[] = []
io.on("connection", (socket) => {
    socket.on("disconnect", (skt) => {
        console.log("disconnected", skt);
    })

    socket.on("joinRoom", async (data) => {
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
            rooms.push({
                room_id,
                players: [player]
            })
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