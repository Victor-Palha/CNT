import { Server, Socket } from "socket.io";
import { Rooms } from "..";

type ChooseDeckData = {
    room_id: string;
    deck_id: string;
}

export function ChooseDeck(socket: Socket, INSTANCE: Rooms){
      socket.on("choose_Deck", (data: ChooseDeckData)=>{
          const {room_id, deck_id} = data
          const room = INSTANCE.getRoom(room_id)
          if(!room){
              socket.emit("room_not_found")
              return
          }

          const player = room.players.find(player => player.socket_id === socket.id)
          if(!player){
              socket.emit("player_not_found")
              return
          }

          player.deck_id = deck_id
          INSTANCE.io.to(room_id).emit("room_Info", room)
      })
}