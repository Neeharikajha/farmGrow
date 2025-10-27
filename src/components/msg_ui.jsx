
import { useState, useEffect, useRef } from "react";

export default function ChatWindow({ chat, socket, userId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (
        (msg.senderId === userId && msg.receiverId === chat.id) ||
        (msg.senderId === chat.id && msg.receiverId === userId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [chat, userId]);

  const sendMessage = () => {
     if (!text.trim()) return;

  const newMsg = {
    senderId: userId,
    receiverId: chat.id,
    text,
  };

  // Send to backend
  socket.emit("sendMessage", newMsg);

  // Show instantly on your screen
  setMessages((prev) => [...prev, newMsg]);

  setText("");

  console.log("Sending message:", newMsg);

  };

  useEffect(() => {
  if (!chat?.id) return;

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/messages/${userId}/${chat.id}`
      );
      const data = await res.json();
      setMessages(data); // populate messages state
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  fetchMessages();
}, [chat, userId]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.senderId === userId
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
