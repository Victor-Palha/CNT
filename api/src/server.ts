import { env } from "../lib/zod";
import { server } from "./app";
import "./websockets"

server.listen({
    port: env.port,
    host: "25.0.154.188"
}).then((address) => {
    console.log(`Server listening on ${address}`)
})