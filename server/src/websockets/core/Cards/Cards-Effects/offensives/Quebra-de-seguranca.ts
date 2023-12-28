import { Avatar } from "../../../Avatares/Avatar";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class QuebraDeSeguranca implements CardEffect {
    private _previousDefense: number = 0;
    /*
    Zera a defesa do avatar inimigo mas corta seu dano causado pela metade pelo resto do turno.
    */
    applyEffect({player, enemy}: TargetToEffects): void {
        if(enemy.avatar instanceof Avatar){
            this._previousDefense = enemy.avatar.def;
            player.damageMultiplierValue = 0.5;
            enemy.avatar.changeDefense = {
                value: enemy.avatar.def,
                type: "decrease"
            }
        }
    }

    revertEffect({player, enemy}: TargetToEffects): void {
        if(enemy.avatar instanceof Avatar){
            player.damageMultiplierValue = 1;
            enemy.avatar.changeDefense = {
                value: this._previousDefense,
                type: "increase"
            }
        }
    }

    negateEffect(target: any): void {
        return
    }
}