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



// import ChatSidebar from "../components/chat_sidebar.jsx";
// import ChatWindow from "../components/msg_ui.jsx";
// import { useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function Chat() {
//   const [activeChat, setActiveChat] = useState(null);

//   // Enhanced chat data with farmer-specific context
//   const chats = [
//     { 
//       id: 1, 
//       name: "Rajesh Kumar", 
//       type: "buyer",
//       lastMessage: "Interested in your tomatoes",
//       timestamp: "2 min ago",
//       status: "continued",
//       unreadCount: 3,
//       location: "Delhi",
//       crop: "Tomatoes"
//     },
//     { 
//       id: 2, 
//       name: "Priya Sharma", 
//       type: "supplier",
//       lastMessage: "Seeds delivery confirmed",
//       timestamp: "1 hour ago",
//       status: "new",
//       unreadCount: 0,
//       location: "Mumbai",
//       crop: "Seeds"
//     },
//     { 
//       id: 3, 
//       name: "Amit Singh", 
//       type: "buyer",
//       lastMessage: "What's your wheat price?",
//       timestamp: "3 hours ago",
//       status: "continued",
//       unreadCount: 1,
//       location: "Pune",
//       crop: "Wheat"
//     },
//   ];

//   return (
//     <div className="flex h-screen w-screen bg-gray-50">
//       {/* Header Bar */}
//       <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-10 shadow-sm">
//         <div className="flex items-center justify-between h-full px-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
//               <span className="text-white font-bold text-lg">🌾</span>
//             </div>
//             <div>
//               <h1 className="text-gray-900 font-semibold text-xl">FarmConnect</h1>
//               <p className="text-gray-500 text-sm">Farmer Dashboard</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-green-700 text-sm font-medium">Online</span>
//             </div>
//             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
//               <span className="text-gray-600 text-lg">👨‍🌾</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex w-full pt-16">
//         {/* Enhanced Sidebar */}
//         <div className="w-96 bg-white border-r border-gray-200 shadow-sm">
//           <div className="p-6 border-b border-gray-100">
//             <h2 className="text-gray-900 font-semibold text-xl mb-4">Messages</h2>
//             <div className="flex space-x-2">
//               <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg border border-green-200 font-medium">
//                 All Chats
//               </span>
//               <span className="px-4 py-2 bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors">
//                 Buyers
//               </span>
//               <span className="px-4 py-2 bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors">
//                 Suppliers
//               </span>
//             </div>
//           </div>

//           <div className="overflow-y-auto h-full">
//             {chats.map((chat, index) => (
//               <div
//                 key={chat.id}
//                 onClick={() => setActiveChat(chat)}
//                 className={`p-6 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
//                   activeChat?.id === chat.id ? 'bg-green-50 border-r-4 border-r-green-500' : ''
//                 } ${index !== chats.length - 1 ? 'border-b border-gray-100' : ''}`}
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="relative flex-shrink-0">
//                     <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
//                       <span className="text-white font-semibold text-lg">
//                         {chat.name.charAt(0)}
//                       </span>
//                     </div>
//                     {chat.status === 'new' && (
//                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
//                     )}
//                   </div>
                  
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center space-x-3">
//                         <h3 className="text-gray-900 font-semibold text-lg">
//                           {chat.name}
//                         </h3>
//                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${
//                           chat.type === 'buyer' 
//                             ? 'bg-blue-100 text-blue-700 border border-blue-200' 
//                             : 'bg-orange-100 text-orange-700 border border-orange-200'
//                         }`}>
//                           {chat.type.charAt(0).toUpperCase() + chat.type.slice(1)}
//                         </span>
//                       </div>
                      
//                       <div className="flex items-center space-x-3">
//                         <span className="text-gray-500 text-sm">{chat.timestamp}</span>
//                         {chat.unreadCount > 0 && (
//                           <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
//                             <span className="text-white text-xs font-semibold">{chat.unreadCount}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-4 mb-3">
//                       <span className="text-gray-500 text-sm flex items-center space-x-1">
//                         <span>📍</span>
//                         <span>{chat.location}</span>
//                       </span>
//                       <span className="text-gray-500 text-sm flex items-center space-x-1">
//                         <span>🌱</span>
//                         <span>{chat.crop}</span>
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <p className="text-gray-600 text-sm flex-1 mr-4">
//                         {chat.lastMessage}
//                       </p>
//                       <div className="flex-shrink-0">
//                         {chat.status === 'continued' ? (
//                           <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
//                             Continued
//                           </span>
//                         ) : (
//                           <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
//                             New Chat
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Chat Window */}
//         <div className="flex-1 flex flex-col">
//           {activeChat ? (
//             <>
//               {/* Chat Header */}
//               <div className="h-20 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
//                     <span className="text-white font-semibold text-lg">{activeChat.name.charAt(0)}</span>
//                   </div>
//                   <div>
//                     <div className="flex items-center space-x-3 mb-1">
//                       <h3 className="text-gray-900 font-semibold text-xl">{activeChat.name}</h3>
//                       <span className={`px-3 py-1 text-xs font-medium rounded-full ${
//                         activeChat.type === 'buyer' 
//                           ? 'bg-blue-100 text-blue-700 border border-blue-200' 
//                           : 'bg-orange-100 text-orange-700 border border-orange-200'
//                       }`}>
//                         {activeChat.type.charAt(0).toUpperCase() + activeChat.type.slice(1)}
//                       </span>
//                       {activeChat.status === 'new' && (
//                         <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
//                           New Conversation
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center space-x-4 text-gray-500 text-sm">
//                       <span className="flex items-center space-x-1">
//                         <span>📍</span>
//                         <span>{activeChat.location}</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <span>🌱</span>
//                         <span>{activeChat.crop}</span>
//                       </span>
//                       <span className="flex items-center space-x-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <span>Online</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Chat Window Component */}
//               <div className="flex-1 bg-gray-50">
//                 <ChatWindow chat={activeChat} socket={socket} />
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-white">
//               <div className="text-center max-w-md">
//                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
//                   <span className="text-4xl">💬</span>
//                 </div>
//                 <h3 className="text-gray-900 font-semibold text-2xl mb-3">Welcome to FarmConnect</h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">Select a conversation to start messaging with buyers and suppliers. Manage your agricultural business communications efficiently.</p>
//                 <div className="flex items-center justify-center space-x-6 text-gray-500 text-sm">
//                   <span className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                     <span>New Chats</span>
//                   </span>
//                   <span className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                     <span>Continued Chats</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
