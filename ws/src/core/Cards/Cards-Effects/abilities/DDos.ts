import { CardEffect, TargetToEffects } from "../Card-Effect";

export class DDos implements CardEffect{
    //Retire do jogo até 10 cartas do topo do seu deck, causando dano ao seu oponente igual ao número de cartas retiradas do jogo, após resolver o efeito, retire essa carta do jogo.
    applyEffect({player, enemy, target}: TargetToEffects): void {
        if(typeof target !== "number") return;
        if(target > 10 || target < 0) return;
        if(target > player.deck.length){
            player.avatar.hp = -100;
            player.damageMultiplierValue = 0;
            player.selfDamageMultiplierValue = 0;
            enemy.avatar.hp = 90;
            enemy.damageMultiplierValue = 0;
            enemy.selfDamageMultiplierValue = 0;
        }
        for(let i = 0; i < target; i++){
            player.deck.pop();
            enemy.avatar.hp -= 1;
        }
    }

    revertEffect({player}: TargetToEffects): void {
        return
    }
}