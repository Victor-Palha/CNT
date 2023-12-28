import { Avatar } from "../../../Avatares/Avatar";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class QuebraDeSeguranca implements CardEffect {
    /*
    Zera a defesa do avatar inimigo mas corta seu dano causado pela metade pelo resto do turno.
    */
    applyEffect({enemy}: TargetToEffects): void {
        if(enemy.avatar instanceof Avatar){
            enemy.avatar.changeDefense = {
                value: enemy.avatar.atk,
                type: "decrease"
            }
        }
    }

    revertEffect({enemy}: TargetToEffects): void {
        if(enemy.avatar instanceof Avatar){
            enemy.avatar.changeDefense = {
                value: enemy.avatar.atk,
                type: "increase"
            }
        }
    }

    negateEffect(target: any): void {
        return
    }
}