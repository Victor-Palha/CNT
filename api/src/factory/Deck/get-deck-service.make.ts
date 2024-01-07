import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";
import { DecksPrismaRepository } from "../../repositories/prisma/Decks-prisma.repository";
import { GetDeckService } from "../../services/decks/get-deck.service";

export function getDeckService_make(){
    const avatarRepository = new AvatarPrismaRepository();
    const deckRepository = new DecksPrismaRepository();
    const service = new GetDeckService(deckRepository, avatarRepository);

    return service;
}