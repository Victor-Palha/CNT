import { useState } from "react";
import { Field } from "..";
import costa from "../../../assets/Costa.png";

type TargetProps = {
    type: "DECK" | "FIELD" | "NUMBER";
    enemyField: Field
    ability: string
    activateCard: (field_id: string, target: string | number)=>void
}
export function Target({type, enemyField, ability, activateCard}:TargetProps){
    const [cardTarget, setCardTarget] = useState("")
    const [numberTarget, setNumberTarget] = useState(0)
    return (
        <div className="cyber-tile mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-950 p-4 w-fit z-50 absolute mt-[-12rem]">
            {type === "FIELD" && (
                <>
                <div className={`grid grid-cols-${enemyField.length} gap-10 mt-10`}>
                    {enemyField.map((field, index)=> (
                        <div 
                            key={index} 
                            className="h-[170px] cyber-tile bg-gray-800" 
                            
                        >
                            {field.card && field.card.activate && !field.card.cartEffectOccurred && (
                                <img onClick={()=>setCardTarget(field.field_id)} src={field.card.image} className={`object-fill max-h-[170px] ${cardTarget === field.field_id && "border-2 border-yellow-400"}`}/>
                            )}
                            {field.card && !field.card.activate && (
                                <img src={costa} onClick={()=>setCardTarget(field.field_id)} className={`bg-red w-full h-full ${cardTarget === field.field_id && "border-2 border-yellow-400"}`}></img>
                            )}
                            {field.card && field.card.activate && field.card.cartEffectOccurred && (
                                <img src={field.card.image} className={`object-fill max-h-[170px] opacity-50 bg-red-cyber`} onClick={()=>setCardTarget("")}/>
                            )}
                        </div>
                    ))}
                </div>
                    {cardTarget !== "" && (
                        <button className="cyber-button bg-yellow fg-white vt-bot mt-2" onClick={()=>activateCard(ability, cardTarget)}>
                            <h1 className="text-black font-bold">Selecionar</h1>
                            <span className="glitchtext"></span>
                        </button>
                    )}
                </>
            )}
            {type === "NUMBER" && (
                <>
                <div className="grid grid-cols-5 gap-10 mt-10">
                    <div className="cyber-tile">
                        <button className="bg-yellow w-full justify-center" onClick={()=>setNumberTarget(2)}>2</button>
                    </div>
                    <div className="cyber-tile">
                        <button className="bg-yellow w-full justify-center" onClick={()=>setNumberTarget(4)}>4</button>
                    </div>
                    <div className="cyber-tile">
                        <button className="bg-yellow w-full justify-center" onClick={()=>setNumberTarget(6)}>6</button>
                    </div>
                    <div className="cyber-tile">
                        <button className="bg-yellow w-full justify-center" onClick={()=>setNumberTarget(8)}>8</button>
                    </div>
                    <div className="cyber-tile">
                        <button className="bg-yellow w-full justify-center" onClick={()=>setNumberTarget(10)}>10</button>
                    </div>
                </div>
                {numberTarget !== 0 && (
                    <button className="cyber-button bg-yellow fg-white vt-bot mt-2" onClick={()=>activateCard(ability, numberTarget)}>
                        <h1 className="text-black font-bold">Selecionar</h1>
                        <span className="glitchtext"></span>
                    </button>
                )}
                </>
            )}
        </div>
    )
}