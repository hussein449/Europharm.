
import { useState } from "react";
import { 
  Search, 
  Users, 
  MapPin, 
  Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { toast } from "sonner";

type ReportButton = {
  title: string;
  icon: React.ElementType;
  onClick: () => void;
};

const Reports = () => {
  const [activeReport, setActiveReport] = useState<string | null>(null);

  const reportButtons: ReportButton[] = [
    {
      title: "Visit Tracking",
      icon: Search,
      onClick: () => {
        setActiveReport("Visit Tracking");
        toast.info("Visit Tracking report selected");
      },
    },
    {
      title: "Users Attendance",
      icon: Users,
      onClick: () => {
        setActiveReport("Users Attendance");
        toast.info("Users Attendance report selected");
      },
    },
    {
      title: "Customer Coverage",
      icon: MapPin,
      onClick: () => {
        setActiveReport("Customer Coverage");
        toast.info("Customer Coverage report selected");
      },
    },
    {
      title: "Weekly Reports",
      icon: Calendar,
      onClick: () => {
        setActiveReport("Weekly Reports");
        toast.info("Weekly Reports report selected");
      },
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username="Hussein Nasreddine" />
        <main className="flex-1 overflow-x-auto overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
            <p className="text-gray-600">Select a report type to view or generate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportButtons.map((button) => (
              <Button
                key={button.title}
                onClick={button.onClick}
                variant={activeReport === button.title ? "default" : "outline"}
                className={`h-24 flex flex-col items-center justify-center gap-2 ${
                  activeReport === button.title 
                    ? "bg-[#3498db] hover:bg-[#2980b9]" 
                    : "hover:border-[#3498db] hover:text-[#3498db]"
                }`}
              >
                <button.icon className="w-6 h-6" />
                <span>{button.title}</span>
              </Button>
            ))}
          </div>

          {activeReport && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{activeReport}</h2>
              <p className="text-gray-600">
                This is a placeholder for the {activeReport.toLowerCase()} content.
                In a production environment, this would display the actual report data.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Reports;
