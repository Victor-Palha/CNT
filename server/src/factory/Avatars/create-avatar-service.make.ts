import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";
import { CardsPrismaRepository } from "../../repositories/prisma/Cards-prisma.repository";
import { CreateAvatarService } from "../../services/avatars/create-avatar.service";

export function createAvatarService_make() {
    const prismaAvatar = new AvatarPrismaRepository();
    const prismaCards = new CardsPrismaRepository();
    const service = new CreateAvatarService(prismaAvatar, prismaCards);

    return service;
}