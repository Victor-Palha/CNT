import { Prisma, Avatars } from "@prisma/client";
import { AvatarRepository } from "../Avatar.repository";
import { prisma } from "../../../lib/prisma";

export class AvatarPrismaRepository implements AvatarRepository{
    async createAvatar(data: Prisma.AvatarsCreateInput): Promise<Avatars> {
        const avatar = await prisma.avatars.create({
            data
        })

        return avatar;
    }

    async fetchAvatars(search: string): Promise<Avatars[]> {
        const avatars = await prisma.avatars.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })

        return avatars;
    }

    async getAvatarById(id: string): Promise<Avatars | null> {
        const avatar = await prisma.avatars.findUnique({
            where: {
                id_avatar: id
            }
        })

        return avatar;
    }
}