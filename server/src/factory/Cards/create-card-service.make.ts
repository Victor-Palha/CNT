import { CardsPrismaRepository } from "../../repositories/prisma/Cards-prisma.repository";
import { CreateCardService } from "../../services/cards/create-card.service";

export function createCardService_make(){
    const prismaCards = new CardsPrismaRepository();
    const service = new CreateCardService(prismaCards);

    return service;
}