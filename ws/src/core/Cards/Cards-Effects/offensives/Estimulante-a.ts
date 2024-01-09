import { Avatar } from "../../../Avatares/Avatar";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Estimulante_A implements CardEffect {
    private _baseIncreaseAttack: number = 5;
    /*
    Aumenta os pontos de ataque do avatar alvo em 5.
    */
    applyEffect({player}: TargetToEffects): void {
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: this._baseIncreaseAttack,
                type: "increase"
            }

        }
    }

    revertEffect({player}: TargetToEffects): void {
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: this._baseIncreaseAttack,
                type: "decrease"
            }
        }
    }
}