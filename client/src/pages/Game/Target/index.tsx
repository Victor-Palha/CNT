import { useState } from "react";
import { Field } from "..";

type TargetProps = {
    type: "DECK" | "FIELD";
    enemyField: Field
    ability: string
    activateCard: (field_id: string, target: string)=>void
}
export function Target({type, enemyField, ability, activateCard}:TargetProps){
    const [cardTarget, setCardTarget] = useState("")
    return (
        <div className="cyber-tile mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-950 p-4 w-fit z-50 absolute mt-[-12rem]">
            {type === "FIELD" ? (
                <div className={`grid grid-cols-${enemyField.length} gap-10 mt-10`}>
                    {enemyField.map((field, index)=> (
                        <div 
                            key={index} 
                            className="h-[170px] cyber-tile bg-gray-800 border-2" 
                            onClick={()=>setCardTarget(field.field_id)}
                        >
                            <img src={field.card?.image} className={`object-fill max-h-[170px] ${cardTarget === field.field_id && "border-2 border-yellow-400"}`}/>
                        </div>
                    ))}
                    {cardTarget !== "" && (
                        <button className="cyber-button bg-yellow fg-white vt-bot mt-2" onClick={()=>activateCard(ability, cardTarget)}>
                            <h1 className="text-black font-bold">Selecionar</h1>
                            <span className="glitchtext"></span>
                        </button>
                    )}
                </div>
            ) : (
                <div>

                </div>
            )}
        </div>
    )
}