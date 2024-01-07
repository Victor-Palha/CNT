import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createCardService_make } from "../../../factory/Cards/create-card-service.make";
// name: string
// description: string
// image: string
// set_card: string
// type_card: $Enums.TypeCard
// copies: number
export async function createCardController(req: FastifyRequest, res: FastifyReply) {
    const createCardSchema = z.object({
        name: z.string().min(3).max(32),
        description: z.string().min(3),
        image: z.string().url(),
        set_card: z.string(),
        type_card: z.enum(["OFENSIVA", "DEFENSIVA", "HABILIDADE", "HABILIDADE_UNICA"]),
    })

    const { name, description, image, set_card, type_card } = createCardSchema.parse(req.body);

    try {
        const createCardService = createCardService_make();

        const card = await createCardService.execute({
            name,
            description,
            image,
            set_card,
            type_card,
        })

        return res.status(201).send({
            card
        });

    } catch (error) {
        return res.status(400).send({
            message: "do error later"
        })
    }
}