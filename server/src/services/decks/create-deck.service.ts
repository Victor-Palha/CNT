import { Cards } from "@prisma/client";
import { AvatarRepository } from "../../repositories/Avatar.repository";
import { CardsRepository } from "../../repositories/Cards.repository";
import { DecksRepository } from "../../repositories/Decks.repository";
import { PlayerRepository } from "../../repositories/Player.repository";

interface CreateDeckRequest{
    player_id: string;
    avatar_id: string;
    deck_name: string;
    cards: string[];
}
export class CreateDeckService{
    constructor(
        private deckRepository: DecksRepository,
        private cardsRepository: CardsRepository,
        private avatarRepository: AvatarRepository,
        private playerRepository: PlayerRepository,
    ){}

    async execute({player_id, avatar_id, deck_name, cards}: CreateDeckRequest){
        const player = await this.playerRepository.getPlayerById(player_id);

        if(!player){
            throw new Error("Player not found");
        }

        const avatar = await this.avatarRepository.getAvatarById(avatar_id);

        if(!avatar){
            throw new Error("Avatar not found");
        }
        let cardsInDeck: Cards[] = [];
        let uniqueAbilityCount: number = 0;

        for(let card of cards){
            const cardInDeck = await this.cardsRepository.getCardById(card);

            if(!cardInDeck){
                throw new Error("Card not found");
            }

            if(cardInDeck.type_card === "HABILIDADE_UNICA"){
                uniqueAbilityCount++;
            }
            if(uniqueAbilityCount > 1){
                throw new Error("Deck can only have one unique ability card");
            }

            cardsInDeck.push(cardInDeck);
        }

        const deck = await this.deckRepository.createDeck({
            Player: {
                connect: {
                    id_player: player.id_player
                }
            },
            Avatar: {
                connect: {
                    id_avatar: avatar.id_avatar
                }
            },
            CardsDeck: {
                createMany: {
                    data: cardsInDeck.map(card => {
                        return {
                            card_id: card.id_card
                        }
                    })
                }
            },
            name: deck_name
        });
        
        return deck;
    }
}