"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Chat = {
  id: string;
  createdAt: string;
  title: string;
};

export default function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch("/api/chat/list");
      const data = await res.json();
      setChats(data);
    };

    fetchChats();
  }, []);

  // Create new chat
  const createChat = async () => {
    const res = await fetch("/api/chat/new", {
      method: "POST",
    });
    const newChat = await res.json();
    setChats((prev) => [newChat, ...prev]);
  };

  // Delete chat
  const deleteChat = async (chatId: string) => {
    await fetch(`/api/chat/${chatId}`, { method: "DELETE" });
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  return (
    <aside className="w-[15%] h-[100vh] bg-[#181818] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 border-b-1 border-b-gray-600 text-center py-3">
        Your Chats
      </h2>
      <button
        onClick={createChat}
        className="mt-5 w-[90%] bg-[#212121] text-white py-2 rounded-md mx-auto cursor-pointer hover:bg-[#313131] transition"
      >
        + New Chat
      </button>

      <div className="mt-5 flex flex-col gap-2 w-[90%] mx-auto overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex justify-between items-center group bg-[#212121] text-white rounded-md px-3 py-2 hover:bg-[#313131] transition text-sm"
          >
            <Link
              href={`/dashboard/chat/${chat.id}`}
              className="truncate w-[80%]"
            >
              {chat.title}
            </Link>
            <button
              onClick={() => deleteChat(chat.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400"
            >
              <Trash2 className="cursor-pointer" size={16} />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
