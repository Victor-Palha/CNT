import { CardEffect, TargetToEffects } from "../Card-Effect";

export class Backdoor implements CardEffect{
    private _baseAtk: number = 0;
    private _baseDef: number = 0;
    // Aumenta seu próprio dano em 100% e diminui sua própria defesa em 50%, por um turno.
    applyEffect({player}: TargetToEffects): void {
        this._baseAtk = player.avatar.atk
        this._baseDef = player.avatar.def
        player.avatar.atk = this._baseAtk * 2
        player.avatar.def = this._baseDef / 2
    }

    revertEffect({player}: TargetToEffects): void {
        player.avatar.atk = this._baseAtk
        player.avatar.def = this._baseDef
    }
}