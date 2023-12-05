import { FastifyInstance } from "fastify";
import { createPlayerController } from "./create-player.controller";
import { authPlayerController } from "./auth-player.controller";

export async function PlayerRoutes(app: FastifyInstance){
    app.post("/signup", createPlayerController)
    app.post("/login", authPlayerController)
}