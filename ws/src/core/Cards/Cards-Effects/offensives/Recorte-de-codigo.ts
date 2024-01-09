import { Avatar } from "../../../Avatares/Avatar";
import { CardEffect, TargetToEffects } from "../Card-Effect";

export class RecorteDeCodigo implements CardEffect {
    /*
    equipa no avatar uma lamina que aumenta seu ataque em 2 e diminui a defesa do alvo do ataque em  3 pontos. O efeito de “Recorte de código" dura 2 turnos.
    */
    applyEffect({player, enemy}: TargetToEffects): void {
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: 2,
                type: "increase"
            }
        }
        if(enemy.avatar instanceof Avatar){
            enemy.avatar.changeDefense = {
                value: 3,
                type: "decrease"
            }
        }
    }

    revertEffect({player, enemy}: TargetToEffects): void {
        if(player.avatar instanceof Avatar){
            player.avatar.changeAttack = {
                value: 2,
                type: "decrease"
            }
        }
        if(enemy.avatar instanceof Avatar){
            enemy.avatar.changeDefense = {
                value: 3,
                type: "increase"
            }
        }
    }
}