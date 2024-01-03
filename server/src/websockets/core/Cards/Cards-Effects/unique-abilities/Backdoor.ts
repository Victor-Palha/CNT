import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Backdoor implements CardEffect{
    // Aumenta seu próprio dano em 100% e diminui sua própria defesa em 50%, por um turno.
    applyEffect({player}: TargetToEffects): void {
        player.avatar.atk *= 2
        player.avatar.def /= 2
    }

    negateEffect(target: any): void {
        return
    }

    revertEffect({player}: TargetToEffects): void {
        player.avatar.atk /= 2
        player.avatar.def *= 2
    }
}