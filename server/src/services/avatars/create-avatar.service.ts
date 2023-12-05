import { Prisma } from "@prisma/client";
import { AvatarRepository } from "../../repositories/Avatar.repository";
import { CardsRepository } from "../../repositories/Cards.repository";

export class CreateAvatarService{
    constructor(
        private avatarRepository: AvatarRepository, 
        private cardsRepository: CardsRepository
    ){}

    async execute(data: Prisma.AvatarsCreateInput){
        const card = await this.cardsRepository.getCardById(data.unique_ability);

        if(!card){
            throw new Error("Unique Ability Card not found");
        }

        const avatar = await this.avatarRepository.createAvatar(data);
        return avatar;
    }
}