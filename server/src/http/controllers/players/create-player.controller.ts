import { FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod';
import { createPlayerService_make } from "../../../factory/players/create-player-service.make";
export async function createPlayerController(req: FastifyRequest, res: FastifyReply){
    const createPlayerSchema = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(6).max(32)
    })

    const {email, username, password} = createPlayerSchema.parse(req.body);

    try {
        const service = createPlayerService_make();

        const player = await service.execute({
            email,
            username,
            password
        })

        return res.status(201).send(player);
    } catch (error) {
        return res.status(400).send({
            message: "do error later"
        })
    }
}