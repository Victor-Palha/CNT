import { Players, Prisma } from "@prisma/client";
import { PlayerRepository } from "../../repositories/Player.repository";
import { hash } from "bcryptjs";


export class CreatePlayerService{
    constructor(private playerRepository: PlayerRepository){}

    async execute(data: Prisma.PlayersCreateInput): Promise<Players>{
        const playerAlreadyExists = await this.playerRepository.getPlayerByEmail(data.email);
        // console.log(playerAlreadyExists);

        if(playerAlreadyExists){
            throw new Error("Player already exists");
        }


        const player = await this.playerRepository.createPlayer({
            email: data.email,
            username: data.username,
            password: await hash(data.password, 8)
        });

        return player;
    }
}