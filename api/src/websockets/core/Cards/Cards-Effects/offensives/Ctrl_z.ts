import { CardEffect, TargetToEffects } from "../Card-Effect";

export class CtrlZ implements CardEffect {
    private _previousHPEnemy: number = 0;
    // Aumente o ataque em 2 e cure metade do dano que você causar no oponente durante o 'Clímax'.
    applyEffect({player, enemy}: TargetToEffects): void {

        this._previousHPEnemy = enemy.avatar.hp;
        if(player.avatar){
            player.avatar.changeAttack = {
                type: "increase",
                value: 2
            };
        }
    }

    revertEffect({player, enemy}: TargetToEffects): void {
        
        const damage = this._previousHPEnemy - enemy.avatar.hp;
        if(damage > 0){
            player.avatar.hp += Math.ceil(damage/2);
        }
        if(player.avatar){
            player.avatar.changeAttack = {
                type: "decrease",
                value: 2
            }
        }
    }
}