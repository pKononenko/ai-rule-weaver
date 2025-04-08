
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const Layout = ({ children, onLogout }: LayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold">AI Rule Weaver</h1>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={onLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </header>
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
