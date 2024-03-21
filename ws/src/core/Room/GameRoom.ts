import { Player } from "../Players/Player";
import { GameLogic } from "./GameLogic";
import { GameState } from "./GameState";

type Room = {
    room_id: string;
    player_host: Player;
    player_guest: Player;
    gameLogic: GameLogic;
    gameState: GameState;
}

export class GameRoom {
    readonly room_id: string;
    public player_host: Player;
    public player_guest: Player;
    public gameLogic: GameLogic;
    public gameState: GameState;

    constructor({room_id, player_host, player_guest, gameLogic, gameState}: Room){
        this.room_id = room_id;
        this.player_host = player_host;
        this.player_guest = player_guest;
        this.gameLogic = gameLogic;
        this.gameState = gameState;
    }

    public initGame(): GameRoom{
        this.gameLogic.initOfTheGame({playerHost: this.player_host, playerGuest: this.player_guest});
        return this;
    }
}