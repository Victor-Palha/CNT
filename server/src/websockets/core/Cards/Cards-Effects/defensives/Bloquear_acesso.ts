import { CardEffect, TargetToEffects } from "../Card-Effect";

export class BloquearAcesso implements CardEffect{
    private _baseSelfDamageMultiplier: number = 0;
    private _baseDamageMultiplier: number = 0;

    applyEffect({player, enemy}: TargetToEffects): void {
        this._baseSelfDamageMultiplier = player.selfDamageMultiplierValue;
        this._baseDamageMultiplier = enemy.damageMultiplierValue;


        player.selfDamageMultiplierValue = 0;
        enemy.damageMultiplierValue = 0;
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        player.selfDamageMultiplierValue = this._baseSelfDamageMultiplier;
        enemy.damageMultiplierValue = this._baseDamageMultiplier;
    }
    negateEffect(target: any): void {
        return
    }
}