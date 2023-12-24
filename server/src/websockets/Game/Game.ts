import { Server } from "socket.io";
import { Room } from "../core/Room/Room";
import { ConnectToRooms } from "../Rooms/ConnectToRooms";
import { CNT, DeckPlayer } from "../db-connection/CNT";
import { Player } from "../core/Players/Player";
import { Card } from "../core/Cards/Card";
import { Avatar } from "../core/Avatares/Avatar";
import { Avatars } from "@prisma/client";


type NewGame = {
    room_id: string;
    player_host: PlayerInit;
    player_guest: PlayerInit;
}

type PlayerInit = {
    player: string;
    ready: boolean;
    deck_id: string;
}

interface GameRooms extends Room{
    sockets: string[];
}

export class Game{
    private Rooms: Room[] = []

    constructor(
        public gameSocket: Server,
        private roomSocket: ConnectToRooms
    ){
        
    }
    
    async initGame(){
        this.roomSocket.on("new_Game", async (data)=>{
            const {room_id, player_host, player_guest} = data as NewGame;

            const playerHost = await new CNT().getDeck(player_host.deck_id) as DeckPlayer;
            const playerGuest = await new CNT().getDeck(player_guest.deck_id) as DeckPlayer;

            const host = new Player({
                player_avatar: new Avatar(playerHost.avatar as Avatars),
                player_deck: playerHost.cards.map(card => {
                    return new Card({activate:false, ...card})
                }),
                player_hand: [],
                player_hit_points: 35,
                player_name: player_host.player,
                player_id: playerHost.player_id,
            })

            const guest = new Player({
                player_avatar: new Avatar(playerGuest.avatar as Avatars),
                player_deck: playerGuest.cards.map(card => {
                    return new Card({activate:false, ...card})
                }),
                player_hand: [],
                player_hit_points: 35,
                player_name: player_guest.player,
                player_id: playerGuest.player_id,
            })

            const room = new Room({
                room_id,
                player_host: host,
                player_guest: guest,
            })

            const roomInitialized = room.initGame();

            this.Rooms.push(roomInitialized);
            this.roomSocket.emit("room_created")
            
        })
        
        this.gameSocket.of("/game").on("connection", (players)=>{
            players.on("init_Game", (data)=>{
                const {room_id, player_id} = data
                const room = this.findRoom(room_id);
                if(!room){
                    players.emit("room_Not_Found")
                    return;
                }

                const initRoom = room.getRoom()
                const {player, opponent} = room.getPlayerById(player_id)

                const dealCards = {
                    gameState: room.roomState,
                    turnOf: initRoom.turnOwner,
                    player: {
                        hand: player.hand,
                        avatar: player.avatar,
                        deck: player.deck.length,
                        field: player.field,
                    },
                    enemy: {
                        hand: opponent.hand.length,
                        avatar: opponent.avatar,
                        deck: opponent.deck.length,
                        field: opponent.field,
                    }
                }
                console.log(players.rooms)
                players.join(room_id)
                players.emit("deal_Cards", dealCards)
            })

            players.on("set_Card", (data)=>{
                const {room_id, player_id, card, field_id} = data
                const room = this.findRoom(room_id);
                if(!room){
                    throw new Error("Room not found");
                }

                const {player, gameState} = room.setCardOnField(player_id, card, field_id)

                const myNewField = {
                    gameState,
                    player: player.id,
                    hand: player.hand,
                    field: player.field,
                    deck: player.deck.length,
                    turnOf: room.turnOwnerPlayer,
                }

                const enemyNewField = {
                    gameState,
                    player: player.id,
                    hand: player.hand.length,
                    field: player.field,
                    deck: player.deck.length,
                    turnOf: room.turnOwnerPlayer
                }

                players.emit("i_Set_Card", myNewField)
                players.broadcast.to(room_id).emit("enemy_Set_Card", enemyNewField)

                if(gameState === 2){
                    this.gameSocket.of("/game").to(room_id).emit("start_Action_Phase", gameState)
                }
            })

            players.on("activate_Card", (data)=>{
                const {field_id, room_id, player_id} = data
                const room = this.findRoom(room_id);
                if(!room){
                    throw new Error("Room not found");
                }
                room.activeCard(field_id, player_id)

                const {player} = room.getPlayerById(player_id)

                const myNewField = {
                    player: player.id,
                    hand: player.hand,
                    avatar: player.avatar,
                    field: player.field,
                    deck: player.deck.length,
                    turnOf: room.turnOwnerPlayer,
                }

                const enemyNewField = {
                    player: player.id,
                    hand: player.hand.length,
                    avatar: player.avatar,
                    field: player.field,
                    deck: player.deck.length,
                    turnOf: room.turnOwnerPlayer,
                }

                players.emit("i_Activate_Card", myNewField)
                players.broadcast.to(room_id).emit("enemy_Activate_Card", enemyNewField)
            })

            players.on("skip_Turn", (data)=>{
                const {room_id, player_id} = data
                const room = this.findRoom(room_id);
                if(!room){
                    throw new Error("Room not found");
                }
                const skipTurn = room.skipTurn(player_id)
                if(typeof skipTurn === "string"){
                    this.gameSocket.of("/game").to(room_id).emit("skip_Turn", {turnOf: skipTurn})
                }else{
                    this.gameSocket.of("/game").to(room_id).emit("start_Climax_Phase", skipTurn)
                }
            })
        })
    }

    private findRoom(room_id: string){
        return this.Rooms.find(room => {
            if(room.room_id === room_id) return room
        });
    }
}