import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Metasploit implements CardEffect{
    // Diminui em 4 o ataque do oponente e aumenta em 4 a defesa de seu avatar
    applyEffect({player, enemy}: TargetToEffects): void {
        enemy.avatar.changeAttack = {
            type: "decrease",
            value: 4
        }
        player.avatar.changeDefense = {
            type: "increase",
            value: 4
        }
    }

    negateEffect(target: any): void {
        return
    }

    revertEffect({player, enemy}: TargetToEffects): void {
        enemy.avatar.changeAttack = {
            type: "increase",
            value: 4
        }
        player.avatar.changeDefense = {
            type: "decrease",
            value: 4
        }
    }
}