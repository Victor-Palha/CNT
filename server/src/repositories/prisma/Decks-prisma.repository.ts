import { Deck, Prisma } from "@prisma/client";
import { DecksRepository } from "../Decks.repository";
import { prisma } from "../../../lib/prisma";

export class DecksPrismaRepository implements DecksRepository{
    async createDeck(data: Prisma.DeckCreateInput): Promise<Deck> {
        const deck = await prisma.deck.create({
            data
        })

        return deck;
    }

    async fetchDecks(search: string): Promise<Deck[]> {
        const decks = await prisma.deck.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })

        return decks;
    }

    async getDeckById(id: string): Promise<Deck | null> {
        const deck = await prisma.deck.findUnique({
            where: {
                id_deck: id
            }
        })

        return deck;
    }
}