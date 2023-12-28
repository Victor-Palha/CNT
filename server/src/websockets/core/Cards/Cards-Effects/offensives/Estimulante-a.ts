import { Avatar } from "../../../Avatares/Avatar";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Estimulante_A implements CardEffect {
    /*
    Aumenta os pontos de ataque do avatar alvo em 4, se for utilizada mais de uma vez no mesmo turno, o efeito diminui pela metade.
    */
    applyEffect({player}: TargetToEffects): void {
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: 4,
                type: "increase"
            }
        }
    }

    revertEffect({player}: TargetToEffects): void {
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: 4,
                type: "decrease"
            }
        }
    }

    negateEffect(target: any): void {
        return
    }
}