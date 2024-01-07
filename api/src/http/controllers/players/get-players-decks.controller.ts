import { FastifyReply, FastifyRequest } from "fastify";
import { GetPlayersDecksService_make } from "../../../factory/players/get-players-deck-service.make";

export async function getPlayersDecksController(req: FastifyRequest, res:FastifyReply){
    const service = GetPlayersDecksService_make()

    try {
        const user_id = req.user.sign.sub
        const {decks} = await service.execute(user_id)

        return {decks}
    } catch (error) {
        return res.status(500).send(error)
    }
}