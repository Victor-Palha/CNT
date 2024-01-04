import { Cards } from "@prisma/client";
import { AvatarRepository } from "../../repositories/Avatar.repository";
import { CardsRepository } from "../../repositories/Cards.repository";
import { DecksRepository } from "../../repositories/Decks.repository";
import { PlayerRepository } from "../../repositories/Player.repository";

interface EditDeckRequest{
    player_id: string;
    deck_id: string;
    avatar_id: string;
    deck_name: string;
    cards: string[];
}
export class EditDeckService{
    constructor(
        private deckRepository: DecksRepository,
        private cardsRepository: CardsRepository,
        private avatarRepository: AvatarRepository,
        private playerRepository: PlayerRepository,
    ){}

    async execute({player_id, avatar_id, cards, deck_id, deck_name}: EditDeckRequest){
        const playerExists = await this.playerRepository.getPlayerById(player_id);
        if(!playerExists){
            throw new Error("Player not found");
        }
        const avatar = await this.avatarRepository.getAvatarById(avatar_id);
        if(!avatar){
            throw new Error("Avatar not found");
        }
        let cardsInDeck: Cards[] = [];
        let uniqueAbilityCount: number = 0;

        for(let card in cards){
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

        const deck = await this.deckRepository.editDeck({
            deck_id: deck_id,
            avatar_id: avatar.id_avatar,
            deck_name: deck_name,
            cards: cardsInDeck
        });

        return deck;
    }
}