import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import {createServer} from "node:http"
import { Server } from "socket.io";
import { env } from "../lib/zod";
import { PlayerRoutes } from "./http/controllers/players/player.routes";
import { DeckRoutes } from "./http/controllers/decks/deck.routes";
import { CardRoutes } from "./http/controllers/cards/card.routes";
import { AvatarRoutes } from "./http/controllers/avatars/avatar.routes";

const serverFactory = (handler: any, opts: any) => {
    return createServer((req, res) => {
        handler(req, res);
    });
}

const server = fastify({serverFactory});

// Socket.io Config
const io = new Server(server.server, {
    cors: {
        origin: "*",
        allowedHeaders: "*",
        methods: ["GET", "POST"]
    }
});

// Server Config
server.register(cors)
server.register(fastifyJwt, {
    secret: env.jwtSecret,
    sign: {
        expiresIn: "7d"
    }
})
// Static Files
server.register(fastifyStatic, {
    root: `${__dirname}/../static`,
    prefix: "/static"
})
/* App Routes */
server.register(PlayerRoutes, {prefix: "/api"})
server.register(DeckRoutes, {prefix: "/api"})
server.register(CardRoutes, {prefix: "/api"})
server.register(AvatarRoutes, {prefix: "/api"})
/* JWT Verify */
server.get("/api/verify", async (req, res) => {
    try {
        await req.jwtVerify();
        res.status(200).send({verified: true});
    } catch (err) {
        res.status(401).send({verified: false});
    }
})

export { server, io }