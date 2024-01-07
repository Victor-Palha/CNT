import { CardEffect, TargetToEffects } from "../Card-Effect";

export class BancoDeDados implements CardEffect{
    //Compre uma carta, no próximo turno o máximo de cartas na sua mão se torna 5 cartas.
    applyEffect({player}: TargetToEffects): void {
        player.drawCard();
        player.max_cards_hand = 5;
    }

    revertEffect({player}: TargetToEffects): void {
        return
    }
}