import { Server } from "socket.io";
import { Rooms } from "../Rooms";
import { Player } from "../../core/Players/Player";
import { Avatar } from "../../core/Avatares/Avatar";
import { Card } from "../../core/Cards/Card";

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
        deck_name: string;
        cards: CardsBase[];
        avatar: AvatarBase;
    }
}

export class Game{
    public _io: Server
    private RoomsInstance: Rooms

    public GameRooms = []
    constructor(gameServer: Server, rooms: Rooms){
        this._io = gameServer
        this.RoomsInstance = rooms
    }
    async startGame(){
        this.RoomsInstance.on("new_Game", async (data: NewGame)=>{
            const {room_id, player_host, player_guest} = data;
            const socketHost = player_guest.socket_id
            const socketGuest = player_guest.socket_id
            // HTTP Request to get the deck from the database
            const responseHost = await fetch("http://25.0.154.188:3000/api/deck/"+player_host.deck_id)
            const responseGuest = await fetch("http://25.0.154.188:3000/api/deck/"+player_guest.deck_id)

            const deckHost: DeckResponse = await responseHost.json()
            const deckGuest: DeckResponse = await responseGuest.json()

            const host = new Player({
                player_avatar: new Avatar(deckHost.deck.avatar),
                player_deck: deckHost.deck.cards.map(card => {
                    return new Card({
                        activate: false,
                        originalOwner: player_host.player,
                        ...card
                    })
                }),
                player_hand: [],
                player_name: player_host.player,
                player_id: player_host.player
            })
        })
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