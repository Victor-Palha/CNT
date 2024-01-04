import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { editDeckService_make } from "../../../factory/Deck/edit-deck-service.make";

export async function editDeckController(req: FastifyRequest, res: FastifyReply){
    const editDeckController = z.object({
        deck_id: z.string().uuid(),
        avatar_id: z.string().uuid(),
        deck_name: z.string().min(3).max(32),
        cards: z.array(z.string().uuid())
    })

    const {deck_id, avatar_id, deck_name, cards} = editDeckController.parse(req.body);

    try {
        const editDeckService = editDeckService_make();

        const deck = await editDeckService.execute({
            player_id: req.user.sign.sub,
            deck_id,
            avatar_id,
            deck_name,
            cards,
        })

        return res.status(201).send({
            deck
        });

    } catch (error) {
        return res.status(400).send({
            error
        })
    }
}