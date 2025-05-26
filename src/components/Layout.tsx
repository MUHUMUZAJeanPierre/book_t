import { useDarkMode } from "../context/DarkModeContext";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";
import { Outlet } from "react-router-dom";
import { ReactNode, useState } from "react";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { darkMode } = useDarkMode(); 

  return (
    <div className={` ${darkMode ? "bg-[#101828] text-white" : "bg-white text-gray-900"}`}>
      <TopNavigation toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex min-h-screen  ">
        <Sidebar user={{ name: "Eric", role: "admin", profilePic: "path/to/image.jpg" }} />
        <div className="flex-1 p-5 pt-10 md:ml-52">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
