import { CardEffect, TargetToEffects } from "../Card-Effect";

export class ArquivoCorrompido implements CardEffect{
    // Perca 10 pontos de vida; e após isso, seu avatar ganha 12 pontos de ataque.
    applyEffect({player}: TargetToEffects): void {

        if(player.avatar){
            player.avatar.changeHitPoints = 10;
            player.avatar.changeAttack = {
                type: "increase",
                value: 12
            };
        }
    }

    revertEffect({player}: TargetToEffects): void {

        if(player.avatar){
            player.avatar.changeAttack = {
                type: "decrease",
                value: 12
            }
        }
    }
}