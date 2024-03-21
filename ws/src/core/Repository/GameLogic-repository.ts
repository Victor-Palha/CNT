import { Card } from "../Cards/Card";
import { Player } from "../Players/Player";
import { CardQueue } from "../Room/GameState";

export type InitGameRequest = {
    playerHost: Player;
    playerGuest: Player;
}
export type SetCardOnFieldRequest = {
    player: Player;
    card: any
    field_id: string
}

export type SetCardOnFieldResponse = {
    player: Player,
}

export type SkipTurnRequest = {
    player_id: string
    gameState: number
    player_host: Player
    player_guest: Player
}
export type SkipTurnResponse = {
    new_turn_owner: string
    gameState: number
}

export type ActivateCardOnFieldRequest = {
    player_host: Player
    player_guest: Player
    player_id: string
    field_id: string
    target_id: string | undefined
}

export type ActivateCardOnFieldResponse = {
    cardActivated: Card
}
export type ResolveChainEffectsRequest = {
    effect_queue: CardQueue[]
}

export type ResolveChainEffectsResponse = {
    gameState: number,
    new_turn_owner: string
}

export type GetPlayersRenderRequest = {
    player_host: Player
    player_guest: Player
    player_id: string
}

export type GetPlayersRenderResponse = {
    player: Player;
    opponent: Player;
}

export type ClimaxPhaseResolverRequest = {
    player_host: Player
    player_guest: Player
}

export type ClimaxPhaseResolverWithWinnerResponse = {
    winner: string
}

export type ClimaxPhaseResolverWithoutWinnerResponse = {
    winner: null,
    new_state_game: number
}


export interface GameLogicRepository {
    initOfTheGame: ({playerGuest, playerHost}: InitGameRequest) => Player
    setTurnOwner: (type: "OFENSIVO" | "DEFENSIVO" | "MODERADO") => number
    setCardOnField: ({card, field_id, player}: SetCardOnFieldRequest) => SetCardOnFieldResponse
    skipTurn: ({gameState, player_guest, player_host, player_id}: SkipTurnRequest) => SkipTurnResponse
    activateCardOnField: ({player_id, field_id, target_id}: ActivateCardOnFieldRequest) => ActivateCardOnFieldResponse
    resolveChainEffects: ({effect_queue}: ResolveChainEffectsRequest) => ResolveChainEffectsResponse
    getPlayersRender: ({player_id, player_host, player_guest}: GetPlayersRenderRequest) => GetPlayersRenderResponse
    climaxPhaseResolver: ({player_guest, player_host}: ClimaxPhaseResolverRequest) => ClimaxPhaseResolverWithWinnerResponse | ClimaxPhaseResolverWithoutWinnerResponse
    newTurn: ({player_guest, player_host}: ClimaxPhaseResolverRequest) => any
}
