import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Formatar implements CardEffect{
    // Perca 7 de vida, após isso, negue as cartas no campo do seu oponente.
    applyEffect({player, enemy}: TargetToEffects): void {
        player.avatar.hp -= 7
        enemy.field.forEach((card)=>{
            card.card?.cardEffect.negateEffect(false)
        })
    }
    negateEffect(target: any): void {
        return
    }
    revertEffect(target: any): void {
        return
    }
}