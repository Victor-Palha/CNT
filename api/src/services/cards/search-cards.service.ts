import { Avatars, Cards } from "@prisma/client";
import { AvatarRepository } from "../../repositories/Avatar.repository";
import { CardsRepository } from "../../repositories/Cards.repository";

interface SearchCardsServiceResponse{
    cards: Cards[] | [];
    avatars: Avatars[] | [];
}
export class SearchCardsService{
    constructor(
        private cardsRepository: CardsRepository,
        private avatarRepository: AvatarRepository
    ){}

    async execute(search: string){
        const cards = await this.cardsRepository.fetchCards(search);
        let avatars = await this.avatarRepository.fetchAvatars(search);
        
        return {cards, avatars};
    }
}