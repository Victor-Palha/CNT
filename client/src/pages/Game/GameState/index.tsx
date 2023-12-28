import { useEffect, useState } from "react";

type GameStateProps = {
    phase: number;
    isMyTurn: boolean;
    canSkip: boolean;
    skip(): void;
}
export function GameState({phase, isMyTurn, skip, canSkip}: GameStateProps){
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
        <div className="rounded-full bg-yellow-400 p-4 m-2 shadow-black shadow-lg">
            <div className="text-lg font-bold text-center">{phaseText}</div>
            <div className="italic text-center">{isMyTurn ? "Sua vez" : "Vez do oponente"}</div>
            {canSkip && isMyTurn && phase === 2 && (
                <div className="flex justify-center">
                    <button className="bg-yellow-500 rounded-md p-2" onClick={()=>skip()}>Pular Turno</button>
                </div>
            )}
        </div>
    )
}