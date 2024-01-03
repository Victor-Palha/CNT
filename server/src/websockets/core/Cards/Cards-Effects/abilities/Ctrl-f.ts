import { Card } from "../../Card";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class CtrlF implements CardEffect{
    private targetFromDeck: Card | null = null
    // O efeito desta carta se torna o mesmo efeito de uma carta defensiva, habilidade ou habilidade única do seu baralho, esta carta só pode ser usada uma vez por turno.
    applyEffect({player, enemy, target}: TargetToEffects): void {
        //find target
        const tgt = player.deck.find(card => card.id_card === target)
        if(tgt){
            this.targetFromDeck = tgt
            
        }
    }

    negateEffect(): void {
        return
    }

    revertEffect(): void {
        return
    }
}