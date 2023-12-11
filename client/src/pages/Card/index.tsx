import { useState } from "react";
import { Header } from "../../components/Header";
import instance from "../../lib/axios";

// name: string
// description: string
// image: string
// set_card: string
// type_card: "OFENSIVA", "DEFENSIVA", "HABILIDADE", "HABILIDADE_UNICA"
// copies: number

export function Card(){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [set_card, setSet_card] = useState("")
    const [type_card, setType_card] = useState("")
    const [copies, setCopies] = useState(0)
    


    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const newCard = {
            name,
            description,
            image,
            set_card,
            type_card,
            copies
        }
        console.log(newCard)
        
        const response = await instance.post("/api/card", newCard, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@token:cnt")}`
            }
        })

        console.log(response)
    }

    return (
        <>
            <Header/>
            <form className="flex flex-col gap-2 w-52 ml-auto mr-auto mt-20" onSubmit={(e)=>handleFormSubmit(e)}>
                <input type="text" placeholder="Nome"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input type="text" placeholder="Descrição" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <input type="url" placeholder="Imagem" 
                    value={image}
                    onChange={(e)=>setImage(e.target.value)}
                />
                <input type="text" placeholder="Set" 
                    value={set_card}
                    onChange={(e)=>setSet_card(e.target.value)}
                />
                <select
                    value={type_card}
                    onChange={(e)=>setType_card(e.target.value)}
                >
                    <option value="OFENSIVA">OFENSIVA</option>
                    <option value="DEFENSIVA">DEFENSIVA</option>
                    <option value="HABILIDADE">HABILIDADE</option>
                    <option value="HABILIDADE_UNICA">HABILIDADE_UNICA</option>
                </select>
                <input type="number" placeholder="Copias" 
                    value={copies}
                    onChange={(e)=>setCopies(parseInt(e.target.value))}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
}