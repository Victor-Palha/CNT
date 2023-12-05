import { Header } from "../../components/Header";
import { TbCardsFilled } from "react-icons/tb"
import { RxCardStackPlus } from "react-icons/rx"

export function Deck(){
    return (
        <>
            <Header/>
            <div>
                <h1 className="text-4xl text-center">Decks</h1>
                <div className="flex justify-center gap-4">
                    <div className="flex flex-col justify-center items-center w-64 h-64 bg-gray-200 rounded-lg">
                        <TbCardsFilled className="text-6xl"/>
                        <h2 className="text-2xl">Deck 1</h2>
                    </div>
                    <div className="flex flex-col justify-center items-center w-64 h-64 bg-gray-200 rounded-lg">
                        <RxCardStackPlus className="text-6xl"/>
                        <h2 className="text-2xl">Deck 2</h2>
                    </div>
                </div>
            </div>
        </>
    )
}