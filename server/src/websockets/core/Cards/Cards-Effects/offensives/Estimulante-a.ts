import { CardEffect } from "../Card-Effect";

export class Estimulante_A implements CardEffect {
    /*
    Aumenta os pontos de ataque do avatar alvo em 4, se for utilizada mais de uma vez no mesmo turno, o efeito diminui pela metade.
    */
    applyEffect(target: any): void {
        if(target instanceof Avatar){
            target.changeAttack = {
                value: 4,
                type: "increase"
            }
        }
    }
}