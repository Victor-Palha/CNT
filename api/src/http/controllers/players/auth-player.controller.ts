import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { authPlayerService_make } from "../../../factory/players/auth-player-service.make";

export async function authPlayerController(req:FastifyRequest, res: FastifyReply){
    const authPlayerShema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(32)
    })
    
    const {email, password} = authPlayerShema.parse(req.body);
    try {
        const service = authPlayerService_make();

        const player = await service.execute({
            email,
            password
        })

        const token = await res.jwtSign({
            sign: {
                sub: player.id_player
            }
        })


        
        return res.status(201).send({
            token,
            player: {
                id_player: player.id_player,
                username: player.username,
                email: player.email,
            }
        });
    } catch (error) {
        return res.status(400).send({
            message: "do error later"
        })
    }
}