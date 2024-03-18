import { Socket } from "socket.io";
import { Game } from "..";
import { ActivateCard } from "../events/activate-card.event";
import { CancelChain } from "../events/cancel-chain.event";
import { ClimaxPhase } from "../events/climax-phase.event";
import { InitGame } from "../events/init-game.event";
import { SetCard } from "../events/set-card.event";
import { SkipTurn } from "../events/skip-turn.event";
import { Surrender } from "../events/surrender.event";

export function Events(socket: Socket, INSTANCE: Game){
    InitGame(socket, INSTANCE)
    ActivateCard(socket, INSTANCE)
    CancelChain(socket, INSTANCE)
    ClimaxPhase(socket, INSTANCE)
    SetCard(socket, INSTANCE)
    SkipTurn(socket, INSTANCE)
    Surrender(socket, INSTANCE)
}