import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createDeckService_make } from "../../../factory/Deck/create-deck-service.make";

export async function createDeckController(req:FastifyRequest, res: FastifyReply){
    const createDeckSchema = z.object({
        avatar_id: z.string().uuid(),
        deck_name: z.string().min(3).max(32),
        cards: z.array(z.string().uuid())
    })

    const {avatar_id, deck_name, cards} = createDeckSchema.parse(req.body);

    try {
        const createDeckService = createDeckService_make();

        const deck = await createDeckService.execute({
            player_id: req.user.sub,
            avatar_id,
            deck_name,
            cards
        })

        return res.status(201).send({
            deck
        });

    } catch (error) {
        return res.status(400).send({
            message: "do error later"
        })
    }
}