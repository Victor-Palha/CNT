import "dotenv/config"
import { Rooms } from "./controllers/Rooms"
import {io, server} from "./app"
import { Game } from "./controllers/Game"
import { env } from "./config"
// import { eventsFactory } from "./controllers/Rooms/factory/events.factory"
const PORT = env.port
const HOST = env.host

server.listen({port: PORT, host: HOST}, () => {
    console.log(`Web Socket Server listening on port ${PORT}`)
    const room = new Rooms(io)
    new Game(io, room)
})
