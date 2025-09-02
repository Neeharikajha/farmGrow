import ChatSidebar from "../components/chat_sidebar.jsx";
import ChatWindow from "../components/msg_ui.jsx";
import { useState } from "react";
import { io } from "socket.io-client";


const socket = io("http://localhost:5000");
export default function Chat() {
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return (
    <div className="flex h-screen w-screen">
      
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />

      <div className="flex-1">
        {activeChat ? (
          <ChatWindow chat={activeChat} socket={socket}/>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
