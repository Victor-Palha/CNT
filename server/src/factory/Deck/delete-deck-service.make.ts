import { DecksPrismaRepository } from "../../repositories/prisma/Decks-prisma.repository";
import { DeleteDeckService } from "../../services/decks/delete-deck.service";

export function deleteDeckService_make(){
    const deckRepository = new DecksPrismaRepository();
    const service = new DeleteDeckService(deckRepository);
    return service;
}