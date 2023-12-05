import { useContext } from "react"
import { authContext } from "../../context/authContext"
import { Navigate } from "react-router-dom"

export function Home(){
    const {isAuth} = useContext(authContext)
    return (
        <div>
            {!isAuth && (
                <Navigate to='/login'/>
            )}
            
        </div>
    )
}