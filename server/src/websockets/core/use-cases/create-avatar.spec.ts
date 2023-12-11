import { describe, it } from "vitest";
import { Avatar } from "../entities/Avatar";
import { Cards } from "../entities/Cards";

describe("Create Avatar", () => {
    it("should create a avatar", () => {
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

        console.log(Programador.getAvatar)
    })
})