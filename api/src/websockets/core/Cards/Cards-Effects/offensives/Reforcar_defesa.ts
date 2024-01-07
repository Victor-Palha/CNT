import { CardEffect, TargetToEffects } from "../Card-Effect";

export class ReforcarDefesa implements CardEffect{
    private _previousAttack: number = 0;
    //Durante este turno seu avatar utiliza o valor da defesa para realizar o seu ataque.
    applyEffect({player}: TargetToEffects): void {
        if(player.avatar){
            this._previousAttack = player.avatar.atk;
            player.avatar.atk = player.avatar.def;
        }
    }

    revertEffect({player}: TargetToEffects): void {
        if(player.avatar){
            player.avatar.atk = this._previousAttack;
        }
    }
}