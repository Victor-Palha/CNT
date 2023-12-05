import { Avatars, Prisma } from "@prisma/client";

export interface AvatarRepository{
    createAvatar(data: Prisma.AvatarsCreateInput): Promise<Avatars>;
    getAvatarById(id: string): Promise<Avatars | null>;
    fetchAvatars(search: string): Promise<Avatars[]>;
}