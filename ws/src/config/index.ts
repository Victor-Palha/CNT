import "dotenv/config"
import { z } from "zod"

const applicationEnvSchema = z.object({
    port: z.coerce.number().default(3002),
    host: z.string().default("0.0.0.0"),
    api: z.string().default("localhost")
})

const applicationEnvConfig = applicationEnvSchema.safeParse({
    port: process.env.PORT,
    host: process.env.HOST,
    api: process.env.API
})

if(!applicationEnvConfig.success){
    throw new Error(applicationEnvConfig.error.message)
}

export const env = applicationEnvConfig.data;