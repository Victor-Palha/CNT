import { CardEffect } from "./Cards-Effects/Card-Effect";
import { Estimulante_A } from "./Cards-Effects/offensives/Estimulante-a";
import { QuebraDeSeguranca } from "./Cards-Effects/offensives/Quebra-de-seguranca";
import { RecorteDeCodigo } from "./Cards-Effects/offensives/Recorte-de-codigo";

type Cards = {
    id_card: string;
    name: string;
    description: string;
    image: string;
    set_card: string;
    type_card: "OFENSIVA" | "DEFENSIVA" | "HABILIDADE" | "HABILIDADE_UNICA";
    list: number;
    activate: boolean;
}

export class Card{
    private _id: string;
    private name: string;
    private description: string;
    private image: string;
    private set_card: string;
    private type_card: "OFENSIVA" | "DEFENSIVA" | "HABILIDADE" | "HABILIDADE_UNICA";
    private list: number;
    private turnsRemains: number = 1;
    private effect: CardEffect;
    private activate: boolean = false;


    constructor({id_card, name, description, image, set_card, type_card, list}: Cards){
        this._id = id_card;
        this.name = name;
        this.description = description;
        this.image = image;
        this.set_card = set_card;
        this.type_card = type_card;
        this.list = list;
        this.effect = this.initializeEffect();
    }

    private initializeEffect(): CardEffect {
        // Lógica para escolher e inicializar o efeito com base no tipo da carta
        switch (this.id_card) {
            case "8eb8961e-b2c1-47fa-8a29-be31d42de60b":
                this.turnsRemains = 2;
                return new RecorteDeCodigo();
            case "4875dcd2-d13d-4425-9c05-1472bdb9466c":
                this.turnsRemains = 1;
                return new Estimulante_A();
            case "af7530ea-a6ce-48cb-9bd7-b71f28cf899e":
                this.turnsRemains = 1;
                return new QuebraDeSeguranca();

            // Adicione outros casos para diferentes tipos de carta
            default:
                return {} as CardEffect;
        }
    }

    get cardEffect(){
        return this.effect;
    }

    get id_card(){
        return this._id;
    }

    get type(){
        return this.type_card;
    }

    set activateCard(value: boolean){
        this.activate = value;
    }
}