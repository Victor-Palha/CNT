import { TypeCard } from "@prisma/client";
import { randomUUID } from "node:crypto";

interface ICards {
    id_card?: string;
    name: string;
    description: string;
    image: string;
    set_card: string;
    type_card: TypeCard;
    copies: number;

}
export class Cards{
    private id_card: string;
    private name: string;
    private description: string;
    private image: string;
    private set_card: string;
    private type_card: TypeCard;
    private copies: number;
    constructor({id_card, name, description, image, set_card, type_card, copies}: ICards){
        this.id_card = id_card ? id_card : randomUUID();
        this.name = name;
        this.description = description;
        this.image = image;
        this.set_card = set_card;
        this.type_card = type_card;
        this.copies = copies;
    }

    get getCard(){
        return {
            id_card: this.id_card,
            name: this.name,
            description: this.description,
            image: this.image,
            set_card: this.set_card,
            type_card: this.type_card,
            copies: this.copies
        }
    }
}