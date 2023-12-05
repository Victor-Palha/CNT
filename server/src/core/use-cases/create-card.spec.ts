import { describe, it } from "vitest";
import { Cards } from "../entities/Cards";

describe("CreateCard", () => {
    it("should create a card", () => {

        const card = {
            name: "Recorte de código",
            description: "Equipa no avatar uma lamina que aumenta seu ataque em 2 e diminui a defesa do alvo do ataque em  3 pontos. O efeito de 'Recorte de código' dura 2 turnos, só pode  ter uma desta carta ativa.",
            image: "https://i.imgur.com/9rVbKXq.png",
            set_card: "Base",
            type_card: "OFENSIVA" as const,
            copies: 3
        }

        const RecorteDeCodigo = new Cards(card);

        console.log(RecorteDeCodigo.getCard)
    })
})