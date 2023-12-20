type MyFieldProps = {
    myHand: any[];
    isMyTurn: boolean;
    myField: any[];
    myAvatar: any;
    myDeck: number;
    handleDragStart: (e: any, id: string) => void;
    handleSetCards: (e: any) => void;
}

export function MyField({ myHand, isMyTurn, myField, myAvatar, handleDragStart, handleSetCards, myDeck }: MyFieldProps) {
    alert(isMyTurn)
    return (
        <div className={`p-4 ${isMyTurn && "animate-pulse"} mx-[10%] md:mx-[35%] bg-gray-900`}>
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
                            id={card.id} 
                            className="bg-gray-800 w-full h-[170px] cyber-tile border-2 border-cyan-500"
                            onDragOver={(e)=>{e.preventDefault()}}
                            onDrop={(e)=>{handleSetCards(e)}}
                        >
                            {card.card && <img src={card.card.image} className="object-fill max-h-[170px] opacity-50"/>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-cyan cyber-tile w-[100px] h-[120px] my-[-10rem] absolute right-0 mr-2">
                <p>{myDeck}</p><br />
                <p>DECK</p>
            </div>
            {/* Players Hand */}
            <div className="flex justify-center mt-[-7rem] w-full items-center absolute z-10">
                {myHand && myHand.length > 0 && myHand.map((card, index) => (
                    <div 
                        key={index} 
                        className="cyber-tile bg-cyan w-[100px] h-[200px] hover:scale-105 cursor-move"
                        draggable={true}
                        onDragStart={(e)=>{handleDragStart(e, card.id_card)}}
                        // onDrop={(e)=>{handleSetCards(e)}}
                        id={card.id_card}
                    >
                        <img src={card.image} draggable={false}/>
                        <div className="text-sm flex flex-col bg-gray-900">
                            <span className="text-white">{card.name}</span>
                            <span className="text-white">{card.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}