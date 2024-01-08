import "dotenv/config"
import { Rooms } from "./controllers/Rooms"
import {io, server} from "./app"
// import { eventsFactory } from "./controllers/Rooms/factory/events.factory"
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    console.log(`Web Socket Server listening on port ${PORT}`)
    const rooms = new Rooms(io)
    // const events = eventsFactory(rooms.io)
    // rooms.setupEvents(events)
})
