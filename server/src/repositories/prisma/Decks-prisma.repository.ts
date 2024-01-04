import { Deck, Prisma } from "@prisma/client";
import { CreateDeckRequest, DeckWithCards, DecksRepository, UpdateDeckRequest } from "../Decks.repository";
import { prisma } from "../../../lib/prisma";

export class DecksPrismaRepository implements DecksRepository{
    async createDeck({player_id, avatar_id, cards, deck_name}: CreateDeckRequest): Promise<Deck> {
        const deck = await prisma.deck.create({
            data: {
                name: deck_name,
                player_id: player_id,
                avatar_id: avatar_id,
            }
            
        })
        
        cards.forEach(async (card) => {
            await prisma.cardsDeck.create({
                data: {
                    card_id: card.id_card,
                    deck_id: deck.id_deck
                }
            })
        })

        return deck;
    }

    async editDeck({ deck_id, avatar_id, cards, deck_name }: UpdateDeckRequest){
        const deck = await prisma.deck.update({
            where: {
                id_deck: deck_id
            },
            data: {
                name: deck_name,
                avatar_id: avatar_id
            }
        })

        await prisma.cardsDeck.deleteMany({
            where: {
                deck_id: deck_id
            }
        })

        cards.forEach(async (card) => {
            await prisma.cardsDeck.create({
                data: {
                    card_id: card.id_card,
                    deck_id: deck.id_deck
                }
            })
        })

        return deck;
    }

    async fetchDecks(search: string): Promise<Deck[]> {
        const decks = await prisma.deck.findMany({
            where: {
                player_id: {
                    equals: search
                }
            }
        })

        return decks;
    }

    async getDeckById(id: string): Promise<DeckWithCards> {
        const queryDeck = await prisma.deck.findUnique({
            where: {
                id_deck: id
            },
            include: {
                CardsDeck: {
                    include: {
                        cards: true
                    }
                }
            }
        })

        if(!queryDeck){
            throw new Error("Deck not found");
        }
        
        return {
            player_id: queryDeck.player_id,
            deck: {
                id_deck: queryDeck.id_deck,
                name: queryDeck.name,
            },
            cards: queryDeck.CardsDeck.map((card) => {
                return card.cards
            }),
            avatar_id: queryDeck.avatar_id

        };
    }
}