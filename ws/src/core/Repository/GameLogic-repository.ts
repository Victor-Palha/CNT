import { Card } from "../Cards/Card";
import { Player } from "../Players/Player";

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

export type SkipTurnResponse = {
    new_turn_owner: string
    gameState: number
    room_id: string
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

export type GetPlayersRenderRequest = {
    player_host: Player
    player_guest: Player
    player_id: string
}

export type GetPlayersRenderResponse = {
    player: Player;
    opponent: Player;
}
export interface GameLogicRepository {
    initOfTheGame: ({playerGuest, playerHost}: InitGameRequest) => Player
    setTurnOwner: (type: "OFENSIVO" | "DEFENSIVO" | "MODERADO") => number
    setCardOnField: ({card, field_id, player}: SetCardOnFieldRequest) => SetCardOnFieldResponse
    skipTurn: (player_id: string) => SkipTurnResponse
    activateCardOnField: ({player_id, field_id, target_id}: ActivateCardOnFieldRequest) => ActivateCardOnFieldResponse
    resolveChainEffects: () => void
    getPlayersRender: ({player_id, player_host, player_guest}: GetPlayersRenderRequest) => GetPlayersRenderResponse
    climaxPhaseResolver: () => void
}
