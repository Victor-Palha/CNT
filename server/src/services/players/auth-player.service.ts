import { compare } from "bcryptjs";
import { PlayerRepository } from "../../repositories/Player.repository";

interface AuthPlayerRequest {
    email: string;
    password: string;
}
export class AuthPlayerService{
    constructor(
        private playerRepository: PlayerRepository,
    ){}

    async execute({email, password}: AuthPlayerRequest){
        const player = await this.playerRepository.getPlayerByEmail(email);

        if(!player){
            throw new Error("Player not found");
        }

        const passwordMatch = await compare(password, player.password);

        if(!passwordMatch){
            throw new Error("Incorrect Credentials");
        }

        return player;
    }
}