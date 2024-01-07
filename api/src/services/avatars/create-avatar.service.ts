import { Prisma } from "@prisma/client";
import { AvatarRepository } from "../../repositories/Avatar.repository";
import { CardsRepository } from "../../repositories/Cards.repository";
import { readFileSync, writeFileSync } from "node:fs";

export class CreateAvatarService{
    private localStorage = JSON.parse(readFileSync(__dirname + "/../../../data/avatares.local.json").toString())
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

        writeFileSync(__dirname + "/../../../data/avatares.local.json", JSON.stringify([...this.localStorage, avatar]));

        return avatar;
    }
}