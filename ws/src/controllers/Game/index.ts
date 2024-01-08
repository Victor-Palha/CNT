import "dotenv/config"
import { Server } from "socket.io";
import { Rooms } from "../Rooms";
import { Field, Player } from "../../core/Players/Player";
import { Avatar } from "../../core/Avatares/Avatar";
import { Card } from "../../core/Cards/Card";
import { GameRoom } from "../../core/Room/Room";
import { Events } from "./factory/game.factory";

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
type DeckResponse = {
    deck: {
        id_deck: string;
        player_id: string;
        deck_name: string;
        cards: CardsBase[];
        avatar: AvatarBase;
    }
}

export class Game{
    public _io: Server
    private RoomsInstance: Rooms

    public GameRooms: GameRoom[] = []
    constructor(gameServer: Server, rooms: Rooms){
        this._io = gameServer
        this.RoomsInstance = rooms
        this.startGame()
        this.connect()
    }
    private async startGame(){
        this.RoomsInstance.on("new_Game", async (data: NewGame)=>{
            const {room_id, player_host, player_guest} = data;
            // Sockets
            const socketHost = player_guest.socket_id
            const socketGuest = player_guest.socket_id
            // HTTP Request to get the deck from the database
            const responseHost = await fetch(`http://${process.env.API}:3000/api/deck/`+player_host.deck_id)
            const responseGuest = await fetch(`http://${process.env.API}:3000/api/deck/`+player_guest.deck_id)

            const deckHost: DeckResponse = await responseHost.json()
            const deckGuest: DeckResponse = await responseGuest.json()
            // Setups the players
            const host = new Player({
                player_avatar: new Avatar(deckHost.deck.avatar),

                player_deck: deckHost.deck.cards.map(card => {
                    return new Card({
                        activate: false,
                        originalOwner: deckHost.deck.player_id,
                        ...card
                    })
                }),
                player_hand: [],
                player_name: player_host.player,
                player_id: deckHost.deck.player_id,
            })
            const guest = new Player({
                player_avatar: new Avatar(deckGuest.deck.avatar),

                player_deck: deckGuest.deck.cards.map(card => {
                    return new Card({
                        activate: false,
                        originalOwner: deckGuest.deck.player_id,
                        ...card
                    })
                }),
                player_hand: [],
                player_name: player_guest.player,
                player_id: deckGuest.deck.player_id,
            })
            // setup Sockets
            const sockets = [socketHost, socketGuest]

            const room = new GameRoom({
                room_id,
                player_host: host,
                player_guest: guest,
                sockets
            })

            const roomInitialized = room.initGame()

            this.GameRooms.push(roomInitialized)
            this.RoomsInstance.emit("room_created")
        })
    }

    private connect(){
        this._io.of("/game").on("connection", (socket)=>{
            Events(socket, this)
        })
    }

    public getRoom(room_id: string){
        return this.GameRooms.find(room => room.room_id === room_id)
    }

    public renderGame(room: GameRoom, player_id: string): GameRender{
        const {player, opponent} = room.getPlayers(player_id)

        const playerRender: PlayerRender = {
            gameState: room.roomState,
            turnOf: room.turnOwnerPlayer,
            inChain: room.chain,
            turn: room.turnNumber,
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

        const opponentRender: PlayerRender = {
            gameState: room.roomState,
            turnOf: room.turnOwnerPlayer,
            inChain: room.chain,
            turn: room.turnNumber,
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
    turn: number;
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

type CardsBase = {
    id_card: string;
    name: string;
    description: string;
    image: string;
    set_card: string;
    type_card: "OFENSIVA" | "DEFENSIVA" | "HABILIDADE" | "HABILIDADE_UNICA";
    list: number;
    created_at: Date;
    updated_at: Date;
}

type AvatarBase = {
    id_avatar: string;
    name: string;
    description: string;
    image: string;
    set_avatar: string;
    unique_ability: string;
    passive_ability: string | null;
    hit_points: number;
    attack: number;
    defense: number;
    type_avatar: "OFENSIVO" | "DEFENSIVO" | "MODERADO";
    created_at: Date;
    updated_at: Date;
}