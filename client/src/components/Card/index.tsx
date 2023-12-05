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
    handleCard(card: CardsProps): void
}
export function CardModel({card, handleCard}: CardModelProps){
    return(

        <div className="flex flex-col cyber-tile-small bg-cyan-600 w-36 h-auto" key={card.id_card} onClick={()=>handleCard(card)}>
            <img src={card.image} alt={card.name} className=""/>
            <div className="cyber-tile bg-black mt-4">
                <p className="text-white">{card.name}</p>
            </div>
            <p className="text-sm cyber-glitch-2">{card.description}</p>
        </div>

    )
}