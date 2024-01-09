import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

export function Header(){
    const {isAuth} = useContext(authContext)
    function signOut(){
        localStorage.removeItem('@token:cnt')
        window.location.reload()
    }
    return (
        <header className="py-2 flex justify-evenly bg-black text-blue-500 cyber-razor-bottom items-center">
            {!isAuth && (
                <Navigate to='/login'/>
            )}
            <Link to={"/"} className="text-4xl cyberpunk-font">CNT</Link>

            <Link to="/confront/rooms" className="cyber-button-small fg-white vt-bot z-10">
                    <h1 className="cyberpunk-font text-red">Confronto</h1>
                    <span className="glitchtext"></span>
                    <span className="tag">3023</span>
            </Link>

            <nav className="flex gap-4">
                <Link to={"/deck"}>Decks</Link>
                <Link to={"/rules"}>Regras</Link>
                <button onClick={signOut}>Signout</button>
            </nav>
        </header>
    )
}