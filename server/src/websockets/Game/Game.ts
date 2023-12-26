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
    socket_id: string;
    player: string;
    ready: boolean;
    deck_id: string;
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
            const socketHost = player_host.socket_id;
            const socketGuest = player_guest.socket_id;

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

            const sockets = [socketHost, socketGuest]

            const room = new Room({
                room_id,
                player_host: host,
                player_guest: guest,
                sockets
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
                const {player, opponent} = room.getPlayers(player_id)

                const renderGame = {
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

                const socketsConnects = room.socketsPlayers
                console.log(socketsConnects)
                socketsConnects.map((socket) => {
                    // If socket is the same as the player who is connecting, just send the data to him
                    if(players.id === socket && player_id === player.id){
                        players.emit("deal_Cards", renderGame)
                    }
                    // If is a new socket but the player is already connected, send the data to him and replace the socket
                    else{
                        
                        room.newSocketsPlayers(socket, players.id)
                        players.join(room_id)
                        players.emit("deal_Cards", renderGame)
                    }
                })
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

                const {player} = room.getPlayers(player_id)

                const myNewField = {
                    player: player.id,
                    hand: player.hand,
                    avatar: player.avatar,
                    field: player.field,
                    deck: player.deck.length,
                    gameState: room.roomState,
                    turnOf: room.turnOwnerPlayer,
                }

                const enemyNewField = {
                    player: player.id,
                    hand: player.hand.length,
                    avatar: player.avatar,
                    field: player.field,
                    deck: player.deck.length,
                    gameState: room.roomState,
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
                const {gameState, turnOwner, id} = room.skipTurn(player_id)
                
                this.gameSocket.of("/game").to(room_id).emit("skip_Turn", {turnOf: turnOwner, gameState, id})
            })

            players.on("climax_Phase", (data)=>{
                const {room_id, player_id} = data;
                console.log("climax_Phase")
                const room = this.findRoom(room_id);
                if(!room){
                    throw new Error("Room not found");
                };

                if(player_id !== room.turnOwnerPlayer){
                    return;
                }
                room.climaxPhase()
                const {player, opponent} = room.getPlayers(player_id)

                const dealPlayersCard = {
                    gameState: room.roomState,
                    turnOf: room.turnOwnerPlayer,
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

                const dealOpponentsCard = {
                    gameState: room.roomState,
                    turnOf: room.turnOwnerPlayer,
                    player: {
                        hand: opponent.hand,
                        avatar: opponent.avatar,
                        deck: opponent.deck.length,
                        field: opponent.field,
                    },
                    enemy: {
                        hand: player.hand.length,
                        avatar: player.avatar,
                        deck: player.deck.length,
                        field: player.field,
                    }
                }
                players.emit("climax_Phase_End", dealPlayersCard)
                players.broadcast.to(room_id).emit("climax_Phase_End", dealOpponentsCard)
                // If the game ends send the winner
                if(room.winnerPlayer !== null){
                    this.gameSocket.of("/game").to(room_id).emit("game_End", {winner: room.winnerPlayer, gameState: room.roomState})
                
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