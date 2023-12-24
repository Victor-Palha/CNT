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
            className="cursor-pointer w-[30%] cyber-glitch-1" 
            onContextMenu={(e)=>handleCard(e, card)}
            onClick={()=>handleCardInfo(card, null)}
        >
            <img src={card.image} alt={card.name} className=""/>
        </div>

    )
}