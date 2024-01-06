import { LuShield, LuShieldOff } from "react-icons/lu";
import { TbSword, TbSwordOff } from "react-icons/tb";
import { GiHealthIncrease, GiHealthDecrease } from "react-icons/gi";
type PopupsProps = {
    damage: number;
    differenceAttack: number;
    differenceDefense: number;
}
export function Popups({damage, differenceAttack, differenceDefense}: PopupsProps){
    return (
        <div className="flex justify-center items-center">
            {damage > 0 && (
                <div className="flex items-center gap-4 text-center bg-red-cyber text-white p-2 rounded-md animate-popup">
                    <p>-{damage} </p>
                    <GiHealthDecrease/>
                </div>
            )}
            {damage < 0 && (
                <div className="flex items-center gap-4 text-center bg-green-500 text-white p-2 rounded-md animate-popup">
                    <p>+{Math.abs(damage)}</p>
                    <GiHealthIncrease/>
                </div>
            )}
            {differenceAttack > 0 && (
                <div className="flex items-center gap-4 text-center bg-red-950 text-white p-2 rounded-md animate-popup">
                    <p>-{differenceAttack} </p>
                    <TbSwordOff/>
                </div>
            )}
            {differenceAttack < 0 && (
                <div className="flex items-center gap-4 text-center bg-red-500 text-white p-2 rounded-md animate-popup">
                    <p>+{Math.abs(differenceAttack)} </p>
                    <TbSword/>
                </div>
            )}
            {differenceDefense > 0 && (
                <div className="flex items-center gap-4 text-center bg-blue-950 text-white p-2 rounded-md animate-popup">
                    <p>-{differenceDefense} </p>
                    <LuShieldOff/>
                </div>
            )}
            {differenceDefense < 0 && (
                <div className="flex items-center gap-4 text-center bg-blue-500 text-white p-2 rounded-md animate-popup">
                    <p>+{Math.abs(differenceDefense)} </p>
                    <LuShield/>
                </div>
            )}
        </div>
    )
}