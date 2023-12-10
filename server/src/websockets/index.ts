import { io } from "../app";
import { ConnectToRooms } from "./ConnectToRooms/ConnectToRooms";

const gameRooms = new ConnectToRooms(io)
gameRooms.init()