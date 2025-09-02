import express from "express";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { socketHandler } from "./controllers/socket.js";
import authRoutes from './routes/auth.js'; 

dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB working"))
.catch(err=> console.error("Not working", err));


app.get("/", (req,res) => res.send("Chat working"));


const server= http.createServer(app);

const io= new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use('/auth', authRoutes);
socketHandler(io);

// io.on("connection", (socket) => {
//   console.log(" User connected:", socket.id);

//   socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
//     const newMessage = new msg({ senderId, receiverId, text });
//     await newMessage.save();

//        io.emit("receiveMessage", newMessage);
//   });
//   socket.on("disconnect", () => {
//     console.log(" User disconnected:", socket.id);
//   });
// });



const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server on port ${PORT}`));