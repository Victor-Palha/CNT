import { CardEffect, TargetToEffects } from "../Card-Effect";

export class ForcarAcesso implements CardEffect{
    //Escolha uma carta engatilhada no campo do seu oponente e coloque na sua mão. Ao utilizar a carta escolhida como alvo desse efeito, a coloque no fundo do deck do dono original.
    applyEffect({player, enemy, target}: TargetToEffects): void {

            const cardFromField = enemy.field.find(field => field.card && field.field_id === target)
            if(!cardFromField || !cardFromField.card) return;
            const card = cardFromField.card;
            if(card.isActivate || card.effectOccurred) return;
            player.hand.push(card);
            enemy.field.map(field => {
                if(field.card && field.card.id_card === card.id_card){
                    field.card = null;
                    field.empty = true;
                }
            })

    }

    revertEffect({player}: TargetToEffects): void {
        return
    }
}