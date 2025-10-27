// // controllers/socketController.js
// import msg from "../models/Msg.js";

// // Function to handle socket.io events
// export const socketHandler = (io) => {
//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
//       const newMessage = new msg({ senderId, receiverId, text, type: "message" });
//       await newMessage.save();

//       io.emit("receiveMessage", newMessage); // send to all clients
//     });

//      socket.on("sendOffer", async ({ offer, senderId, receiverId }) => {
//       const newOffer = new msg({
//         senderId,
//         receiverId,
//         text: `Offer: ₹${offer}`,
//         type: "offer",
//       });
//       await newOffer.save();
//       io.emit("receiveOffer", newOffer); 
//     }); 

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });
// };

// controllers/socketController.js

// import msgModel from "../models/Msg.js";

// /**
//  * socketHandler(io)
//  * - Keeps an in-memory map of online users: userId -> socketId
//  * - Receives messages, persists them, and emits only to the receiver (and sender)
//  * - Includes basic error handling and acknowledgement
//  *
//  * NOTE: For horizontal scaling, replace the in-memory map with Redis + socket.io adapter.
//  */
//  const onlineUsers = new Map();

// export const socketHandler = (io) => {
//   // Map of userId -> socketId
 

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     // Option A: Clients send userId during handshake:
//     // const { userId } = socket.handshake.auth || {};
//     // Option B: Clients emit an 'init' event after connection (safer with tokens)
//     socket.on("init", ({ userId }) => {
//       if (!userId) return;
//       onlineUsers.set(userId, socket.id);
//       console.log("Registered user:", userId, "=>", socket.id);
//       // Optionally broadcast presence update here
//     });

//     // Handle normal text message
//     socket.on("sendMessage", async ({ senderId, receiverId, text, clientTempId }) => {
//       try {
//         // basic validation
//         if (!senderId || !receiverId || !text) {
//           socket.emit("messageError", { error: "Invalid message payload", clientTempId });
//           return;
//         }

//         // Save message
//         const newMessage = new msgModel({
//           senderId,
//           receiverId,
//           text,
//           type: "message",
//           createdAt: new Date(),
//         });

//         const saved = await newMessage.save();

//         // Emit to receiver if online
//         const receiverSocketId = onlineUsers.get(receiverId);
//         if (receiverSocketId) {
//           io.to(receiverSocketId).emit("receiveMessage", saved);
//         }

//         // Also emit back to sender to confirm (useful for client UI + ack)
//         socket.emit("messageSent", saved);

//         // If receiver offline, they will fetch this message via API when they come online
//       } catch (err) {
//         console.error("Error saving message:", err);
//         socket.emit("messageError", { error: "Server error while saving message", clientTempId });
//       }
//     });

//     // Handle offers (same idea)
//     socket.on("sendOffer", async ({ offer, senderId, receiverId, clientTempId }) => {
//       try {
//         if (!senderId || !receiverId || typeof offer === "undefined") {
//           socket.emit("offerError", { error: "Invalid offer payload", clientTempId });
//           return;
//         }

//         const newOffer = new msgModel({
//           senderId,
//           receiverId,
//           text: `Offer: ₹${offer}`,
//           type: "offer",
//           createdAt: new Date(),
//         });

//         const savedOffer = await newOffer.save();

//         const receiverSocketId = onlineUsers.get(receiverId);
//         if (receiverSocketId) {
//           io.to(receiverSocketId).emit("receiveOffer", savedOffer);
//         }

//         socket.emit("offerSent", savedOffer);
//       } catch (err) {
//         console.error("Error saving offer:", err);
//         socket.emit("offerError", { error: "Server error while saving offer", clientTempId });
//       }
//     });

//     // Cleanup on disconnect
//     socket.on("disconnect", () => {
//       // Remove user from onlineUsers map if present
//       for (const [userId, sockId] of onlineUsers.entries()) {
//         if (sockId === socket.id) {
//           onlineUsers.delete(userId);
//           console.log("User disconnected and deregistered:", userId);
//           break;
//         }
//       }
//       console.log("Socket disconnected:", socket.id);
//     });
//   });
// };

// controllers/socketController.js
import Message from "../models/Msg.js";

const onlineUsers = new Map(); // userId -> socket.id

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // when a user connects, store their ID
    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
      console.log("🔥 Message received from client:", senderId, receiverId, text);
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        
      });
      await newMessage.save();
       console.log("✅ Saved to MongoDB:", newMessage);

      // Send to receiver only (if online)
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMessage);
      }

      // Also send back to sender (to display in their chat window)
      const senderSocketId = onlineUsers.get(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("receiveMessage", newMessage);
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};
