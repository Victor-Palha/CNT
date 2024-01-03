import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Firewall implements CardEffect{
    public isNegated: boolean = false;
    //Aumente sua defesa em 5 pontos, se sua defesa for maior que o ataque do avatar atacante, seu oponente sofre o dobro de dano de combate.

    applyEffect({player, enemy}: TargetToEffects): void {
        if(this.isNegated) return;
        enemy.selfDamageMultiplierValue = 2;
        player.avatar.changeDefense = {
            value: 5,
            type: "increase"
        }
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        if(this.isNegated) return;
        enemy.selfDamageMultiplierValue = 1;
        player.avatar.changeDefense = {
            value: 5,
            type: "decrease"
        }
    }
    negateEffect({player, enemy}: TargetToEffects): void {
        enemy.selfDamageMultiplierValue = 1;
        player.avatar.changeDefense = {
            value: 5,
            type: "decrease"
        }
    }
}