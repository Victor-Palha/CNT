import { CardEffect, TargetToEffects } from "../Card-Effect";

export class BloquearAcesso implements CardEffect{
    // "Pelo resto do turno, o dono desta carta não pode tomar dano de combate."
    private _baseSelfDamageMultiplier: number = 1;
    private _baseDamageMultiplier: number = 1;

    applyEffect({player, enemy}: TargetToEffects): void {

        player.selfDamageMultiplierValue = 0;
        enemy.damageMultiplierValue = 0;
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        player.selfDamageMultiplierValue = this._baseSelfDamageMultiplier;
        enemy.damageMultiplierValue = this._baseDamageMultiplier;
    }
}