import { CardEffect, TargetToEffects } from "../Card-Effect";

export class DeletarArquivo implements CardEffect{
    // Ao ativar essa carta, escolha uma carta ativa ou uma engatilha, se o alvo for ativa, volte a carta a mão do dono e negue seu efeito, se o alvo for engatilhada, ponha essa carta no fundo do deck.
    applyEffect({enemy, target}: TargetToEffects): void {
        const tgt = enemy.field.find(card => card.field_id === target)
        if(tgt && tgt.card){
            if(tgt.card.isActivate && !tgt.card.effectOccurred){
                tgt.card.negatedCard = true
                enemy.hand.push(tgt.card)
                tgt.card = null
                tgt.empty = true
            }
            else if(tgt.card.isActivate && tgt.card.effectOccurred){
                return
            }else{
                enemy.deck.unshift(tgt.card)
                tgt.card = null
                tgt.empty = true
            }
        }
    }

    revertEffect(target: any): void {
        return
    }
}