import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Backup implements CardEffect{
    private _previousHP: number = 0;
    //Todo o dano causado a você após a ativação dessa carta será convertido em pontos de vida neste turno.
    applyEffect({player, enemy}: TargetToEffects): void {
        player.selfDamageMultiplierValue = 0;
        enemy.damageMultiplierValue = 0;
        this._previousHP = player.avatar.hp;
    }
    revertEffect({player, enemy}: TargetToEffects): void {
        // Damage by enemy
        const damageByEnemy = enemy.avatar.atk - player.avatar.def;
        if(damageByEnemy > 0) {
            player.avatar.hp += damageByEnemy;}
        // Self damage
        const selfDamage = player.avatar.atk - enemy.avatar.def;
        if(selfDamage < 0){
            player.avatar.hp += Math.abs(selfDamage);
        }
        // Damage by effect
        const damageByEffect = this._previousHP - player.avatar.hp;
        if(damageByEffect > 0){
            player.avatar.hp += damageByEffect;
        }
        enemy.damageMultiplierValue = 1;
        player.selfDamageMultiplierValue = 1;
    }
}