import { TypeAvatar } from "@prisma/client";
import { Cards } from "./Cards";
import { randomUUID } from "crypto";

interface IAvatar {
    id_avatar?: string;
    name: string;
    image: string;
    description: string;
    set_avatar: string;
    unique_ability: Cards;
    passive_ability: string | null;
    hit_points: number;
    attack: number;
    defense: number;
    type_avatar: TypeAvatar;

}
export class Avatar{
    private id_avatar: string;
    private name: string;
    private image: string;
    private description: string;
    private set_avatar: string;
    private unique_ability: Cards;
    private passive_ability: string | null;
    private hit_points: number;
    private attack: number;
    private defense: number;
    private type_avatar: TypeAvatar;
    constructor({id_avatar, name, image, description, set_avatar, unique_ability, passive_ability, hit_points, attack, defense, type_avatar}: IAvatar){
        this.id_avatar = id_avatar ? id_avatar : randomUUID();
        this.name = name;
        this.image = image;
        this.description = description;
        this.set_avatar = set_avatar;
        this.unique_ability = unique_ability;
        this.passive_ability = passive_ability;
        this.hit_points = hit_points;
        this.attack = attack;
        this.defense = defense;
        this.type_avatar = type_avatar;
    }

    get getAvatar(){
        return {
            id_avatar: this.id_avatar,
            name: this.name,
            image: this.image,
            description: this.description,
            set_avatar: this.set_avatar,
            unique_ability: this.unique_ability,
            passive_ability: this.passive_ability,
            hit_points: this.hit_points,
            attack: this.attack,
            defense: this.defense,
            type_avatar: this.type_avatar
        }
    }
}