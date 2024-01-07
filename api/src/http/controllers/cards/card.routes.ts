import { FastifyInstance } from "fastify";
import { authOnly } from "../../middlewares/auth-only";
import { createCardController } from "./create-cards.controller";
import { searchCardsController } from "./search-cards.controller";

export async function CardRoutes(app: FastifyInstance){
    app.post("/card", {onRequest: [authOnly]}, createCardController)
    app.get("/card", {onRequest: [authOnly]}, searchCardsController)
}