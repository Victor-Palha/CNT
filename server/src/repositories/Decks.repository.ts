import { Cards, Deck } from "@prisma/client";

export interface CreateDeckRequest{
    player_id: string;
    avatar_id: string;
    deck_name: string;
    cards: Cards[];
}

export interface DeckWithCards{
    deck: {
        id_deck: string | undefined;
        name: string | undefined;
    } | null;
    cards: Cards[] | undefined;
    avatar_id: string | undefined;
}
export interface DecksRepository{
    createDeck({player_id, avatar_id, cards, deck_name}: CreateDeckRequest): Promise<Deck>;
    getDeckById(id: string): Promise<DeckWithCards>;
    fetchDecks(search: string): Promise<Deck[]>;
}