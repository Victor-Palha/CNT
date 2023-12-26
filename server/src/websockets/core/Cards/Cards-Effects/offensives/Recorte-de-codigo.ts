import { Avatar } from "../../../Avatares/Avatar";
import { CardEffect } from "../Card-Effect";

export class RecorteDeCodigo implements CardEffect {
    /*
    equipa no avatar uma lamina que aumenta seu ataque em 2 e diminui a defesa do alvo do ataque em  3 pontos. O efeito de “Recorte de código" dura 2 turnos, só pode  ter uma desta carta ativa,
    */
    applyEffect(target: any): void {
        if(target.myAvatar instanceof Avatar){
            target.myAvatar.changeAttack = {
                value: 2,
                type: "increase"
            }
        }
        if(target.opponentAvatar instanceof Avatar){
            target.opponentAvatar.changeDefense = {
                value: 3,
                type: "decrease"
            }
        }
    }
}