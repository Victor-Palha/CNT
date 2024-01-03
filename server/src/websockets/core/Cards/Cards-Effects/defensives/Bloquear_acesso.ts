import { CardEffect, TargetToEffects } from "../Card-Effect";

export class BloquearAcesso implements CardEffect{
    public isNegated: boolean = false;
    private _baseSelfDamageMultiplier: number = 0;
    private _baseDamageMultiplier: number = 0;

    applyEffect({player, enemy}: TargetToEffects): void {
        if(this.isNegated) return;
        this._baseSelfDamageMultiplier = player.selfDamageMultiplierValue;
        this._baseDamageMultiplier = enemy.damageMultiplierValue;


        player.selfDamageMultiplierValue = 0;
        enemy.damageMultiplierValue = 0;
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        if(this.isNegated) return;
        player.selfDamageMultiplierValue = this._baseSelfDamageMultiplier;
        enemy.damageMultiplierValue = this._baseDamageMultiplier;
    }
    negateEffect({player, enemy}: TargetToEffects): void {
        player.selfDamageMultiplierValue = this._baseSelfDamageMultiplier;
        enemy.damageMultiplierValue = this._baseDamageMultiplier;
    }
}