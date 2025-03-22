
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, List, RefreshCw, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

const CyclesTable = () => {
  const [filters, setFilters] = useState({
    id: "",
    cycleName: "",
    cycleAltName: "",
    coefficientNumber: "",
    dateFrom: "",
    dateTo: "",
    cycleDays: ""
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilter = (field: string) => {
    setFilters(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cycle Name</TableHead>
              <TableHead>Cycle Alt Name</TableHead>
              <TableHead>Coefficient Number</TableHead>
              <TableHead>Date From</TableHead>
              <TableHead>Date To</TableHead>
              <TableHead>Cycle Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="relative">
                  <Input
                    value={filters.id}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    className="pr-8"
                  />
                  {filters.id && (
                    <button 
                      onClick={() => clearFilter("id")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <Input
                    value={filters.cycleName}
                    onChange={(e) => handleFilterChange("cycleName", e.target.value)}
                    className="pr-8"
                  />
                  {filters.cycleName && (
                    <button 
                      onClick={() => clearFilter("cycleName")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <Input
                    value={filters.cycleAltName}
                    onChange={(e) => handleFilterChange("cycleAltName", e.target.value)}
                    className="pr-8"
                  />
                  {filters.cycleAltName && (
                    <button 
                      onClick={() => clearFilter("cycleAltName")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <Input
                    value={filters.coefficientNumber}
                    onChange={(e) => handleFilterChange("coefficientNumber", e.target.value)}
                    className="pr-8"
                  />
                  {filters.coefficientNumber && (
                    <button 
                      onClick={() => clearFilter("coefficientNumber")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <Input
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                    className="pr-8"
                  />
                  {filters.dateFrom && (
                    <button 
                      onClick={() => clearFilter("dateFrom")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <Input
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                    className="pr-8"
                  />
                  {filters.dateTo && (
                    <button 
                      onClick={() => clearFilter("dateTo")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <Input
                    value={filters.cycleDays}
                    onChange={(e) => handleFilterChange("cycleDays", e.target.value)}
                    className="pr-8"
                  />
                  {filters.cycleDays && (
                    <button 
                      onClick={() => clearFilter("cycleDays")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
            {/* No records message */}
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <p className="text-gray-500">No records to view</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="border-t p-4 flex justify-between items-center text-sm">
        <div className="flex space-x-2">
          <button className="p-2 border rounded hover:bg-gray-50">
            <Plus className="h-4 w-4" />
          </button>
          <button className="p-2 border rounded hover:bg-gray-50">
            <Pencil className="h-4 w-4" />
          </button>
          <button className="p-2 border rounded hover:bg-gray-50">
            <List className="h-4 w-4" />
          </button>
          <button className="p-2 border rounded hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button disabled className="p-2 border rounded text-gray-300">
            <ChevronFirst className="h-4 w-4" />
          </button>
          <button disabled className="p-2 border rounded text-gray-300">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-gray-600">Page 0 of 0</span>
          <button disabled className="p-2 border rounded text-gray-300">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button disabled className="p-2 border rounded text-gray-300">
            <ChevronLast className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CyclesTable;
