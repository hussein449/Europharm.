
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Users, 
  UserPlus, 
  Package, 
  Archive, 
  BarChart, 
  FileBarChart, 
  BarChart2, 
  CircleDollarSign, 
  ClipboardList,
  Folder,
  ListFilter,
  Calendar,
  Map,
  User,
  UserCog,
  Box,
  ArrowLeftRight,
  Search,
  MapPin,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomerItem from "./CustomerItem";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  isActive?: boolean;
  link?: string;
  subItems?: { title: string; icon: React.ElementType; link?: string }[];
};

const menuItems: MenuItem[] = [
  { 
    title: "General", 
    icon: FileText,
    subItems: [
      { title: "Divisions", icon: Folder },
      { title: "Reasons", icon: ListFilter },
      { title: "Events", icon: Calendar },
      { title: "Areas", icon: Map }
    ]
  },
  { title: "Brochures", icon: ClipboardList },
  { 
    title: "Users", 
    icon: Users 
  },
  { 
    title: "Customers", 
    icon: UserPlus,
    subItems: [
      { title: "Customers", icon: User },
      { title: "Specialists", icon: UserCog },
      { title: "New Customers", icon: UserPlus }
    ]
  },
  { title: "Items", icon: Package },
  { 
    title: "Sample Stock", 
    icon: Archive,
    subItems: [
      { title: "Sample Stock", icon: Box },
      { title: "Sample Movements", icon: ArrowLeftRight }
    ]
  },
  { title: "Cycles", icon: BarChart, isActive: true, subItems: [{ title: "Cycles", icon: BarChart }] },
  { title: "Reports", icon: FileBarChart, link: "/reports" },
  { title: "Sales Transactions", icon: CircleDollarSign },
  { title: "Surveys", icon: BarChart2 },
  { title: "Collections", icon: Package }
];

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>("Cycles");
  const [username, setUsername] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUsername(parsedUser.name || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const toggleExpand = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // For mobile: sidebar is hidden by default and shown when menu button is clicked
  if (isMobile) {
    return (
      <>
        <button 
          onClick={toggleMobileMenu} 
          className="fixed top-4 left-4 z-50 bg-[#2c3e50] text-white p-2 rounded-md shadow-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <aside 
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#2c3e50] text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5 border-b border-gray-700 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <img 
                src="/lovable-uploads/fb2e9ecc-50ec-4f86-abca-9d91fb58aad3.png" 
                alt="Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <p className="text-xs opacity-80">Welcome,</p>
              <p className="font-medium">{username}</p>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-4">
              {menuItems.map((item) => (
                <li key={item.title} className="mb-1">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className={`flex items-center w-full py-3 px-5 text-left hover:bg-[#34495e] ${
                        item.isActive ? "bg-[#34495e]" : ""
                      }`}
                      onClick={() => isMobile && setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={`flex items-center w-full py-3 px-5 text-left hover:bg-[#34495e] ${
                        item.isActive ? "bg-[#34495e]" : ""
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.title}</span>
                    </button>
                  )}
                  
                  {expandedItem === item.title && item.subItems && (
                    <ul className="bg-[#243342]">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.title}>
                          {subItem.title === "Customers" ? (
                            <CustomerItem title={subItem.title} />
                          ) : (
                            <a 
                              href="#" 
                              className="block py-2 px-12 hover:bg-[#1c2a38] text-gray-300 flex items-center"
                              onClick={() => isMobile && setMobileMenuOpen(false)}
                            >
                              <subItem.icon className="w-4 h-4 mr-2 opacity-70" />
                              {subItem.title}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile close button at the bottom */}
          <div className="p-4 border-t border-gray-700">
            <button 
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-full py-2 bg-[#34495e] hover:bg-[#1c2a38] rounded text-sm transition-colors"
            >
              <X size={16} className="mr-2" />
              Close Menu
            </button>
          </div>
        </aside>
      </>
    );
  }

  // Desktop version remains largely the same
  return (
    <aside className="w-64 bg-[#2c3e50] text-white flex flex-col h-screen">
      <div className="p-5 border-b border-gray-700 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <img 
            src="/lovable-uploads/fb2e9ecc-50ec-4f86-abca-9d91fb58aad3.png" 
            alt="Logo" 
            className="h-8 w-8 object-contain"
          />
        </div>
        <div>
          <p className="text-xs opacity-80">Welcome,</p>
          <p className="font-medium">{username}</p>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {menuItems.map((item) => (
            <li key={item.title} className="mb-1">
              {item.link ? (
                <Link
                  to={item.link}
                  className={`flex items-center w-full py-3 px-5 text-left hover:bg-[#34495e] ${
                    item.isActive ? "bg-[#34495e]" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              ) : (
                <button
                  onClick={() => toggleExpand(item.title)}
                  className={`flex items-center w-full py-3 px-5 text-left hover:bg-[#34495e] ${
                    item.isActive ? "bg-[#34495e]" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </button>
              )}
              
              {expandedItem === item.title && item.subItems && (
                <ul className="bg-[#243342]">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.title}>
                      {subItem.title === "Customers" ? (
                        <CustomerItem title={subItem.title} />
                      ) : (
                        <a 
                          href="#" 
                          className="block py-2 px-12 hover:bg-[#1c2a38] text-gray-300 flex items-center"
                        >
                          <subItem.icon className="w-4 h-4 mr-2 opacity-70" />
                          {subItem.title}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
