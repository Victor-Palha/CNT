import { Cards, Deck } from "@prisma/client";

export interface CreateDeckRequest{
    player_id: string;
    avatar_id: string;
    deck_name: string;
    cards: Cards[];
}

export interface UpdateDeckRequest{
    deck_id: string;
    avatar_id: string;
    deck_name: string;
    cards: Cards[];
}

export interface DeckWithCards{
    player_id: string;
    deck: {
        id_deck: string;
        name: string;
    };
    cards: Cards[];
    avatar_id: string;
}
export interface DecksRepository{
    createDeck({player_id, avatar_id, cards, deck_name}: CreateDeckRequest): Promise<Deck>;
    editDeck({deck_id, avatar_id, cards, deck_name}: UpdateDeckRequest): Promise<Deck>;
    deleteDeck(deck_id: string): Promise<void>;
    getDeckById(id: string): Promise<DeckWithCards>;
    fetchDecks(search: string): Promise<Deck[]>;
}