import { Cards, Deck } from "@prisma/client";

export interface CreateDeckRequest{
    player_id: string;
    avatar_id: string;
    deck_name: string;
    cards: Cards[];
}
export interface DecksRepository{
    createDeck({player_id, avatar_id, cards, deck_name}: CreateDeckRequest): Promise<Deck>;
    getDeckById(id: string): Promise<Deck | null>;
    fetchDecks(search: string): Promise<Deck[]>;
}