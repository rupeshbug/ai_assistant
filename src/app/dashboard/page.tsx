"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-[280px] h-full bg-gray-100 border-r p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Your Chats</h2>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {/* Chat list will be dynamic in next steps */}
        <Link
          href="/dashboard/chat/1"
          className="hover:bg-gray-200 p-2 rounded"
        >
          Chat 1
        </Link>
        <Link
          href="/dashboard/chat/2"
          className="hover:bg-gray-200 p-2 rounded"
        >
          Chat 2
        </Link>
      </div>

      <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition">
        + New Chat
      </button>
    </aside>
  );
}
