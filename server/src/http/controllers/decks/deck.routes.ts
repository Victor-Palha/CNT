import { FastifyInstance } from "fastify";
import { createDeckController } from "./create-deck.controller";
import { authOnly } from "../../middlewares/auth-only";

export async function DeckRoutes(app: FastifyInstance){
    app.post("/decks", {onRequest: [authOnly]}, createDeckController)
}