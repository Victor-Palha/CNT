import { CardEffect, TargetToEffects } from "../Card-Effect";

export class ArquivoCorrompido implements CardEffect{
    public isNegated: boolean = false;

    // Perca 10 pontos de vida; e após isso, seu avatar ganha 12 pontos de ataque.
    applyEffect({player}: TargetToEffects): void {
        if(this.isNegated) return;

        if(player.avatar){
            player.avatar.changeHitPoints = 10;
            player.avatar.changeAttack = {
                type: "increase",
                value: 12
            };
        }
    }

    negateEffect({player}: TargetToEffects): void {
        if(player.avatar){
            player.avatar.changeAttack = {
                type: "decrease",
                value: 12
            }
        }
    }

    revertEffect({player}: TargetToEffects): void {
        if(this.isNegated) return;

        if(player.avatar){
            player.avatar.changeAttack = {
                type: "decrease",
                value: 12
            }
        }
    }
}