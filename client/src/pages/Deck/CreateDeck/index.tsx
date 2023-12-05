import { useEffect, useState } from "react"
import { Header } from "../../../components/Header"
import instance from "../../../lib/axios"
import { CardModel, CardsProps } from "../../../components/Card"
import { AvatarModel, AvatarsProps } from "../../../components/Avatar"

interface MyDeck{
    deck_name: string,
    avatar_id: string,
    cards: string[],
}

export function CreateDeck(){
    const [cards, setCards] = useState<CardsProps[]>([])
    const [avatars, setAvatars] = useState<AvatarsProps[]>([])

    const [deckName, setDeckName] = useState("")
    const [cardsSelected, setCardsSelected] = useState<CardsProps[]>([])
    const [avatarSelected, setAvatarSelected] = useState<AvatarsProps | undefined>(undefined)
    async function FetchCards(){
        const response = await instance.get("/api/card", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@token:cnt")}`
            },
            params: {
                search: ""
            }
        })

        setCards(response.data.cards)

        setAvatars(response.data.avatars)
    }

    function addCardToDeck(card: CardsProps){
        setCardsSelected([...cardsSelected, card])
    }
    function removeCardFromDeck(card: CardsProps){
        setCardsSelected(cardsSelected.filter((cardSelected)=>cardSelected.id_card !== card.id_card))
    }
    function addAvatarToDeck(avatar: AvatarsProps){
        setAvatarSelected(avatar)
    }
    function removeAvatarFromDeck(){
        setAvatarSelected(undefined)
    }

    async function makeDeck(e: React.FormEvent<HTMLFormElement>){
        const deck: MyDeck = {
            avatar_id: avatarSelected?.id_avatar || "",
            deck_name: deckName,
            cards: cardsSelected.map((card)=>card.id_card)
        }

        e.preventDefault()
        const response = await instance.post("/api/deck", deck, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@token:cnt")}`
            }
        })

        console.log(response.data)
    }
    useEffect(()=>{
        FetchCards()
    }, [])
    return (
        <>
            <Header/>
            <div className="grid grid-cols-2 gap-2">
                {/* Cards to create Deck */}
                <form onSubmit={(e)=>makeDeck(e)}>
                    <div className="cyber-input flex items-center mb-10">
                        <input type="text" className="" placeholder="Meu novo deck"
                            value={deckName}
                            onChange={(e) => setDeckName(e.target.value)}
                        />
                        {avatarSelected && (
                            <button className={"cyber-button-small"} disabled={deckName === ""}>
                                Salvar deck
                                <span className="glitchtext"></span>
                            </button>
                        )}
                    </div>
                    {avatarSelected && (
                        <div className="flex justify-center">
                            <AvatarModel avatar={avatarSelected} cards={cards} handleAvatar={removeAvatarFromDeck}/>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-10">
                        {cardsSelected.map((card) => (
                            <CardModel card={card} handleCard={removeCardFromDeck}/>
                        ))}
                    </div>
                </form>
                {/* Cards from DB */}
                <div className="gap-4 max-h-[90vh] overflow-x-hidden">
                    <h1 className="cyber-h">Avatares</h1>
                    <div className="flex flex-wrap gap-2">
                        {avatars.map((avatar) => (
                            <AvatarModel avatar={avatar} cards={cards} handleAvatar={addAvatarToDeck}/>
                        ))}
                    </div>
                    <h1 className="cyber-h">Cartas</h1>
                    <div className="flex flex-wrap gap-2">
                        {cards.map((card) => (
                            <CardModel card={card} key={card.id_card} handleCard={addCardToDeck}/>
                        ))}
                    </div>
                </div>
            </div>  
        </>
    )
}