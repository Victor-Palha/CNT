import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createAvatarService_make } from "../../../factory/Avatars/create-avatar-service.make";
// id_avatar?: string
// name: string
// description: string
// image: string
// set_avatar: string
// unique_ability: string
// passive_ability?: string | null
// hit_points: number
// attack: number
// defense: number
// type_avatar: $Enums.TypeAvatar
// created_at?: Date | string
// updated_at?: Date | string
// Deck?: DeckCreateNestedManyWithoutAvatarInput
export async function createAvatarController(req: FastifyRequest, res: FastifyReply) {
    const createAvatarSchema = z.object({
        name: z.string().min(3).max(32),
        description: z.string().min(3),
        image: z.string().url(),
        set_avatar: z.string(),
        unique_ability: z.string().uuid(),
        passive_ability: z.string().uuid().optional(),
        hit_points: z.number().int().positive(),
        attack: z.number().int().positive(),
        defense: z.number().int().positive(),
        type_avatar: z.enum(["OFENSIVO", "DEFENSIVO", "MODERADO"]),
    })

    const { name, description, image, set_avatar, type_avatar, attack, defense, hit_points, unique_ability, passive_ability} = createAvatarSchema.parse(req.body);

    try {
        const createAvatarService = createAvatarService_make();

        const avatar = await createAvatarService.execute({
            name,
            description,
            image,
            set_avatar,
            type_avatar,
            attack,
            defense,
            hit_points,
            unique_ability,
            passive_ability
        })

        return res.status(201).send({
            avatar
        });

    } catch (error) {
        return res.status(400).send({
            message: "do error later"
        })
    }
}