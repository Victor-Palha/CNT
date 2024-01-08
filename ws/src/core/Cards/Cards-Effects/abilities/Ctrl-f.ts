import { Card } from "../../Card";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class CtrlF implements CardEffect{
    private targetFromDeck: Card | null = null
    // O efeito desta carta se torna o mesmo efeito de uma carta defensiva, habilidade ou habilidade única do seu baralho, esta carta só pode ser usada uma vez por turno.
    applyEffect({player, enemy, target}: TargetToEffects): void {
        //find target
        const tgt = player.deck.find(card => card.id_card === target)
        if(tgt){
            const card = new Card({
                id_card: tgt.id_card,
                name: tgt.name_card,
                description: tgt.description_card,
                image: tgt.image_card,
                set_card: tgt.set,
                type_card: tgt.type,
                list: tgt.list_card,
                originalOwner: tgt.owner,
                activate: false
            })
            this.targetFromDeck = card

            card.cardEffect.applyEffect({player, enemy, target})
        }
    }

    revertEffect({player, enemy, target}: TargetToEffects): void {
        if(this.targetFromDeck){
            this.targetFromDeck.cardEffect.revertEffect({player, enemy, target})
        }
    }
}