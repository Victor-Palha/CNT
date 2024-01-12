import { useState } from "react";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { Field } from "..";

type ReactionProps = {
    responseOptions: Field;
    cancel: () => void;
    response(field_id: string): void;
    responseWithAbility(field_id: string): void;
}
export function Reaction({responseOptions, cancel, response, responseWithAbility}: ReactionProps){
    const [mini, setMini] = useState(false)
    return (
        <div className={!mini ? `cyber-tile mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-950 p-4 w-fit z-40 absolute mt-[-12rem]` : "cyber-tile max-h-[95px] overflow-hidden z-40 absolute  mx-[10%] md:mx-[25%] lg:mx-[35%] w-fit"}>
            <div className="cyber-att-2 w-full cyber-glitch-4 flex justify-between">
                <p className="text-white">Corrente de efeitos</p>
                <button onClick={()=>setMini(!mini)}>{!mini ? <FiMinimize2/> : <FiMaximize2/>}</button>
            </div>

            <div className={`grid grid-cols-${responseOptions.length} gap-10 mt-10`}>
                {responseOptions.map((field, index) => (
                    <div key={index} className="h-[170px] cyber-tile bg-gray-800 border-2 ">
                        {!field.card?.targetCard.has ? (
                            <button className="bg-yellow w-full justify-center" onClick={()=>response(field.field_id)}>Ativar</button>
                        ) : (
                            <button className="bg-yellow w-full justify-center" onClick={()=>responseWithAbility(field.field_id)}>Ativar</button>
                        )}
                        
                        <img src={field.card?.image} className="object-fill max-h-[170px]"/>
                    </div>
                ))}
            </div>
            <button className="cyber-button bg-red fg-white vt-bot mt-2" onClick={()=>cancel()}>
                <h1>Não ativar nada em resposta</h1>
                <span className="glitchtext"></span>
            </button>
        </div>
    )
}