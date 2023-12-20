type OpponentFieldProps = {
    enemyHand: number;
    isMyTurn: boolean;
    enemyField: any[];
    enemyAvatar: any;
}

export function OponentField({enemyHand, isMyTurn, enemyField, enemyAvatar}: OpponentFieldProps){
    return (
        <div className={`p-4 ${!isMyTurn && "animate-pulse"} mx-[10%] md:mx-[35%] bg-gray-900`}>
            {/* Enemys Hand */}
            <div className="flex justify-center mt-[-4rem] w-full items-center absolute z-10">
            {Array.from({ length: enemyHand }, (_, index) => (
                <div key={index} className="cyber-tile bg-red w-[100px] h-[100px]"></div>
            ))}
            </div>
            <div className="bg-gray-900">
                {/* Enemys Grid */}
                <div className={`p-4 ${isMyTurn === false && "animate-pulse"}`}>
                    <div className="grid grid-cols-3 gap-10">
                        {enemyField && enemyField.map((card, index) => (
                            <div key={index} id={card.id} className="bg-gray-800 w-full h-[170px] cyber-tile border-red-500 border-2">
                                {!card.empty && <div className="bg-red w-full h-full"></div>}
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