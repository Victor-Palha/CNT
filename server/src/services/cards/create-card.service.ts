import { Prisma } from "@prisma/client";
import { CardsRepository } from "../../repositories/Cards.repository";
import { readFileSync, writeFileSync } from "node:fs";

export class CreateCardService{
    private localStorage = JSON.parse(readFileSync(__dirname + "/../../../data/cards.local.json").toString())

    constructor(private cardRepository: CardsRepository){}
    async execute(data: Prisma.CardsCreateInput){
        const card = await this.cardRepository.createCard(data);

        writeFileSync(__dirname + "/../../../data/cards.local.json", JSON.stringify([...this.localStorage, card]));
        return card;
    }
}