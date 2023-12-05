import { CardsDeck, Prisma } from "@prisma/client";

export interface CardsDeckRepository {
    createCard(data: Prisma.CardsDeckInclude): Promise<CardsDeck>;
    getCardById(id: string): Promise<CardsDeck>;
    fetchCards(search: string): Promise<CardsDeck[]>;
}