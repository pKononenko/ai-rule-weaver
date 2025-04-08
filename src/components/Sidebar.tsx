
import { Link, useLocation } from "react-router-dom";
import { Database, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    {
      name: "Model Training",
      href: "/dashboard",
      icon: Database,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: location.pathname === "/settings",
    },
  ];

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="flex items-center justify-center h-12 mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                item.current
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
                "group flex items-center px-3 py-3 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className={cn(
                  item.current
                    ? "text-gray-900"
                    : "text-gray-500 group-hover:text-gray-900",
                  "mr-3 flex-shrink-0 h-5 w-5"
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
