import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ChatbotWidget from "../ui/ChatbotWidget";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <ChatbotWidget /> 
        <Outlet />
      </main>
    </div>
  );
}