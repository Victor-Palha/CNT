import { CardEffect, TargetToEffects } from "../Card-Effect";

export class ProtegerSistema implements CardEffect{
    // Cure 4 de vida e durante esse turno sua defesa aumenta em 5.
    applyEffect({player}: TargetToEffects): void {
        player.avatar.changeDefense = {
            value: 5,
            type: "increase"
        }
        player.avatar.hp += 4;
    }
    revertEffect({player}: TargetToEffects): void {
        player.avatar.changeDefense = {
            value: 5,
            type: "decrease"
        }
    }
    negateEffect(target: any): void {
        return
    }
}