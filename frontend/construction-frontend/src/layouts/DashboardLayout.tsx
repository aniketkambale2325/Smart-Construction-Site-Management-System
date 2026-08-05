import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[280px]">
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

        <main className="min-h-[calc(100vh-72px)] p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <ChatbotWidget />
    </div>
  );
}
