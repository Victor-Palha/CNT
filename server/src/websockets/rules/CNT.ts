import { Avatars, Cards } from "@prisma/client";
import { DeckWithCards } from "../../repositories/Decks.repository";
import { AvatarPrismaRepository } from "../../repositories/prisma/Avatar-prisma.repository";
import { DecksPrismaRepository } from "../../repositories/prisma/Decks-prisma.repository"
import { PlayerPrismaRepository } from "../../repositories/prisma/Player-prisma.repository"
import { CntRepository } from "./CNTRepository";


export interface DeckPlayer extends Omit<DeckWithCards, "avatar_id"> {
    avatar: Avatars | null;
}

export class CNT implements CntRepository{
    private _id: string = ""
    protected deck: DeckPlayer = {} as DeckPlayer;
    protected cards: Cards[] | undefined = [];
    protected avatar: Avatars | null = null;

    constructor(
        private deckPrisma = new DecksPrismaRepository(), 
        private avatarPrisma = new AvatarPrismaRepository()
    ){}

    public async getDeck(deck_id: string): Promise<DeckPlayer | undefined>{
        const deck = await this.deckPrisma.getDeckById(deck_id)
        const avatar = await this.avatarPrisma.getAvatarById(deck.avatar_id as string)

        this.deck = {
            deck: {
                id_deck: deck.deck?.id_deck,
                name: deck.deck?.name,
            },
            cards: deck.cards,
            avatar: avatar
        
        };
        this.avatar = avatar;
        this.cards = deck.cards;

        return this.deck;
        
    }

    static async GetPlayer(player_id: string){
        const player = await new PlayerPrismaRepository().getPlayerById(player_id)
        return player?.username
    }

    public resetAttributes(){
        this._id = ""
        this.deck = {} as DeckPlayer
        this.cards = []
        this.avatar = null
    }

    get takeInfo(){
        return this.deck
    }

    get getAvatar(){
        return this.avatar
    }

    get getDeckCards(){
        return this.cards
    }

    set id(id: string){
        this._id = id
    }

    get id(){
        return this._id
    }
}