
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

type CustomerItemProps = {
  title: string;
}

const CustomerItem = ({ title }: CustomerItemProps) => {
  // Special case for Customers page to include an update button
  if (title === "Customers") {
    return (
      <div className="flex items-center justify-between w-full py-2 px-12 hover:bg-[#1c2a38] text-gray-300">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-2 opacity-70" />
          <span>{title}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-xs text-gray-300 hover:text-white hover:bg-[#34495e]"
          onClick={(e) => {
            e.stopPropagation();
            alert("Update customer information");
          }}
        >
          <Edit className="w-3 h-3 mr-1" />
          Update
        </Button>
      </div>
    );
  }

  return null;
};

export default CustomerItem;
