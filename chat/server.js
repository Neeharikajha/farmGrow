import express from "express";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { socketHandler } from "./controllers/socket.js";
import authRoutes from './routes/auth.js'; 
import bodyParser from "body-parser";
import farmersPostRoutes from "./routes/farmersPostRoutes.js";
import msgRoutes from "./routes/msgRoutes.js";

dotenv.config();
const app= express();
app.use(cors());
app.use(express.json({
  origin: "http://localhost:5173", // Vite frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB working"))
.catch(err=> console.error("Not working", err));


app.get("/", (req,res) => res.send("Chat working"));


const server= http.createServer(app);

const io= new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use('/auth', authRoutes);
socketHandler(io);

app.use("/post", farmersPostRoutes); // all CRUD for posts
app.use("/messages", msgRoutes);

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