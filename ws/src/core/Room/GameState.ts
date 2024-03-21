import { Card } from "../Cards/Card";
import { Player } from "../Players/Player";

export interface CardQueue {
    field_id: string;
    target: string | null;
    player: Player;
    enemy: Player;
}

type Historic = {
    player: string;
    turn: number;
    action: string;
    card: Card;
    target?: string;
}

export class GameState {
    private turn: number = 1;
    private turnOwner: string = '';
    private chainEffects: CardQueue[] = [];
    private inChain: boolean = false;
    private room_state: 0 | 1 | 2 | 3 = 1;
    private winner: string | null = null;
    private sockets: string[] = [];
    private historic: Historic[] = [];

    public get getTurnNumber(){
        return this.turn
    }
    public set setTurnNumber(turn: number){
        this.turn = turn
    }
    public get getTurnOwner(){
        return this.turnOwner
    }
    public set setTurnOwner(owner: string){
        this.turnOwner = owner
    }
    public get getChainEffects(){
        return this.chainEffects
    }
    public set setChainEffects(chain: CardQueue){
        this.chainEffects.push(chain);
    }
    public get getInChain(){
        return this.inChain
    }
    public set setInChain(chain: boolean){
        this.inChain = chain
    }
    public get getRoomState(){
        return this.room_state
    }
    public set setRoomState(state: 0 | 1 | 2 | 3){
        this.room_state = state
    }
    public get getWinner(){
        return this.winner
    }
    public set setWinner(winner: string | null){
        this.winner = winner
    }
    public get getSockets(){
        return this.sockets
    }
    public set setSockets(sockets: string[]){
        this.sockets = sockets
    }
    public get getHistoric(){
        return this.historic
    }
    public set setHistoric(historic: Historic){
        this.historic.push(historic)
    }

    public newSocketsPlayers(oldSocket: string, newSocket: string){
        //delete old socket
        const index = this.sockets.indexOf(oldSocket);
        if(index > -1){
            this.sockets.splice(index, 1);
        }
        //add new socket
        this.sockets.push(newSocket);
    }
}