import { io } from "../app";

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })
    socket.on("joinRoom", (data) => {
        console.log(data);
    })
})