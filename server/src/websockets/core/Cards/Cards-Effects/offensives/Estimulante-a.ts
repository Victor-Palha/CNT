import { Avatar } from "../../../Avatares/Avatar";
import { Player } from "../../../Players/Player";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Estimulante_A implements CardEffect {
    public isNegated: boolean = false;
    private _baseIncreaseAttack: number = 4;
    /*
    Aumenta os pontos de ataque do avatar alvo em 4, se for utilizada mais de uma vez no mesmo turno, o efeito diminui pela metade.
    */
    applyEffect({player}: TargetToEffects): void {
        if(this.isNegated) return;
        if(player.avatar instanceof Avatar){
            this._checkIfCardWasUsedBefore(player);
            player.avatar.changeAttack = {
                value: this._baseIncreaseAttack,
                type: "increase"
            }

        }
    }

    revertEffect({player}: TargetToEffects): void {
        if(this.isNegated) return;
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: this._baseIncreaseAttack,
                type: "decrease"
            }
        }
    }

    negateEffect({player}: TargetToEffects): void {
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: this._baseIncreaseAttack,
                type: "decrease"
            }
        }
    }

    private _checkIfCardWasUsedBefore(player: Player) {
        const playerField = player.field;
        let count = 0;
        playerField.forEach(field => {
            if(field.card?.id_card === "4875dcd2-d13d-4425-9c05-1472bdb9466c" && field.card.isActivate){
                count++;
            }
        })
        if(count >= 2){
            this._baseIncreaseAttack /= 2;
        }
    }
}