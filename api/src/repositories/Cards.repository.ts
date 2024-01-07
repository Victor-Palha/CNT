import { Cards, Prisma } from "@prisma/client";

export interface CardsRepository{
    createCard(data: Prisma.CardsCreateInput): Promise<Cards>;
    getCardById(id: string): Promise<Cards | null>;
    fetchCards(search: string): Promise<Cards[]>;
}