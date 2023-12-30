import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Backup implements CardEffect{
    private _previousHP: number = 0;
    //Todo o dano causado a você após a ativação dessa carta será convertido em pontos de vida neste turno.
    applyEffect({player}: TargetToEffects): void {
        this._previousHP = player.avatar.hp;
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        const damage = player.avatar.hp - this._previousHP;
        player.avatar.hp = player.avatar.hp + (damage * 2);
    }
    negateEffect(target: any): void {
        return
    }
}