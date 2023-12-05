import { Players, Prisma } from "@prisma/client";
import { PlayerRepository } from "../Player.repository";
import { prisma } from "../../../lib/prisma";

export class PlayerPrismaRepository implements PlayerRepository{
    async createPlayer(data: Prisma.PlayersCreateInput): Promise<Players> {
        const player = await prisma.players.create({
            data
        })

        return player;
    }

    async getPlayerByEmail(email: string): Promise<Players | null> {
        const player = await prisma.players.findUnique({
            where: {
                email
            }
        })

        return player;
    }

    async getPlayerById(id: string): Promise<Players | null> {
        const player = await prisma.players.findUnique({
            where: {
                id_player: id
            }
        })

        return player;
    }
}