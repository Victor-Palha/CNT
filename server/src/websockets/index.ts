import { io } from "../app";
import { ConnectToRooms } from "./Rooms/ConnectToRooms";
import { StartConfront } from "./Game/StartConfront";


const gameRooms = new ConnectToRooms(io)
const confrontRooms = new StartConfront(io)

gameRooms.init()
confrontRooms.initConfront()