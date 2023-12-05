import { Prisma } from "@prisma/client";
import { CardsRepository } from "../../repositories/Cards.repository";

export class CreateCardService{
    constructor(private cardRepository: CardsRepository){}
    async execute(data: Prisma.CardsCreateInput){
        const card = await this.cardRepository.createCard(data);
        return card;
    }
}