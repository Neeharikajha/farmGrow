// routes/messageRoutes.js
import express from "express";
import msg from "../models/Msg.js";

const router = express.Router();

// router.get("/:userId", async (req, res) => {
//   const { userId } = req.params;

//   const messages = await msg.find({
//     $or: [{ senderId: userId }, { receiverId: userId }],
//   }).sort({ createdAt: 1 });

//   res.json(messages);
// });
router.get("/:userId/:chatId", async (req, res) => {
  const { userId, chatId } = req.params;
  const messages = await msg
    .find({
      $or: [
        { senderId: userId, receiverId: chatId },
        { senderId: chatId, receiverId: userId },
      ],
    })
    .sort({ createdAt: 1 });

  res.json(messages);
});

export default router;
