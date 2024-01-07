import { DecksPrismaRepository } from "../../repositories/prisma/Decks-prisma.repository";
import { PlayerPrismaRepository } from "../../repositories/prisma/Player-prisma.repository";
import { GetPlayersDecksService } from "../../services/players/get-players-decks.service";

export function GetPlayersDecksService_make(){
    const deckPrisma = new DecksPrismaRepository()
    const playersPrisma = new PlayerPrismaRepository()
    const service = new GetPlayersDecksService(playersPrisma, deckPrisma)

    return service
}