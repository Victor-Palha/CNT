import { useState } from "react";
import { Header } from "../../components/Header";
import instance from "../../lib/axios";
// name: z.string().min(3).max(32),
// description: z.string().min(3),
// image: z.string().url(),
// set_avatar: z.string(),
// unique_ability: z.string().uuid(),
// passive_ability: z.string().uuid().optional(),
// hit_points: z.number().int().positive(),
// attack: z.number().int().positive(),
// defense: z.number().int().positive(),
// type_avatar: z.enum(["OFENSIVO", "DEFENSIVO", "MODERADO"]),
export function Avatar(){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [set_avatar, setSet_avatar] = useState("")
    const [unique_ability, setUnique_ability] = useState("")
    const [passive_ability, setPassive_ability] = useState("")
    const [hit_points, setHit_points] = useState(0)
    const [attack, setAttack] = useState(0)
    const [defense, setDefense] = useState(0)
    const [type_avatar, setType_avatar] = useState("")

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const newAvatar = {
            name,
            description,
            image,
            set_avatar,
            unique_ability,
            passive_ability,
            hit_points,
            attack,
            defense,
            type_avatar
        }
        console.log(newAvatar)
        
        const response = await instance.post("/api/avatar", newAvatar,{
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
                <input type="text" placeholder="Set Avatar" 
                    value={set_avatar}
                    onChange={(e)=>setSet_avatar(e.target.value)}
                />
                <input type="text" placeholder="Unique Ability" 
                    value={unique_ability}
                    onChange={(e)=>setUnique_ability(e.target.value)}
                />
                <input type="text" placeholder="Passive Ability" 
                    value={passive_ability}
                    onChange={(e)=>setPassive_ability(e.target.value)}
                />
                <input type="number" placeholder="Hit Points" 
                    value={hit_points}
                    onChange={(e)=>setHit_points(Number(e.target.value))}
                />
                <input type="number" placeholder="Attack" 
                    value={attack}
                    onChange={(e)=>setAttack(Number(e.target.value))}
                />
                <input type="number" placeholder="Defense" 
                    value={defense}
                    onChange={(e)=>setDefense(Number(e.target.value))}
                />
                <select
                    value={type_avatar}
                    onChange={(e)=>setType_avatar(e.target.value)}
                >
                    <option value="OFENSIVO">OFENSIVO</option>
                    <option value="DEFENSIVO">DEFENSIVO</option>
                    <option value="MODERADO">MODERADO</option>
                </select>
                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
}