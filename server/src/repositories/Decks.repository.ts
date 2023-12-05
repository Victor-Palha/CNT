import { Deck, Prisma } from "@prisma/client";

export interface DecksRepository{
    createDeck(data: Prisma.DeckCreateInput): Promise<Deck>;
    getDeckById(id: string): Promise<Deck | null>;
    fetchDecks(search: string): Promise<Deck[]>;
}