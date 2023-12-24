import { Avatar, Cards } from "..";

type DialogProps = {
    open: boolean;
    card?: Cards | Avatar;
    close(Card: any):void
}
export function Dialog({open, card, close}: DialogProps){
    return (
        <dialog 
            className={`cursor-pointer fixed z-50 inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center w-full h-full`} 
            open={open} 
            aria-labelledby="modal-title" 
            role="dialog" 
            aria-modal="true" 
            onClick={()=>close(null)}
        >
            {card && (
                <div className="fixed z-50 inset-0 cyber-tile bg-gray-900 p-4 cursor-auto">
                    <img src={card.image} className="w-[100px] h-[150px]"/>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-white font-bold">{card.name}</span>
                        <span className="text-white">{card.description}</span>
                    </div>
                </div>
            )}
        </dialog>
    )
}