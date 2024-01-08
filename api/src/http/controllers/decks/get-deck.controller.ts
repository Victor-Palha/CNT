import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getDeckService_make } from "../../../factory/Deck/get-deck-service.make";

export async function getDeckController(req:FastifyRequest, res:FastifyReply){
    const getDeckSchema = z.object({
        deck_id: z.string().uuid()
    })

    try {
        const service = getDeckService_make();
        const {deck_id} = getDeckSchema.parse(req.params);
        const deck = await service.execute({
            deck_id
        })

        return res.status(200).send({
            deck
        })
    } catch (error) {
        return res.status(400).send({
            error
        })
    }
}