
import { useState } from "react";
import { FileText, Users, UserPlus, Package, Archive, BarChart, FileBarChart, BarChart2, CircleDollarSign, ClipboardList } from "lucide-react";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  isActive?: boolean;
  subItems?: string[];
};

const menuItems: MenuItem[] = [
  { title: "General", icon: FileText },
  { title: "Brochures", icon: ClipboardList },
  { title: "Users", icon: Users },
  { title: "Customers", icon: UserPlus },
  { title: "Items", icon: Package },
  { title: "Sample Stock", icon: Archive },
  { title: "Cycles", icon: BarChart, isActive: true, subItems: ["Cycles"] },
  { title: "Reports", icon: FileBarChart },
  { title: "Sales Transactions", icon: CircleDollarSign },
  { title: "Surveys", icon: BarChart2 },
  { title: "Collections", icon: Package }
];

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>("Cycles");

  const toggleExpand = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <aside className="w-64 bg-[#2c3e50] text-white flex flex-col">
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
          <p className="font-medium">Hussein Nasreddine</p>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {menuItems.map((item) => (
            <li key={item.title} className="mb-1">
              <button
                onClick={() => toggleExpand(item.title)}
                className={`flex items-center w-full py-3 px-5 text-left hover:bg-[#34495e] ${
                  item.isActive ? "bg-[#34495e]" : ""
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.title}</span>
              </button>
              
              {expandedItem === item.title && item.subItems && (
                <ul className="bg-[#243342]">
                  {item.subItems.map((subItem) => (
                    <li key={subItem}>
                      <a 
                        href="#" 
                        className="block py-2 px-12 hover:bg-[#1c2a38] text-gray-300"
                      >
                        {subItem}
                      </a>
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
