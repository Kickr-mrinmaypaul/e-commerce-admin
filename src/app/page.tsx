import Image from "next/image";
import SideNavbar from "@/components/SideNavbar";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F5F7]">
      <Dashboard/>
    </main>
  );
}
