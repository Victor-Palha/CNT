import { Cards, Prisma } from "@prisma/client";
import { CardsRepository } from "../Cards.repository";
import { prisma } from "../../../lib/prisma";

export class CardsPrismaRepository implements CardsRepository{
    async createCard(data: Prisma.CardsCreateInput): Promise<Cards> {
        const card = await prisma.cards.create({
            data
        })

        return card;
    }

    async fetchCards(search: string): Promise<Cards[]> {
        const cards = await prisma.cards.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })

        return cards;
    }

    async getCardById(id: string): Promise<Cards | null> {
        const card = await prisma.cards.findUnique({
            where: {
                id_card: id
            }
        })

        return card;
    }
}