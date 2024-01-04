import { FastifyInstance } from "fastify";
import { createDeckController } from "./create-deck.controller";
import { authOnly } from "../../middlewares/auth-only";
import { getDeckController } from "./get-deck.controller";

export async function DeckRoutes(app: FastifyInstance){
    app.get("/deck/:deck_id", {onRequest: [authOnly]}, getDeckController)
    app.post("/deck", {onRequest: [authOnly]}, createDeckController)
    app.patch("/deck", {onRequest: [authOnly]}, createDeckController)
}