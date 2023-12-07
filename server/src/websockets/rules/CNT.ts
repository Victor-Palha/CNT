import { Avatars, Cards } from "@prisma/client";
import { DeckWithCards } from "../../repositories/Decks.repository";
import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";
import { DecksPrismaRepository } from "../../repositories/prisma/Decks-prisma.repository"
import { PlayerPrismaRepository } from "../../repositories/prisma/Player-prisma.repository"

// interface CNTInterface{
//     // player_id: string,
//     deck_id: string,
// }
export interface DeckPlayer extends Omit<DeckWithCards, "avatar_id"> {
    avatar: Avatars | null;
}

export class CNT{
    private deckPrisma = new DecksPrismaRepository()
    private avatarPrisma = new AvatarPrismaRepository()

    protected deck: DeckPlayer = {} as DeckPlayer;
    protected cards: Cards[] | undefined = [];
    protected avatar: Avatars | null = null;

    async getDeck(deck_id: string){
        const deck = await this.deckPrisma.getDeckById(deck_id)
        const avatar = await this.avatarPrisma.getAvatarById(deck.avatar_id as string)

        this.deck = {
            deck: {
                id_deck: deck.deck?.id_deck,
                name: deck.deck?.name,
            },
            cards: deck.cards,
            avatar: avatar
        
        };
        this.avatar = avatar;
        this.cards = deck.cards;
    }

    public takeInfo(){
        return this.deck
    }
}