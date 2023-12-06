import { AvatarsProps } from "../Avatar"

export interface CardsProps {
    id_card: string,
    name: string,
    description: string,
    image: string,
    set_card: string,
    type_card: string,
}

type CardModelProps = {
    card: CardsProps,
    handleCard(e:React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>, card: CardsProps): void,
    handleCardInfo(cards: CardsProps | null, avatar: AvatarsProps | null): void
}
export function CardModel({card, handleCard, handleCardInfo}: CardModelProps){
    return(

        <div 
            className="flex flex-col cyber-tile-small bg-cyan-600 h-52 w-[30%] overflow-hidden cyber-glitch-1" 
            onContextMenu={(e)=>handleCard(e, card)}
            onClick={()=>handleCardInfo(card, null)}
        >
            <img src={card.image} alt={card.name} className=""/>
            <div className="cyber-tile-small text-[10px] bg-black mt-4">
                <p className="text-white">{card.name}</p>
                <p className="text-sm  text-white text-[12px] mt-2">{card.description}</p>
            </div>
        </div>

    )
}