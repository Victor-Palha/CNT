import { CardEffect, TargetToEffects } from "../Card-Effect";

export class RegraDeFirewall implements CardEffect{
    // Negar uma carta no campo ativa ou engatilhada
    applyEffect({enemy, target}: TargetToEffects): void {
        const findTarget = enemy.field.find(card => card.field_id === target)
        if(findTarget){
            findTarget.card?.cardEffect.negateEffect(false)
        }
    }

    negateEffect(target: any): void {
        return
    }

    revertEffect(target: any): void {
        return
    }
}