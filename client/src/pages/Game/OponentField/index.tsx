import { Avatar, Field } from "..";

type OpponentFieldProps = {
    enemyHand: number;
    isMyTurn: boolean;
    enemyField: Field;
    enemyAvatar: Avatar;
    enemyDeck: number;
}

export function OponentField({enemyHand, isMyTurn, enemyField, enemyAvatar, enemyDeck}: OpponentFieldProps){
    return (
        <div className={`px-4 ${isMyTurn === false && "animate-pulse"} mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-900`}>
        {/* Enemys Deck */}
            <div className="bg-red cyber-tile w-[100px] h-[120px] absolute right-0 mr-2">
                    <p>{enemyDeck}</p><br/>
                    <p>DECK</p>
                </div>
            {/* Enemys Hand */}
            <div className="flex justify-center mt-[-4rem] items-center absolute z-10 gap-1">
            {Array.from({ length: enemyHand }, (_, index) => (
                <div key={index} className="cyber-tile bg-red w-[100px] h-[100px] first:rotate-[2deg] last:rotate-[-2deg]"></div>
            ))}
            </div>
            <div className="bg-gray-900">
                {/* Enemys Grid */}
                <div className={`p-4 ${isMyTurn === false && "animate-pulse"}`}>
                    <div className="grid grid-cols-3 gap-10">
                        {enemyField && enemyField.map((card, index) => (
                            <div key={index} id={card.field_id} className="bg-gray-800 w-full h-[170px] cyber-tile border-red-500 border-2">
                                {!card.empty && !card.card?.activate && <div className="bg-red w-full h-full"></div>}

                                {!card.empty && card.card?.activate && 
                                <img src={card.card.image} className="object-fill max-h-[170px] opacity-50"/>
                                }
                            </div>
                        ))}
                    </div>
                {/* Enemys Avatar */}
                    {enemyAvatar && (
                        <div className="bg-black w-[120px] mx-auto m-4 rotate-180 cyber-tile">
                            <img src={enemyAvatar.image}/>
                            <div className="text-white rotate-180 flex items-center justify-center">
                                <span>ATK: {enemyAvatar.attack}</span>
                                <span>HP: {enemyAvatar.hit_points}</span>
                                <span>DEF: {enemyAvatar.defense}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}