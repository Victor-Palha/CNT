import { CardEffect, TargetToEffects } from "../Card-Effect";

export class BurnOut implements CardEffect{
    // Cura 4 de vida e ROUBA 2 pontos de defesa do oponente e coloca no seu próprio ataque.
    applyEffect({player, enemy}: TargetToEffects): void {
        enemy.avatar.changeDefense = {
            type: "decrease",
            value: 2
        }
        player.avatar.changeAttack = {
            type: "increase",
            value: 2
        }
        player.avatar.hp += 4 
    }

    revertEffect({player, enemy}: TargetToEffects): void {
        enemy.avatar.changeDefense = {
            type: "increase",
            value: 2
        }
        player.avatar.changeAttack = {
            type: "decrease",
            value: 2
        }
    }
}