import { DecksRepository } from "../../repositories/Decks.repository";
import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";

interface GetDeckServiceRequest{
    player_id: string;
    deck_id: string;
}
export class GetDeckService{
    constructor(
        private deckRepository: DecksRepository,
        private avatarPrisma: AvatarPrismaRepository
    ){}
    async execute({player_id, deck_id}: GetDeckServiceRequest){
        let getDeck = await this.deckRepository.getDeckById(deck_id);
        if(!getDeck){
            throw new Error("Deck not found");
        }
        const avatar = await this.avatarPrisma.getAvatarById(getDeck.avatar_id as string)
        if(!avatar){
            throw new Error("Avatar not found");
        }
        if(getDeck.player_id !== player_id){
            throw new Error("You do not have permission to access this deck");
        }
        const deck = {
            id_deck: getDeck.deck.id_deck,
            deck_name: getDeck.deck.name,
            cards: getDeck.cards,
            avatar
        }
        return deck;
    }
}