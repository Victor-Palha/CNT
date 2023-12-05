import { io } from "../app";

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })
    socket.on("chat_message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat_message", msg);
    })
})