import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
   // backend URL

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      senderId: "farmer1",
      receiverId: "consumer1",
      text: message,
    });
    setMessage("");
  };

  return (
    <div>
      <h1>🌾 FarmGrow Chat</h1>
      <div>
        {chat.map((msg, i) => (
          <p key={i}><b>{msg.senderId}</b>: {msg.text}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
