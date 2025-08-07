import { UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#212121] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat UI */}
      <main className="flex-1 px-10 py-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">Assistant</h1>
          <UserButton />
        </div>

        {/* Welcome Card */}
        <div className="flex flex-col items-center bg-[#292929] w-full max-w-xl mx-auto py-10 px-8 rounded-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-semibold mb-3">
            Welcome to your AI Assistant
          </h2>
          <p className="text-gray-300 text-center text-sm leading-relaxed">
            Start a new conversation or continue from your chat history in the
            sidebar. Your intelligent assistant is here to help.
          </p>

          {/* Features */}
          <div className="pt-6 flex gap-4 text-sm">
            <div className="flex items-center gap-2 group">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 font-medium">
                Real-time responses
              </span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-sm group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 font-medium">
                Smart assistance
              </span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 shadow-sm group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 font-medium">Powerful tools</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
