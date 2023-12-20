import { Avatar, Cards, Field } from "..";

type MyFieldProps = {
    myHand: Cards[];
    isMyTurn: boolean;
    myField: Field;
    myAvatar: Avatar;
    myDeck: number;
    phase: number;
    handleDragStart: (e: any, id: string) => void;
    handleSetCards: (e: any) => void;
    ativateCard(field_id: string): void
}

export function MyField({ myHand, isMyTurn, myField, myAvatar, handleDragStart, handleSetCards, myDeck, ativateCard, phase}: MyFieldProps) {
    return (
        <div className={`p-4 ${isMyTurn === true && "animate-pulse"} mx-[10%] md:mx-[25%] lg:mx-[35%] bg-gray-900`}>
            {/* Players Avatar */}
            <div>
                {myAvatar && (   
                    <div className="bg-black w-[120px] h-[180px] mx-auto m-4 cyber-tile">
                        <img src={myAvatar.image}/>
                        <div className="text-white flex items-center justify-center">
                            <span>ATK: {myAvatar.attack}</span>
                            <span>HP: {myAvatar.hit_points}</span>
                            <span>DEF: {myAvatar.defense}</span>
                        </div>
                    </div>
                )}
            {/* Players Grid */}
                <div className="grid grid-cols-3 w-full gap-10">
                    {myField && myField.map((card, index) => (
                        <div 
                            key={index} 
                            id={card.field_id} 
                            className="bg-gray-800 w-full h-[170px] cyber-tile border-2 border-cyan-500"
                            onDragOver={(e)=>{e.preventDefault()}}
                            onDrop={(e)=>{handleSetCards(e)}}
                        >
                            {isMyTurn && card.card && phase === 2 && (
                                <button className="z-20" onClick={()=>ativateCard(card.field_id)}>
                                    Ativar Carta
                                </button>
                            )}
                            {card.card && <img src={card.card.image} className="object-fill max-h-[170px] opacity-50"/>}
                        </div>
                    ))}
                </div>
            </div>
            {/* Players Hand */}
            <div className="flex justify-center absolute gap-1 mt-[-5rem] items-center z-10 ">
                {myHand && myHand.length > 0 && myHand.map((card, index) => (
                    <div 
                        key={index} 
                        className="cyber-tile bg-cyan w-[100px] h-[200px] hover:scale-105 cursor-move first:rotate-[-1deg] last:rotate-[1deg]"
                        draggable={true}
                        onDragStart={(e)=>{handleDragStart(e, card._id)}}
                        id={card._id}
                    >
                        <img src={card.image} draggable={false}/>
                        <div className="text-sm flex flex-col bg-gray-900 ">
                            <span className="text-white overflow-auto">{card.name}</span>
                        </div>
                    </div>
                ))}

            </div>
                <div className="bg-cyan cyber-tile w-[100px] h-[120px] my-[-10rem] absolute left-0 mr-2">
                    <p>{myDeck}</p><br/>
                    <p>DECK</p>
                </div>
        </div>
    )
}