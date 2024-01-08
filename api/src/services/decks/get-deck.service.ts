import { DecksRepository } from "../../repositories/Decks.repository";
import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";

interface GetDeckServiceRequest{
    deck_id: string;
}
export class GetDeckService{
    constructor(
        private deckRepository: DecksRepository,
        private avatarPrisma: AvatarPrismaRepository
    ){}
    async execute({deck_id}: GetDeckServiceRequest){
        let getDeck = await this.deckRepository.getDeckById(deck_id);
        if(!getDeck){
            throw new Error("Deck not found");
        }
        const avatar = await this.avatarPrisma.getAvatarById(getDeck.avatar_id as string)
        if(!avatar){
            throw new Error("Avatar not found");
        }
        const deck = {
            id_deck: getDeck.deck.id_deck,
            player_id: getDeck.player_id,
            deck_name: getDeck.deck.name,
            cards: getDeck.cards,
            avatar
        }
        return deck;
    }
}