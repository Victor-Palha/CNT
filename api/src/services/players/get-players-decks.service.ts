import { Deck } from "@prisma/client";
import { DecksRepository } from "../../repositories/Decks.repository";
import { PlayerRepository } from "../../repositories/Player.repository";

interface GetPlayersDecksServiceResponse{
    decks: Deck[]
}
export class GetPlayersDecksService{
    constructor(
        private playerRepository: PlayerRepository,
        private deckRepository: DecksRepository
    ){}

    async execute(player_id:string): Promise<GetPlayersDecksServiceResponse>{
        const playerExists = await  this.playerRepository.getPlayerById(player_id)
        if(!playerExists){
            throw new Error("Player not found!")
        }

        const decks = await this.deckRepository.fetchDecks(playerExists.id_player)

        return {decks}

    }
}