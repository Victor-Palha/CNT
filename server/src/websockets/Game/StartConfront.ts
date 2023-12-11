import { Avatars } from "@prisma/client";
import { CNT, DeckPlayer } from "../rules/CNT";
import { Server } from "socket.io";

type ConfrontRoom = {
    room_id: string;
    players: {
        socket_id: string;
        player_id: string;
        avatar: Avatars;
    }[]
}

export class StartConfront{
    private confrontRooms: ConfrontRoom[] = []
    private server: Server

    constructor(server: Server){
        this.server = server
    }
    async initConfront(){
        this.server.of("/confronts").on("connection", (player)=>{
            // Events
            player.on("init_Game", async (socket)=>{
                const {room_id, player_id, deck_id} = socket
                if(room_id === undefined || player_id === undefined || deck_id === undefined) return

                const roomAlreadyExists = this.confrontRooms.find(room => room.room_id === room_id)

                if(roomAlreadyExists){
                    const playerAmount = roomAlreadyExists.players.length
                    
                    if(playerAmount === 2) return
                
                    const playerAlreadyExists = roomAlreadyExists.players.find(player => player.player_id === player_id)

                    if(playerAlreadyExists){
                        playerAlreadyExists.socket_id = player.id
                    }
                    else {
                        const playerInfo = await this.getPlayerInfo(deck_id)

                        playerInfo.avatar && roomAlreadyExists.players.push({
                            socket_id: player.id,
                            player_id,
                            avatar: playerInfo.avatar
                        })
                    }
                }
                else{
                    const playerInfo = await this.getPlayerInfo(deck_id)

                    playerInfo.avatar && this.confrontRooms.push({
                        room_id,
                        players: [{
                            socket_id: player.id,
                            player_id,
                            avatar: playerInfo.avatar
                        }]
                    })
                }

                player.join(room_id)

                this.server.of("/confronts").to(room_id).emit("room_updated", this.getRoomInformation(room_id))
                console.log(this.confrontRooms[0])
            })
        })        
    }

    private async getPlayerInfo(deck_id: string){
        const CNTInfo = new CNT()
        await CNTInfo.getDeck(deck_id)

        return CNTInfo.takeInfo()
    }

    public getRoomInformation(room_id: string){
        const room = this.confrontRooms.find(room => room.room_id === room_id)
        if(!room) return

        return room
    }
}