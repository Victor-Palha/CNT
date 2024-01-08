import { CardEffect } from "./Cards-Effects/Card-Effect";
import { Backup } from "./Cards-Effects/defensives/Backup";
import { BloquearAcesso } from "./Cards-Effects/defensives/Bloquear_acesso";
import { CtrlX } from "./Cards-Effects/defensives/Ctrl_x";
import { EstimulanteB } from "./Cards-Effects/defensives/Estimulante-b";
import { ProtegerSistema } from "./Cards-Effects/defensives/Proteger-sistema";
import { Firewall } from "./Cards-Effects/defensives/Firewall";
import { ArquivoCorrompido } from "./Cards-Effects/offensives/Arquivo_corrompido";
import { CtrlZ } from "./Cards-Effects/offensives/Ctrl_z";
import { Estimulante_A } from "./Cards-Effects/offensives/Estimulante-a";
import { QuebraDeSeguranca } from "./Cards-Effects/offensives/Quebra-de-seguranca";
import { RecorteDeCodigo } from "./Cards-Effects/offensives/Recorte-de-codigo";
import { ReforcarDefesa } from "./Cards-Effects/offensives/Reforcar_defesa";
import { Metasploit } from "./Cards-Effects/unique-abilities/Metasploit";
import { BurnOut } from "./Cards-Effects/unique-abilities/Burn-out";
import { RegraDeFirewall } from "./Cards-Effects/unique-abilities/Regra-de-firewall";
import { Backdoor } from "./Cards-Effects/unique-abilities/Backdoor";
import { DeletarArquivo } from "./Cards-Effects/abilities/Deletar-arquivo";
import { Formatar } from "./Cards-Effects/abilities/Formatar";
import { SuporteTecnico } from "./Cards-Effects/abilities/Suporte-tecnico";
import { ForcarAcesso } from "./Cards-Effects/abilities/Forcar-acesso";
import { DDos } from "./Cards-Effects/abilities/DDos";
import { BancoDeDados } from "./Cards-Effects/abilities/Banco-de-dados";

export type Cards = {
    id_card: string;
    name: string;
    description: string;
    image: string;
    set_card: string;
    type_card: "OFENSIVA" | "DEFENSIVA" | "HABILIDADE" | "HABILIDADE_UNICA";
    list: number;
    activate: boolean;
    originalOwner: string;
}
// Target is just a reference to client to know what show in the effect
type CardTarget = {
    has: boolean;
    type: "FIELD" | "DECK" | "NUMBER" | null
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
    private originalOwner: string = "";
    private cartEffectOccurred: boolean = false;
    private targetCard: CardTarget = {
        has: false,
        type: null
    }
    private negated: boolean = false;

    constructor({id_card, name, description, image, set_card, type_card, list, originalOwner}: Cards){
        this._id = id_card;
        this.name = name;
        this.description = description;
        this.image = image;
        this.set_card = set_card;
        this.type_card = type_card;
        this.list = list;
        this.originalOwner = originalOwner;
        // Inicializa o efeito da carta **EXTREMAMENTE IMPORTANTE**
        this.effect = this.initializeEffect();
    }

    /**
     * Initializes and returns the effect of the card based on its type.
     * @returns The initialized card effect.
     */
    private initializeEffect(): CardEffect {
        // Lógica para escolher e inicializar o efeito com base no tipo da carta
        switch (this.id_card) {
            case "8eb8961e-b2c1-47fa-8a29-be31d42de60b":
                this.turnsRemains = 2;
                return new RecorteDeCodigo();
            case "4875dcd2-d13d-4425-9c05-1472bdb9466c":
                return new Estimulante_A();
            case "af7530ea-a6ce-48cb-9bd7-b71f28cf899e":
                return new QuebraDeSeguranca();
            case "fab2f5ec-e1eb-4c48-9c6c-0ca56993e90f":
                return new ReforcarDefesa();
            case "672be8c9-11ca-4e24-93f2-96d4f35fcc0f":
                return new CtrlZ();
            case "e4c24e34-91b9-4e52-a4de-46f66deaefb7":
                return new ArquivoCorrompido();
            case "f8bda8f6-7f20-4d48-9b30-8232dd492032":
                return new Firewall();
            case "66c20126-4341-42dc-a154-78c70dbcb556":
                return new CtrlX();
            case "98277fc4-6ad8-4807-ac2c-069725ee81b6":
                return new EstimulanteB();
            case "7b5037ea-083a-4591-9209-23e6f3f0540f":
                return new BloquearAcesso();
            case "ae3e91cf-0d58-4fce-970a-b29ed5329e28":
                return new Backup();
            case "b1c698dc-02c9-4789-a278-de1fe59da5b0":
                return new ProtegerSistema();
            case "52a2ba2b-a17a-4129-8739-b6da9cf110df":
                return new Metasploit();
            case "26e6973c-4bb4-45ab-95f4-eb01f64ee123":
                return new BurnOut();
            case "d57f235a-431f-4c99-802b-57f849deb082":
                this.targetCard = {
                    has: true,
                    type: "FIELD"
                }
                return new RegraDeFirewall();
            case "fcf3ee48-6e6a-4275-86c1-1f54add1b44b":
                return new Backdoor();
            case "39ed4108-fb5d-4917-8d1d-eda4b3a7afdc":
                this.targetCard = {
                    has: true,
                    type: "FIELD"
                }
                return new DeletarArquivo();
            case "5c72c51f-b4ba-4076-8bf1-20c79cd84692":
                return new Formatar();
            case "b2dd85af-964e-4ebe-a00e-cd9a6ba83dd1":
                return new SuporteTecnico();
            case "8f70751b-a0b4-43be-b36f-4532ed6ac6ce":
                this.targetCard = {
                    has: true,
                    type: "FIELD"
                }
                return new ForcarAcesso()
            case "d5e286b6-4fa9-4808-be77-186eae6c84e0":
                this.targetCard = {
                    has: true,
                    type: "NUMBER"
                }
                return new DDos();
            case "d76a7aa9-b8a5-429c-87c2-e8c98bd44990":
                return new BancoDeDados();
            
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

    get isActivate(){
        return this.activate;
    }

    get turns(){
        return this.turnsRemains;
    }

    set turns(value: number){
        this.turnsRemains = value;
    }

    get target(){
        return this.targetCard
    }

    get isNegated(){
        return this.negated;
    }

    set negatedCard(value: boolean){
        this.negated = value;
    }

    get name_card(){
        return this.name;
    }

    get description_card(){
        return this.description;
    }

    get image_card(){
        return this.image;
    }

    get set(){
        return this.set_card;
    }

    get list_card(){
        return this.list;
    }

    get owner(){
        return this.originalOwner;
    }

    set effectOccurred(value: boolean){
        this.cartEffectOccurred = value;
    }

    get effectOccurred(){
        return this.cartEffectOccurred;
    }
}