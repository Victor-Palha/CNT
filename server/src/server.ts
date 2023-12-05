import { env } from "../lib/zod";
import { server } from "./app";

server.listen({
    port: env.port,
}).then((address) => {
    console.log(`Server listening on ${address}`)
})