import { io } from "../app";
import { ConnectToRooms } from "./Rooms/ConnectToRooms";
import { Game } from "./Game/Game";


const gameRooms = new ConnectToRooms(io)
const confrontRooms = new Game(io, gameRooms)

gameRooms.init()
confrontRooms.initGame()