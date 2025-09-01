import { cn } from "@/lib/utils";

export default function ChatSidebar({ chats, activeChat, setActiveChat }) {
  return (
    <div className="w-1/4 border-r border-gray-200 bg-white">
      <h2 className="text-xl font-bold p-4 border-b">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={cn(
              "p-4 cursor-pointer hover:bg-gray-100 flex items-center gap-2",
              activeChat?.id === chat.id && "bg-gray-200"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                {chat.name[0]} 
             </div>
             <span>{chat.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
