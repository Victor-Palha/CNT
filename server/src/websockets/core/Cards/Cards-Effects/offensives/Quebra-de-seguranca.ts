import { CardEffect } from "../Card-Effect";

export class QuebraDeSeguranca implements CardEffect {
    /*
    Zera a defesa do avatar inimigo mas corta seu dano causado pela metade pelo resto do turno.
    */
    applyEffect(target: any): void {
        if(target instanceof Avatar){
            target.changeDefense = {
                value: target.atk,
                type: "decrease"
            }
        }
    }
}