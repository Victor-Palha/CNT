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
    handleAvatar(avatar: AvatarsProps): void
}
export function AvatarModel({avatar, cards = [], handleAvatar}: AvatarModelProps){
    return(
        <div className="flex flex-col cyber-tile-small bg-black w-40 h-auto cursor-pointer hover:scale-105" key={avatar.id_avatar} onClick={()=>handleAvatar(avatar)}>
            <img src={avatar.image} alt={avatar.name} className=""/>
            <div className="cyber-tile bg-slate-500 mt-4">
                <p className="text-back">{avatar.name}</p>
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