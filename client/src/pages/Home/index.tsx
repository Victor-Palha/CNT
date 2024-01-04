import { Header } from "../../components/Header"
import { CodeWriter } from "./CodeWriter"
// WP
import background from "../../assets/wp.png";


export function Home(){

    return (
        <div className="bg-fixed bg-center bg-no-repeat bg-cover h-screen" style={{ backgroundImage: `url(${background})` }}>

            <Header/>
            <div className="flex-col flex justify-center items-center h-[80vh] w-full">
                <CodeWriter/>
            </div>
        </div>
    )
}