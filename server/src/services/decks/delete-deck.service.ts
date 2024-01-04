import { DecksRepository } from "../../repositories/Decks.repository";

type DeleteDeckServiceRequest = {
    deck_id: string;
    player_id: string;
}
export class DeleteDeckService{
    constructor(
        private deckRepository: DecksRepository
    ){}

    async execute({deck_id, player_id}: DeleteDeckServiceRequest){
        const deck = await this.deckRepository.getDeckById(deck_id);
        if(!deck){
            throw new Error("Deck not found");
        }
        if(deck.player_id !== player_id){
            throw new Error("You don't have permission to delete this deck");
        }
        
        await this.deckRepository.deleteDeck(deck_id);
    }
}