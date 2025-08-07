import { UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#212121]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat UI */}
      <main className=" mx-16 flex-1 items-cemter justify-center">
        <div className="py-3 flex items-center justify-between">
          <p>Assistant</p>
          <UserButton />
        </div>
        <div className="px-5 py-10">
          <div className="flex flex-col items-center bg-[#292929] w-[50%] mx-auto py-8 px-8 rounded-lg hover:scale-105 cursor-pointer transition-transform duration-300">
            <h1 className="text-2xl font-semibold mb-2">
              Welcome to your AI Assistant
            </h1>
            <p className="text-gray-300 mt-2 text-center">
              Create a new conversation or continue from your chat history in
              the sidebar. Your intelligent assistant is here to help you.
            </p>
            <div className="pt-4 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 group">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm group-hover:scale-110 transition-transform"></div>
                <span className="text-gray-300 font-medium">
                  Real-time responses
                </span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-sm group-hover:scale-110 transition-transform"></div>
                <span className="text-gray-300 font-medium">
                  Smart assistance
                </span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 shadow-sm group-hover:scale-110 transition-transform"></div>
                <span className="text-gray-300 font-medium">
                  Powerful tools
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
