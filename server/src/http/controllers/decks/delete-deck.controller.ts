import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { deleteDeckService_make } from "../../../factory/Deck/delete-deck-service.make";

export async function DeleteDeckController(req:FastifyRequest, res: FastifyReply){
    const deleteDeckSchema = z.object({
        deck_id: z.string().uuid()
    })

    const { deck_id } = deleteDeckSchema.parse(req.params);

    try{
        const service = deleteDeckService_make()
        await service.execute({
            deck_id,
            player_id: req.user.sign.sub
        })
        res.status(204).send();
    }catch(err){
        res.status(400).send({err});
    }
}