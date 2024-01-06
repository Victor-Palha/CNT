import { Avatar, Cards, Field } from "..";
import { Popups } from "../Popups";

type MyFieldProps = {
    myHand: Cards[];
    isMyTurn: boolean;
    myField: Field;
    myAvatar: Avatar;
    myDeck: number;
    phase: number;
    inChain: boolean;
    myAvatarDamage: number;
    differenceAttack: number;
    differenceDefense: number;
    handleDragStart: (e: any, id: string) => void;
    handleSetCards: (e: any) => void;
    ativateCard(field_id: string): void;
    dialog(card: Cards | Avatar): void;
    activateAbility(field_id: string): void
}

export function MyField({ 
        myHand, 
        isMyTurn,
        myField,
        myAvatar,
        handleDragStart,
        handleSetCards,
        myDeck,
        ativateCard,
        phase,
        dialog,
        activateAbility,
        inChain,
        myAvatarDamage,
        differenceAttack,
        differenceDefense
    }:MyFieldProps
    ) {
    console.log(myField)
    return (
        <div className={`p-4 ${isMyTurn === true && "border-b-2 border-l-2 border-r-2 border-cyan-500"} mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-900`}>
            {/* Avatar Pop-up */}
            <Popups damage={myAvatarDamage} differenceAttack={differenceAttack} differenceDefense={differenceDefense}/>
            {/* Players Avatar */}
            <div>
                {myAvatar && (   
                    <div className="w-full h-[160px] mx-auto m-1 flex justify-center items-center" onClick={()=>dialog(myAvatar)}>
                        <div className="flex pl-14">
                            <img className="w-[90px] h-[130px]" src={myAvatar.image}/>
                            <div className="text-white flex items-center justify-center flex-col ml-4">
                                <span>ATK: {myAvatar.attack}</span>
                                <span>HP: {myAvatar.hit_points}</span>
                                <span>DEF: {myAvatar.defense}</span>
                            </div>
                        </div>
                    </div>
                )}
            {/* Players Grid */}
                <div className="grid grid-cols-3 w-full gap-14 mt-1">
                    {myField && myField.map((card, index) => (
                        <div 
                            key={index} 
                            id={card.field_id} 
                            className={`bg-gray-800 w-full h-[130px] cyber-tile border-2 ${card.card && phase === 2 && !card.card.activate ? "border-2 border-yellow-500" : "border-cyan-500 "}`}
                            onDragOver={(e)=>{e.preventDefault()}}
                            onDrop={(e)=>{handleSetCards(e)}}
                        >
                            {/* Cards without target */}
                            {!inChain && isMyTurn && card.card && !card.card.targetCard.has && !card.card.activate && phase === 2 && (
                                <div className="z-20 absolute bg-yellow w-full justify-center">
                                    <button className="font-bold" onClick={()=>ativateCard(card.field_id)}>
                                        Ativar Carta
                                    </button>
                                </div>
                            )}
                            {/* Cards with target */}
                            {!inChain && isMyTurn && card.card && card.card.targetCard.has && !card.card.activate && phase === 2 && (
                                <div className="z-20 absolute bg-yellow w-full justify-center">
                                    <button className="font-bold" onClick={()=>activateAbility(card.field_id)}>
                                        Ativar Habilidade
                                    </button>
                                </div>
                            )}
                            {card.card &&
                            <>
                            <img 
                                src={card.card.image} 
                                className={`object-fill max-h-[130px] opacity-50 ${card.card.negated && "grayscale cyber-glitch-2"}`}
                                onClick={()=>dialog(card.card as Cards)}
                            />
                            </>}
                        </div>
                    ))}
                </div>
            </div>
            {/* Players Hand */}
            <div className="flex justify-center absolute gap-1 mt-[-3rem] items-center z-10 ">
                {myHand && myHand.length > 0 && myHand.map((card, index) => (
                    <div 
                        key={index} 
                        className="w-[120px] h-[200px] hover:scale-105 cursor-move first:rotate-[-1deg] last:rotate-[1deg]"
                        draggable={true}
                        onDragStart={(e)=>{handleDragStart(e, card._id)}}
                        onClick={()=>dialog(card)}
                        id={card._id}
                    >
                        <img src={card.image}/>
                    </div>
                ))}

            </div>
                <div className="bg-cyan cyber-tile w-[100px] h-[120px] my-[-10rem] absolute left-0 mr-2">
                    <p>{myDeck}</p><br/>
                    <p>DECK</p>
                </div>
        </div>
    )
}