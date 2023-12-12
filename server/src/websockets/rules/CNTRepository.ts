import { Avatars, Cards } from "@prisma/client"
import { DeckPlayer } from "./CNT"

export interface CntRepository {
    getDeck(deck_id: string): Promise<DeckPlayer | undefined>
    getAvatar: Avatars | null
    getDeckCards: Cards[] | undefined
    id: string
    resetAttributes(): void
}