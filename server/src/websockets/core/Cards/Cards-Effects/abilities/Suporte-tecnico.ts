import { CardEffect, TargetToEffects } from "../Card-Effect";

export class SuporteTecnico implements CardEffect{
    // Aumente seu ataque e defesa em 3 e puxe uma carta.
    applyEffect({player}: TargetToEffects): void {
        player.avatar.changeAttack = {
            type: "increase",
            value: 3
        }
        player.avatar.changeDefense = {
            type: "increase",
            value: 3
        }
        player.drawCard()
    }
    negateEffect(target: any): void {
        return
    }
    revertEffect({player}: TargetToEffects): void {
        player.avatar.changeAttack = {
            type: "decrease",
            value: 3
        }
        player.avatar.changeDefense = {
            type: "decrease",
            value: 3
        }
    }
}