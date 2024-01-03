import { useContext } from "react"
import { authContext } from "../../context/authContext"
import { Link, Navigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { CodeWriter } from "./CodeWriter"
// WP
import background from "../../assets/wp.png";


export function Home(){
    const {isAuth} = useContext(authContext)
    return (
        <div className="bg-fixed bg-center bg-no-repeat bg-cover h-screen" style={{ backgroundImage: `url(${background})` }}>
            {!isAuth && (
                <Navigate to='/login'/>
            )}
            <Header/>
            <div className="flex-col flex justify-center items-center h-[80vh] w-full">
                <Link to="/confront/rooms" className="cyber-button bg-red fg-white vt-bot absolute z-50">
                    <h1 className="cyberpunk-font">Confronto</h1>
                    <span className="glitchtext"></span>
                    <span className="tag">3023</span>
                </Link>
                
                    <CodeWriter/>
                
            </div>
        </div>
    )
}