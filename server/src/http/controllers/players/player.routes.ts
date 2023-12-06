import { FastifyInstance } from "fastify";
import { createPlayerController } from "./create-player.controller";
import { authPlayerController } from "./auth-player.controller";
import { authOnly } from "../../middlewares/auth-only";
import { getPlayersDecksController } from "./get-players-decks.controller";

export async function PlayerRoutes(app: FastifyInstance){
    app.post("/signup", createPlayerController)
    app.post("/login", authPlayerController)
    app.get("/myDecks", {onRequest: [authOnly]}, getPlayersDecksController)
}