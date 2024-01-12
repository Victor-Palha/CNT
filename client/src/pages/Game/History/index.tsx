import { Historic as H } from "..";
import { Player } from "../../../context/authContext";

type HistoryProps = {
    historic: H[]
}
export function History({historic}: HistoryProps){
    let Me = localStorage.getItem('@player:cnt') as any
    Me = Me ? JSON.parse(Me) as Player : null
    return (
        <code className="code-block absolute right-2 w-[300px] max-h-[400px] overflow-scroll cyber-glitch-0 pb-10" data-title="Histórico: ">
            {historic.map((item, index) => (
                <div key={index} className="border-b-2 border-red-600 mt-2">
                    <span className="italic">Turno {item.turn}</span><br />
                    <span>{item.player === Me.id_player ? "Você " : "O inimigo "}ativou {item.card.name}</span>
                </div>
            ))}
        </code>
    )
}