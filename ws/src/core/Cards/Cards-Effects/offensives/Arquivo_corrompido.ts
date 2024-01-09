import { CardEffect, TargetToEffects } from "../Card-Effect";

export class ArquivoCorrompido implements CardEffect{
    // Perca 7 pontos de vida; e após isso, seu avatar ganha 10 pontos de ataque.
    applyEffect({player}: TargetToEffects): void {
        if(player.avatar){
            player.avatar.hp -= 10;
            player.avatar.changeAttack = {
                type: "increase",
                value: 10
            };
        }
    }

    revertEffect({player}: TargetToEffects): void {
        if(player.avatar){
            player.avatar.changeAttack = {
                type: "decrease",
                value: 10
            }
        }
    }
}