import { Player } from "../../../Players/Player";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class EstimulanteB implements CardEffect {
    private _baseIncreaseDefense: number = 4;
    //Aumenta os pontos de defesa do seu avatar em 4, se for utilizada mais de uma vez no mesmo turno, o efeito diminui pela metade.
    applyEffect({player}: TargetToEffects): void {
        this._checkIfCardWasUsedBefore(player);
        player.avatar.changeDefense = {
            value: this._baseIncreaseDefense,
            type: "increase"
        }
    }
    revertEffect({player}: TargetToEffects): void {
        player.avatar.changeDefense = {
            value: this._baseIncreaseDefense,
            type: "decrease"
        }
    }

    private _checkIfCardWasUsedBefore(player: Player) {
        const playerField = player.field;
        let count = 0;
        playerField.forEach(field => {
            if(field.card?.id_card === "98277fc4-6ad8-4807-ac2c-069725ee81b6" && field.card.isActivate){
                count++;
            }
        })
        if(count >= 2){
            this._baseIncreaseDefense /= 2;
        }
    }
}

/*
    applyEffect({player, enemy}: TargetToEffects): void {

    }
    revertEffect({player, enemy}: TargetToEffects): void {

    }
    negateEffect(target: any): void {
        return
    }
}

*/