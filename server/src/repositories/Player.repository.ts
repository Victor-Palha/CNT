import { Players, Prisma } from "@prisma/client";

export interface PlayerRepository{
    createPlayer(data: Prisma.PlayersCreateInput): Promise<Players>;
    getPlayerById(id: string): Promise<Players | null>;
    getPlayerByEmail(email: string): Promise<Players | null>;
}