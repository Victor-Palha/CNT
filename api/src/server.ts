import { env } from "../lib/zod";
import { server } from "./app";
import "./websockets"

server.listen({
    port: env.port,
    host: env.host
}).then((address) => {
    console.log(`Server listening on ${address}`)
})