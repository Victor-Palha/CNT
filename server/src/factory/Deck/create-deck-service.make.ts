import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";
import { CardsPrismaRepository } from "../../repositories/prisma/Cards-prisma.repository";
import { DecksPrismaRepository } from "../../repositories/prisma/Decks-prisma.repository";
import { PlayerPrismaRepository } from "../../repositories/prisma/Player-prisma.repository";
import { CreateDeckService } from "../../services/decks/create-deck.service";

export function createDeckService_make() {
    const prismaPlayer = new PlayerPrismaRepository();
    const prismaDeck = new DecksPrismaRepository();
    const prismaAvatar = new AvatarPrismaRepository();
    const prismaCards = new CardsPrismaRepository();
    const service = new CreateDeckService(
        prismaDeck,
        prismaCards,
        prismaAvatar,
        prismaPlayer
    );

    return service;
}