import { CardEffect, TargetToEffects } from "../Card-Effect";

export class CtrlX implements CardEffect{
    // Diminua o ataque do avatar oponente em 3 pontos e aumente sua própria defesa em 3 pontos.
    applyEffect({player, enemy}: TargetToEffects): void {
        enemy.avatar.changeAttack = {
            value: 3,
            type: "decrease"
        }
        player.avatar.changeDefense = {
            value: 3,
            type: "increase"
        }
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        enemy.avatar.changeAttack = {
            value: 3,
            type: "increase"
        }
        player.avatar.changeDefense = {
            value: 3,
            type: "decrease"
        }
    }
}