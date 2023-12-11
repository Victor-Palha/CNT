import { Server, Socket } from "socket.io";
import { CNT, DeckPlayer } from "../rules/CNT";
import { ConnectToRooms } from "../ConnectToRooms/ConnectToRooms";
import { io } from "../../app";

type ConfrontRoom = {
    room_id: string;
    players: {
        socket_id: string;
        player_id: string;
        deck: DeckPlayer;
    }[]
}

export class StartConfront extends ConnectToRooms{
    private confrontRooms: ConfrontRoom[] = []

    constructor(){
        super(io)
    }

    async initConfront(){
        this.gameRooms.of("/confronts").on("connection", (socket)=>{

            // Events
            socket.on("start_Confront", async (socket)=>{
                const {room_id, player_id, deck_id} = socket

                const roomAlreadyExists = this.confrontRooms.find(room => room.room_id === room_id)
                if(roomAlreadyExists){
                    const playerAmount = roomAlreadyExists.players.length
                    
                    if(playerAmount === 2) return

                    const playerAlreadyExists = roomAlreadyExists.players.find(player => player.player_id === player_id)

                    if(playerAlreadyExists){
                        playerAlreadyExists.socket_id = socket.id
                    }
                    else {
                        const CNTInfo = new CNT()
                        await CNTInfo.getDeck(deck_id)

                        roomAlreadyExists.players.push({
                            socket_id: socket.id,
                            player_id,
                            deck: CNTInfo.takeInfo()
                        })
                    }
                }
                else{
                    const CNTInfo = new CNT()
                    await CNTInfo.getDeck(deck_id)

                    this.confrontRooms.push({
                        room_id,
                        players: [{
                            socket_id: socket.id,
                            player_id,
                            deck: CNTInfo.takeInfo()
                        }]
                    })
                }
            })
        })        
    }
}