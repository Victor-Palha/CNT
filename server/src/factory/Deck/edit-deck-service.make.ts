import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";
import { CardsPrismaRepository } from "../../repositories/prisma/Cards-prisma.repository";
import { DecksPrismaRepository } from "../../repositories/prisma/Decks-prisma.repository";
import { PlayerPrismaRepository } from "../../repositories/prisma/Player-prisma.repository";
import { EditDeckService } from "../../services/decks/edit-deck.service";


export function editDeckService_make(){
    const prismaPlayer = new PlayerPrismaRepository();
    const prismaDeck = new DecksPrismaRepository();
    const prismaAvatar = new AvatarPrismaRepository();
    const prismaCards = new CardsPrismaRepository();
    const service = new EditDeckService(
        prismaDeck,
        prismaCards,
        prismaAvatar,
        prismaPlayer
    );

    return service;
}