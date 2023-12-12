import { Server } from "socket.io";
import { ConnectToRooms } from "../Rooms/ConnectToRooms";

export class Game{
    constructor(
        public gameRooms: Server, 
        public confrontRooms: ConnectToRooms
    ){}

    async initGame(){
        this.gameRooms.of("/game").on("connection", (players)=>{
            players.on("join_Game", (data)=>{
                const {room_id, player_id} = data
                const room = this.findGameRoom(room_id)
                console.log(room)
                
                if(!room){
                    console.log("room not found")
                    return
                }

                const player = room.players.find((player)=>{player.player === player_id})
                const enemy = room.players.find((player)=>{player.player !== player_id})
                if(!player || !enemy){
                    console.log("player not found")
                    return
                }

                const deal_Cards = {
                    player: {
                        hand: player.hand,
                        avatar: player.avatar,
                        deck: player.deck.length,
                    },
                    enemy: {
                        hand: enemy.hand.length,
                        avatar: enemy.avatar,
                        deck: enemy.deck.length,
                    }
                }

                players.emit("deal_Cards", deal_Cards)
            })
        })
    }

    private findGameRoom(room_id: string){
        const room = this.confrontRooms.confrontRooms.find((room)=>{room.room_id === room_id})
        return room
    }
}