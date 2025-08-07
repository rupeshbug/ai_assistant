"use client";

import Link from "next/link";

export default function Sidebar() {
  const addChat = () => {
    console.log("New chat");
  };

  return (
    <aside className="w-[15%] h-[100vh] bg-[#181818] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 border-b-1 border-b-gray-600 text-center py-3">
        Your Chats
      </h2>
      <button
        onClick={addChat}
        className="mt-5 w-[90%] bg-[#212121] text-white py-2 rounded-md mx-auto cursor-pointer hover:bg-[#313131] transition"
      >
        + New Chat
      </button>
      <div className="mt-5 flex flex-col gap-2 w-[90%] mx-auto overflow-y-auto">
        {/* Chat list will be dynamic in next steps */}
        <Link
          href="/dashboard/chat/1"
          className="hover:bg-[#313131] p-2 rounded-md text-sm"
        >
          Chat 1
        </Link>
        <Link
          href="/dashboard/chat/2"
          className="hover:bg-[#313131] p-2 rounded-md transition text-sm"
        >
          Chat 2
        </Link>
      </div>
    </aside>
  );
}
