import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";
import { CardsPrismaRepository } from "../../repositories/prisma/Cards-prisma.repository";
import { SearchCardsService } from "../../services/cards/search-cards.service";

export function searchCardsService_make(){
    const prismaCards = new CardsPrismaRepository();
    const prismaAvatars = new AvatarPrismaRepository();
    const service = new SearchCardsService(prismaCards, prismaAvatars);

    return service;
}