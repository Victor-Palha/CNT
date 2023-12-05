import { describe, it } from "vitest";
import { Cards } from "../entities/Cards";
import { Player } from "../entities/Player";

describe("Create Player", () => {
    it("should create a player", () => {

        const player = {
            username: "Ash",
            email: "ash@ash.com",
            password: "123456",
        }

        const Ash = new Player(player);

        console.log(Ash.getPlayer)
    })
})