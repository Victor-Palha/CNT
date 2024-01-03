import { CardEffect, TargetToEffects } from "../Card-Effect";

export class BancoDeDados implements CardEffect{
    public isNegated: boolean = false;
    //Compre uma carta, no próximo turno o máximo de cartas na sua mão se torna 5 cartas.
    applyEffect({player}: TargetToEffects): void {
        if(this.isNegated) return;
        player.drawCard();
        player.max_cards_hand = 5;
    }

    negateEffect({player}: TargetToEffects): void {
        player.max_cards_hand = 4;
    }

    revertEffect({player}: TargetToEffects): void {
        return
    }
}