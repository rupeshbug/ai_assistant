import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat UI */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Welcome to your AI Assistant</h1>
        <p className="text-gray-600 mt-2">
          Select a chat or start a new one to begin.
        </p>
      </main>
    </div>
  );
}
