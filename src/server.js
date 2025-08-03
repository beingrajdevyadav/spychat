const express = require("express") ;
const http = require("http") ;
const { Server } = require("socket.io") ;
const path = require("path") ;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../public")));

// socket.io connection
io.on("connection", (socket)=>{
    socket.on("joinChat", (user)=>{
        socket.user = user;
        socket.emit("info", {
            type: "info",
            message: `Welcome ${user}! You have joined the chat.`   
        });
    })
})


const PORT = 3000;

// server listening
server.listen(PORT, ()=>{
    console.log(`server is serving at http://localhost:${PORT}`);
})
