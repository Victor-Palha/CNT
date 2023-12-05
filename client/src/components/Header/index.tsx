import { Link } from "react-router-dom";

export function Header(){
    return (
        <header className="py-2 flex justify-evenly bg-black text-blue-500 cyber-razor-bottom items-center">
            <Link to={"/"} className="text-4xl">CNT</Link>
            <nav className="flex gap-4">
                <Link to={"/deck"}>Decks</Link>
                <Link to={"/card"}>Add Card</Link>
                <Link to={"/avatar"}>Add Avatar</Link>
                <Link to={"/rules"}>Regras</Link>
                <button>Signout</button>
            </nav>
        </header>
    )
}