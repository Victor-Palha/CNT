import { describe, it } from "vitest";
import { Cards } from "../entities/Cards";
import { Player } from "../entities/Player";
import { Avatar } from "../entities/Avatar";
import { Deck } from "../entities/Deck";

describe("Create Deck", () => {
    it("should create a deck", () => {
        const player = {
            username: "Ash",
            email: "ash@ash.com",
            password: "123456",
        }

        const Ash = new Player(player);

        const unique_ability = {
            name: "Burn Out",
            description: "Cura 4 de vida e ROUBA 2 pontos de defesa do oponente e coloca no seu próprio ataque.",
            image: "https://i.imgur.com/9rVbKXq.png",
            set_card: "Base",
            type_card: "HABILIDADE" as const,
            copies: 1
        }
        const avatar = {
            name: "Programador",
            description: "Some description",
            image: "https://i.imgur.com/9rVbKXq.png",
            set_avatar: "Base",
            unique_ability: new Cards(unique_ability),
            passive_ability: null,
            hit_points: 35,
            attack: 12,
            defense: 14,
            type_avatar: "DEFENSIVO" as const
        }

        const Programador = new Avatar(avatar);

        const deck = {
            name: "Deck do Ash",
            avatar: Programador,
            cards: [new Cards(unique_ability)],
            id_player: Ash.getPlayer.id_player
        }

        const DeckDoAsh = new Deck(deck);

        console.log(DeckDoAsh.getDeck)
    })
})