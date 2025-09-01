import { useState } from "react";

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([
    { sender: "them", text: "Hey there!" },
    { sender: "me", text: "Hello 👋" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "me", text: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
     
      <div className="p-4 border-b font-semibold flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
            {chat.name[0]}
        </div>
        {chat.name}
        </div>


     
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs p-2 rounded-lg ${
              msg.sender === "me"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

     
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
