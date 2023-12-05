import { useContext } from "react"
import { authContext } from "../../context/authContext"
import { Navigate } from "react-router-dom"
import { Header } from "../../components/Header"

export function Home(){
    const {isAuth} = useContext(authContext)
    return (
        <div>
            {!isAuth && (
                <Navigate to='/login'/>
            )}
            <Header/>
        </div>
    )
}