import { Field } from "..";

type ReactionProps = {
    responseOptions: Field;
    cancel: () => void;
    response(field_id: string): void;
    responseWithAbility(field_id: string): void;
}
export function Reaction({responseOptions, cancel, response, responseWithAbility}: ReactionProps){
    return (
        <div className="cyber-tile mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-950 p-4 w-fit z-40 absolute mt-[-12rem]">
            <div className="cyber-att-2 w-full cyber-glitch-4">
                <p className="text-white">Corrente de efeitos</p>
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