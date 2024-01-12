import { Avatar, Cards, Field } from "..";
import costa from "../../../assets/Costa.png";
import { Popups } from "../Popups";

type OpponentFieldProps = {
    enemyHand: number;
    isMyTurn: boolean;
    enemyField: Field;
    enemyAvatar: Avatar;
    enemyDeck: number;
    enemyAvatarDamage: number;
    differenceAttack: number;
    differenceDefense: number;
    dialog(card: Cards | Avatar): void;
}

export function OponentField({enemyHand, isMyTurn, enemyField, enemyAvatar, enemyDeck, dialog, enemyAvatarDamage, differenceAttack, differenceDefense}: OpponentFieldProps){
    return (
        <div className={`px-4 ${isMyTurn === false && "animate-pulse"} mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-900`}>
        {/* Enemys Deck */}
            <div className="bg-red cyber-tile w-[100px] h-[120px] absolute right-0 mr-2">
                    <p>{enemyDeck}</p><br/>
                    <p>DECK</p>
                </div>
            {/* Enemys Hand */}
            <div className="flex justify-center mt-[-4rem] items-center absolute z-10 gap-1">
            {Array.from({ length: enemyHand }, (_, index) => (
                <div key={index} className="cyber-tile w-[100px] h-[100px] first:rotate-[2deg] last:rotate-[-2deg]">
                    <img src={costa} alt="" />
                </div>
            ))}
            </div>
            <div className="bg-gray-900">
                {/* Enemys Grid */}
                <div className={`p-4 ${isMyTurn === false && "animate-pulse"}`}>
                    <div className="grid grid-cols-3 gap-14">
                        {enemyField && enemyField.map((card, index) => (
                            <div 
                                key={index} 
                                id={card.field_id} 
                                className="bg-gray-800 w-full h-[130px] cyber-tile border-red-500 border-2"
                            >
                                {!card.empty && !card.card?.activate && <div className="w-full h-full">
                                    <img src={costa} alt="" />
                                </div>}

                                {!card.empty && card.card?.activate && 
                                <img 
                                    src={card.card.image} 
                                    className={`object-fill max-h-[120px] animate-activeCard ${card.card.negated && "grayscale cyber-glitch-2"}`} 
                                    onClick={()=>dialog(card.card as Cards)}
                                />}
                            </div>
                        ))}
                    </div>
                {/* Enemys Avatar */}
                    {enemyAvatar && (
                        <div 
                        className="w-full h-[160px] mx-auto m-4 rotate-180 flex justify-center items-center"
                        onClick={()=>dialog(enemyAvatar)}
                        >
                            <div className="flex pl-20">
                                <img src={enemyAvatar.image} className="w-[90px] h-[130px]"/>
                                <div className="text-white rotate-180 flex flex-col ml-4 items-center justify-center">
                                    <span>ATK: {enemyAvatar.attack}</span>
                                    <span>HP: {enemyAvatar.hit_points}</span>
                                    <span>DEF: {enemyAvatar.defense}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                            {/* Avatar Pop-up */}
                <Popups damage={enemyAvatarDamage} differenceAttack={differenceAttack} differenceDefense={differenceDefense}/>
            </div>
        </div>
    )
}