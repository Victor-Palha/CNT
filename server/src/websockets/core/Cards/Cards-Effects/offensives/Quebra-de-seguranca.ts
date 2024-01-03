import { Avatar } from "../../../Avatares/Avatar";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class QuebraDeSeguranca implements CardEffect {
    public isNegated: boolean = false;
    private _previousDefense: number = 0;
    /*
    Zera a defesa do avatar inimigo mas corta seu dano causado pela metade pelo resto do turno.
    */
    applyEffect({player, enemy}: TargetToEffects): void {
        if(this.isNegated) return;
        if(enemy.avatar instanceof Avatar){
            this._previousDefense = enemy.avatar.def;
            player.damageMultiplierValue = 0.5;
            enemy.avatar.changeDefense = {
                value: this._previousDefense,
                type: "decrease"
            }
        }
    }

    revertEffect({player, enemy}: TargetToEffects): void {
        if(this.isNegated) return;
        if(enemy.avatar instanceof Avatar){
            player.damageMultiplierValue = 1;
            enemy.avatar.changeDefense = {
                value: this._previousDefense,
                type: "increase"
            }
        }
    }

    negateEffect({player, enemy}: TargetToEffects): void {
        if(enemy.avatar instanceof Avatar){
            player.damageMultiplierValue = 1;
            enemy.avatar.changeDefense = {
                value: this._previousDefense,
                type: "increase"
            }
        }
    }
}