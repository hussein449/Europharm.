
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import CyclesTable from "@/components/dashboard/CyclesTable";
import Header from "@/components/dashboard/Header";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("Please login to continue");
      navigate("/");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      if (!parsedUser.isAuthenticated) {
        navigate("/");
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username={user?.name || ""} />
        <main className="flex-1 overflow-x-auto overflow-y-auto p-4">
          <CyclesTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
