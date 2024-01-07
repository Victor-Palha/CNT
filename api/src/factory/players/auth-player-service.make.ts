import { PlayerPrismaRepository } from "../../repositories/prisma/Player-prisma.repository";
import { AuthPlayerService } from "../../services/players/auth-player.service";

export function authPlayerService_make() {
    const prismaPlayer = new PlayerPrismaRepository();
    const service = new AuthPlayerService(
        prismaPlayer
    );

    return service;
}