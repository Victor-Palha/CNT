import { CardsProps } from "../Card"

export interface AvatarsProps {
    id_avatar: string,
    name: string,
    description: string,
    image: string,
    set_avatar: string,
    type_avatar: string,
    attack: number,
    defense: number,
    hit_points: number,
    unique_ability: string,
}

type AvatarModelProps = {
    avatar: AvatarsProps,
    cards?: CardsProps[],
    handleAvatar(e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>, avatar: AvatarsProps): void
    handleAvatarInfo(cards: CardsProps | null, avatar: AvatarsProps | null): void
}
export function AvatarModel({avatar, cards = [], handleAvatar, handleAvatarInfo}: AvatarModelProps){
    return(
        <div 
            className="flex flex-col cyber-tile-small bg-black h-56 cursor-pointer hover:scale-105 w-[30%] overflow-hidden" 
            onContextMenu={(e)=>handleAvatar(e, avatar)}
            onClick={()=>handleAvatarInfo(null, avatar)}
        >
            <img src={avatar.image} alt={avatar.name} className=""/>
            <div className="cyber-tile-small bg-slate-500 mt-2 text-[10px]">
                <p className="text-black">{avatar.name}</p>
                <div className="flex gap-2">
                    <p>ATK: {avatar.attack}</p>
                    <p>DEF: {avatar.defense}</p>
                </div>
                <p>{avatar.type_avatar}</p>
            </div>
            <p className="text-sm cyber-glitch-2 text-gray-400">{avatar.description}</p>
            {cards.map((card)=>(
                card.id_card === avatar.unique_ability ? (
                    <div className="text-center mt-2" key={card.id_card}>
                        <p className="text-white">{card.name}</p>
                    </div>
                ) : (null)
            ))}
        </div>
    )
}