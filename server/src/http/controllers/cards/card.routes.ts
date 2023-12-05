import { FastifyInstance } from "fastify";
import { authOnly } from "../../middlewares/auth-only";
import { createCardController } from "./create-cards.controller";

export async function CardRoutes(app: FastifyInstance){
    app.post("/card", {onRequest: [authOnly]}, createCardController)
}