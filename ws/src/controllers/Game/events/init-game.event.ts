import { Socket } from "socket.io";
import { Game } from "..";

type InitGameData = {
    room_id: string;
    player_id: string;
}
export function InitGame(socket: Socket, INSTANCE: Game){
    socket.on("init_Game", (data: InitGameData)=>{
        const {room_id, player_id} = data;
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_Not_Found")
            return
        }
        const {player} = room.gameLogic.getPlayersRender({
            player_id,
            player_guest: room.player_guest,
            player_host: room.player_host
        })
        const {to_player} = INSTANCE.renderGame(room, player_id)

        const socketsConnected = room.gameState.getSockets

        socketsConnected.map((sockets)=>{
            // If socket is the same as the player who is connecting, just send the data to him
            if(socket.id === sockets && player_id === player.id){
                socket.emit("deal_Cards", to_player)
            }
            // If is a new socket but the player is already connected, send the data to him and replace the socket
            else{
                
                room.gameState.newSocketsPlayers(sockets, socket.id)
                socket.join(room_id)
                socket.emit("deal_Cards", to_player)
            }
        })
    })
}