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
export function AvatarModel({avatar, handleAvatar, handleAvatarInfo}: AvatarModelProps){
    return(
        <div 
            className="cursor-pointer w-[30%]" 
            onContextMenu={(e)=>handleAvatar(e, avatar)}
            onClick={()=>handleAvatarInfo(null, avatar)}
        >
            <img src={avatar.image} alt={avatar.name} className="object-fill"/>
        </div>
    )
}