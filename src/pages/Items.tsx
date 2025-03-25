
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ItemsTable from "@/components/items/ItemsTable";
import { toast } from "sonner";

const Items = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
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
      setUsername(parsedUser.name || "");
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username={username} />
        <main className="flex-1 overflow-x-auto overflow-y-auto p-4">
          <ItemsTable />
        </main>
      </div>
    </div>
  );
};

export default Items;
