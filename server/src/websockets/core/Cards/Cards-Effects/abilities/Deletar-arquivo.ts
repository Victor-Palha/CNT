import { CardEffect, TargetToEffects } from "../Card-Effect";

export class DeletarArquivo implements CardEffect{
    public isNegated: boolean = false;
    // Ao ativar essa carta, escolha uma carta ativa ou uma engatilha, se o alvo for ativa, volte a carta a mão do dono e negue seu efeito, se o alvo for engatilhada, ponha essa carta no fundo do deck.
    applyEffect({player, enemy, target}: TargetToEffects): void {
        if(this.isNegated) return;
        const tgt = enemy.field.find(card => card.field_id === target)
        if(tgt && tgt.card){
            if(tgt.card.isActivate){
                tgt.card.negatedCard = true
                tgt.card.cardEffect.isNegated = true
                tgt.card.cardEffect.negateEffect({player, enemy})
                enemy.hand.push(tgt.card)
                tgt.card = null
                tgt.empty = true
            }
            else{
                enemy.deck.unshift(tgt.card)
                tgt.card = null
                tgt.empty = true
            }
        }
    }

    negateEffect(target: any): void {
        return
    }

    revertEffect(target: any): void {
        return
    }
}