import "dotenv/config"
import { z } from "zod";

const applicationSchema = z.object({
    port: z.coerce.number().default(3000),
    jwtSecret: z.string(),
    databaseUrl: z.string().url(),
})

const applicationConfig = applicationSchema.safeParse({
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL
})

if(!applicationConfig.success){
    throw new Error(applicationConfig.error.message)
}

export const env = applicationConfig.data;