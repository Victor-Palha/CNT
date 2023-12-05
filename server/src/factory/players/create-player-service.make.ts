import { PlayerPrismaRepository } from "../../repositories/prisma/Player-prisma.repository";
import { CreatePlayerService } from "../../services/players/create-player.service";

export function createPlayerService_make() {
    const prismaPlayer = new PlayerPrismaRepository();
    const service = new CreatePlayerService(
        prismaPlayer
    );

    return service;
}