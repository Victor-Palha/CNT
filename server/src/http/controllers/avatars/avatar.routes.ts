import { FastifyInstance } from "fastify";
import { authOnly } from "../../middlewares/auth-only";
import { createAvatarController } from "./create-avatar.controller";

export async function AvatarRoutes(app: FastifyInstance){
    app.post("/avatar", {onRequest: [authOnly]}, createAvatarController)
}