import "dotenv/config"
import {io, server} from "./app"
import CreateRoom from "./controllers/Rooms/events/create-rooms.event"
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    console.log(`Web Socket Server listening on port ${PORT}`)
    // WS
    new CreateRoom(io)
})
