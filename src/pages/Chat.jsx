
//// way to correct, DO NOT CHANGE
// import ChatSidebar from "../components/chat_sidebar.jsx";
// import ChatWindow from "../components/msg_ui.jsx";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket","polling"],
//   withCredentials: true,
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   reconnectionDelay: 1000,
// });

// // ✅ Debug connection lifecycle (good for testing stability)
// socket.on("connect", () => {
//   console.log("🟢 Connected to server with socket ID:", socket.id);
// });

// socket.on("disconnect", (reason) => {
//   console.log("🔴 Disconnected from server:", reason);
// });

// socket.on("reconnect_attempt", (attempt) => {
//   console.log(`🔁 Reconnecting attempt ${attempt}...`);
// });

// socket.on("reconnect", (attempt) => {
//   console.log(`✅ Successfully reconnected after ${attempt} attempts`);
// });

// export default function Chat() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [userId, setUserId] = useState("1"); // mock logged-in user ID

//   const chats = [
//     { id: 1, name: "Alice" },
//     { id: 2, name: "Bob" },
//     { id: 3, name: "Charlie" },
//   ];

//   useEffect(() => {
//      const registerUser = () => {
//       console.log("🪪 Registering user:", userId);
//       socket.emit("register", userId);
//     };

//     registerUser(); // Register immediately on first load

//     socket.on("connect", registerUser); 
//       return () => {
//       socket.off("connect", registerUser);
//       socket.disconnect();
//     };
//   }, [userId]);

//   return (
//     <div className="flex h-screen w-screen">
//       <ChatSidebar
//         chats={chats}
//         activeChat={activeChat}
//         setActiveChat={setActiveChat}
//       />

//       <div className="flex-1">
//         {activeChat ? (
//           <ChatWindow chat={activeChat} socket={socket} userId={userId} />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import ChatSidebar from "../components/chat_sidebar.jsx";
import ChatWindow from "../components/msg_ui.jsx";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// ✅ Create socket connection
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

// ✅ Debug connection lifecycle
socket.on("connect", () => {
  console.log("🟢 Connected to server with socket ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Disconnected from server:", reason);
});

socket.on("reconnect_attempt", (attempt) => {
  console.log(`🔁 Reconnecting attempt ${attempt}...`);
});

socket.on("reconnect", (attempt) => {
  console.log(`✅ Successfully reconnected after ${attempt} attempts`);
});

export default function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [userId, setUserId] = useState("1"); // mock logged-in user ID

  const chats = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  useEffect(() => {
    // 🪪 Register user when connected or reconnected
    const registerUser = () => {
      console.log("🪪 Registering user:", userId);
      socket.emit("register", userId);
    };

    // Register on connect
    socket.on("connect", registerUser);
    socket.on("reconnect", registerUser);

    // 🧠 Detect browser wake-up or tab refocus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("🌞 Tab woke up — forcing socket reconnect...");
        if (!socket.connected) {
          socket.connect();
        }
      }
    };

    window.addEventListener("focus", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      socket.off("connect", registerUser);
      socket.off("reconnect", registerUser);
      window.removeEventListener("focus", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId]);

  return (
    <div className="flex h-screen w-screen">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />

      <div className="flex-1">
        {activeChat ? (
          <ChatWindow chat={activeChat} socket={socket} userId={userId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
