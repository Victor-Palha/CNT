import { Header } from "../../components/Header";
import { TbCardsFilled } from "react-icons/tb"
import { RxCardStackPlus } from "react-icons/rx"
import { Link } from "react-router-dom";

export function Deck(){
    return (
        <>
            <Header/>
            <div className="flex flex-col justify-center pt-20 items-center gap-10">
                <h1 className="text-2xl font-bold text-blue-500">Decks</h1>
                <div className="flex">
                    <Link to={"/deck/create"} className="">
                        <div className="cyber-tile-small cyber-glitch-1 bg-black flex justify-center">
                                <RxCardStackPlus className="w-10 h-10 text-blue-500"/>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}