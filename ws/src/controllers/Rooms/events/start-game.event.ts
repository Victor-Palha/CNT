import { Socket } from "socket.io";
import { Rooms } from "..";

export function StartGame(socket: Socket, INSTANCE: Rooms){
    socket.on("start_game", (room_id: string)=>{
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_not_found")
            return
        }

        if(room.players.length === 2){
            const isSomeoneNotReady = room.players.some(player => !player.ready)
            const isSomePlayerWithoutDeck = room.players.some(player => player.deck_id === "")
            if(!isSomeoneNotReady && !isSomePlayerWithoutDeck){
                room.inConfront = true
                INSTANCE.emit("new_Game", {
                    room_id,
                    player_host: room.players[0],
                    player_guest: room.players[1]
                })

                INSTANCE.on("room_created", ()=>{
                    INSTANCE.io.to(room_id).emit("room_Info", room)
                    INSTANCE.rooms.filter(room => room.room_id !== room_id)
                })
            }
        }
    })
}