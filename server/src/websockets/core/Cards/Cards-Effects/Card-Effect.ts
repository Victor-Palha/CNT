import { Player } from "../../Players/Player";

export interface CardEffect {
    applyEffect(target: TargetToEffects | any): void;
    revertEffect(target: TargetToEffects | any): void;
    negateEffect(target: TargetToEffects | any): void;
}
export type TargetToEffects = {
    player: Player;
    enemy: Player;
}