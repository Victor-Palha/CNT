import { Server } from "socket.io";
import { Room } from "../core/Room/Room";
import { ConnectToRooms } from "../Rooms/ConnectToRooms";
import { CNT, DeckPlayer } from "../db-connection/CNT";
import { Field, Player } from "../core/Players/Player";
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
                player_name: player_host.player,
                player_id: playerHost.player_id,
            })

            const guest = new Player({
                player_avatar: new Avatar(playerGuest.avatar as Avatars),
                player_deck: playerGuest.cards.map(card => {
                    return new Card({activate:false, ...card})
                }),
                player_hand: [],
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

                const {player} = room.getPlayers(player_id)

                const {to_player} = this.renderGame(room, player_id)

                const socketsConnects = room.socketsPlayers
                
                socketsConnects.map((socket) => {
                    // If socket is the same as the player who is connecting, just send the data to him
                    if(players.id === socket && player_id === player.id){
                        players.emit("deal_Cards", to_player)
                    }
                    // If is a new socket but the player is already connected, send the data to him and replace the socket
                    else{
                        
                        room.newSocketsPlayers(socket, players.id)
                        players.join(room_id)
                        players.emit("deal_Cards", to_player)
                    }
                })
            })

            players.on("set_Card", (data)=>{
                const {room_id, player_id, card, field_id} = data
                const room = this.findRoom(room_id);
                if(!room){
                    throw new Error("Room not found");
                }

                const {gameState} = room.setCardOnField(player_id, card, field_id)

                const {to_player, to_enemy} = this.renderGame(room, player_id)

                players.emit("i_Set_Card", to_player)

                players.broadcast.to(room_id).emit("enemy_Set_Card", to_enemy)

                if(gameState === 2){
                    this.gameSocket.of("/game").to(room_id).emit("start_Action_Phase", gameState)
                }
            })

            players.on("activate_Card", (data)=>{
                const {field_id, room_id, player_id, target} = data
                const room = this.findRoom(room_id);
                if(!room){
                    throw new Error("Room not found");
                }
                const isAbility = room.activeCard(field_id, player_id, target)

                const {to_player, to_enemy} = this.renderGame(room, player_id)

                players.emit("i_Activate_Card", to_player)
                
                if(!isAbility){
                    players.broadcast.to(room_id).emit("enemy_Activate_Card", to_enemy)
                }else{
                    players.broadcast.to(room_id).emit("enemy_Activate_Ability", {
                        response: isAbility,
                        to_enemy
                    })
                }
            })

            players.on("cancel_Chain", (data)=>{
                const {room_id, player_id} = data
                const room = this.findRoom(room_id);
                if(!room){
                    throw new Error("Room not found");
                }

                room.resolveChain()

                const {to_player, to_enemy} = this.renderGame(room, player_id)

                players.emit("deal_Cards", to_player)
                players.broadcast.to(room_id).emit("deal_Cards", to_enemy)
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
                const {to_player, to_enemy} = this.renderGame(room, player_id)

                players.emit("climax_Phase_End", to_player)
                players.broadcast.to(room_id).emit("climax_Phase_End", to_enemy)
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

    // Gets the room state and send states from the game to the players
    private renderGame(room: Room, player_id: string): GameRender{
        const {player, opponent} = room.getPlayers(player_id)

        const playerRender = {
            gameState: room.roomState,
            turnOf: room.turnOwnerPlayer,
            inChain: room.chain,
            player: {
                canSkip: player.can_skip_turn,
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

        const opponentRender = {
            gameState: room.roomState,
            turnOf: room.turnOwnerPlayer,
            inChain: room.chain,
            player: {
                canSkip: opponent.can_skip_turn,
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
        return {
            to_player: playerRender,
            to_enemy: opponentRender
        };
    }
}
type GameRender = {
    to_player: PlayerRender;
    to_enemy: PlayerRender;
}

type PlayerRender = {
    gameState: number;
    turnOf: string;
    inChain: boolean;
    player: {
        canSkip: boolean;
        hand: Card[];
        avatar: Avatar;
        deck: number;
        field: Field[];
    };
    enemy: {
        hand: number;
        avatar: Avatar;
        deck: number;
        field: Field[];
    }
}