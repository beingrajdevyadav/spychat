const express = require("express") ;
const http = require("http") ;
const { Server } = require("socket.io") ;
const path = require("path") ;
require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors"); // Import CORS middleware


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// socket.io connection
io.on("connection", (socket)=>{

    // Listen for incoming messages
    socket.on("joinChat", (user)=>{
        // console.log(user);
        socket.user = user;
        socket.emit("info", {
            type: "info",
            message: `Welcome ${user.username}! You have joined the chat.`   
        });

        // broadcast to others only when a user joins
        socket.broadcast.emit("info", {
            type: "info",
            message: `${user.username} has joined the chat.`
        });
    });




    // handle incoming messages
    socket.on("message", (msg)=>{
        // console.log(msg);
        io.emit("message", {
            type: "message",
            ...msg,
        });
    });

});


const PORT = process.env.PORT || 3000;
  
// server listening
server.listen(PORT, ()=>{
    console.log(`server is serving at http://localhost:${PORT}`);
})
