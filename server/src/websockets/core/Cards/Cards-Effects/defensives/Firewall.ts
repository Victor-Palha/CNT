import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Firewall implements CardEffect{
    //Aumente sua defesa em 5 pontos, se sua defesa for maior que o ataque do avatar atacante, seu oponente sofre o dobro de dano de combate.

    applyEffect({player, enemy}: TargetToEffects): void {
        enemy.selfDamageMultiplierValue = 2;
        player.avatar.changeDefense = {
            value: 5,
            type: "increase"
        }
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        enemy.selfDamageMultiplierValue = 1;
        player.avatar.changeDefense = {
            value: 5,
            type: "decrease"
        }
    }
}