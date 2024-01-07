import { FastifyReply, FastifyRequest } from "fastify";
import { searchCardsService_make } from "../../../factory/Cards/search-cards-service.make";

export async function searchCardsController(req: FastifyRequest, res: FastifyReply){
    const { search } = req.query as { search: string };
    
    try {
        const service = searchCardsService_make();

        const {avatars, cards} = await service.execute(search);
        // console.log("avatars", avatars);

        return res.status(200).send({cards, avatars});
    } catch (error) {
        return res.status(400).send({ message: "do later" });
    }
}