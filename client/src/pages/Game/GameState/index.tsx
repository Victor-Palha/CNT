import { useEffect, useState } from "react";

type GameStateProps = {
    inChain: boolean;
    phase: number;
    isMyTurn: boolean;
    canSkip: boolean;
    skip(): void;
}
export function GameState({phase, isMyTurn, skip, canSkip, inChain}: GameStateProps){
    const [phaseText, setPhaseText] = useState("")
    useEffect(()=>{
        switch(phase){
            case 0:
                setPhaseText("Fase de Compra")
                break;
            case 1:
                setPhaseText("Fase de Preparação")
                break;
            case 2:
                setPhaseText("Fase de Ação")
                break;
            case 3:
                setPhaseText("Climax")
                break;
        }
    }, [phase])
    return (
        <>
        {!inChain ? (
            <div className="rounded-md bg-yellow-400 p-2 m-1 shadow-black shadow-lg">
                <div className="text-sm font-bold text-center">{phaseText}</div>
                <div className="italic text-center text-sm">{isMyTurn ? "Sua vez" : "Vez do oponente"}</div>
                {canSkip && isMyTurn && phase === 2 && (
                    <div className="flex justify-center">
                        <button className="bg-yellow-500 rounded-md p-1 text-sm" onClick={()=>skip()}>Pular Turno</button>
                    </div>
                )}
            </div>
        ) : (
            <div>
                <div className="cyber-att-2 w-full cyber-glitch-2">
                    <p className="text-white">Corrente de efeitos</p>
                </div>
            </div>
        )}
        </>
    )
}