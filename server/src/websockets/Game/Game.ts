import { Server } from "socket.io";
import { ConnectToRooms } from "../Rooms/ConnectToRooms";

export class Game extends ConnectToRooms{
    constructor(gameRooms: Server){
        super(gameRooms)
    }

    async initGame(){
        this.gameRooms.of("/game").on("connection", (players)=>{
            players.on("join_Game", (socket)=>{
                const {room_id, player_id} = socket
                const room = this.findGameRoom(room_id)
                
                if(!room){
                    players.emit("room_not_found")
                    return
                }

                const player = room.getRoom.players.find((player)=>{player.player === player_id})
                if(!player){
                    players.emit("player_not_found")
                    return
                }

                players.join(room_id)
                socket.emit("deal_Cards", player.hand)
            })
        })
    }

    private findGameRoom(room_id: string){
        const room = this.confrontRooms.find((room)=>{room.getRoom.room_id === room_id})
        return room
    }
}