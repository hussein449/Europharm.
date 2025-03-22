
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 mr-2">{username}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
