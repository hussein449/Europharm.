
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Plus, 
  Download, 
  Edit, 
  Trash2, 
  Search 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

// Type definitions
type BrochureType = {
  id: number;
  title: string;
  description: string;
  category: string;
  created: string;
  fileSize: string;
  downloadUrl: string;
};

// Sample data
const initialBrochures: BrochureType[] = [
  {
    id: 1,
    title: "Antibiotics Overview",
    description: "Complete guide to modern antibiotics and their applications",
    category: "Medications",
    created: "2023-10-15",
    fileSize: "3.2 MB",
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Cardiovascular Treatments",
    description: "Latest treatments and medications for cardiovascular diseases",
    category: "Cardiology",
    created: "2023-11-05",
    fileSize: "4.7 MB",
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Pain Management Solutions",
    description: "Comprehensive overview of pain management medications",
    category: "Analgesics",
    created: "2023-12-01",
    fileSize: "2.9 MB",
    downloadUrl: "#",
  },
  {
    id: 4,
    title: "Vaccine Information",
    description: "Detailed information about available vaccines and protocols",
    category: "Immunization",
    created: "2024-01-10",
    fileSize: "5.1 MB",
    downloadUrl: "#",
  },
  {
    id: 5,
    title: "Diabetes Management",
    description: "Guide to medications and treatments for diabetes patients",
    category: "Endocrinology",
    created: "2024-02-22",
    fileSize: "3.8 MB",
    downloadUrl: "#",
  }
];

const Brochures = () => {
  const navigate = useNavigate();
  const [brochures, setBrochures] = useState<BrochureType[]>(initialBrochures);
  const [filteredBrochures, setFilteredBrochures] = useState<BrochureType[]>(initialBrochures);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");
  const [isSupervior, setIsSupervisor] = useState(false);
  const [brochureToDelete, setBrochureToDelete] = useState<BrochureType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newBrochure, setNewBrochure] = useState<Partial<BrochureType>>({
    title: "",
    description: "",
    category: "",
  });
  const [editingBrochure, setEditingBrochure] = useState<BrochureType | null>(null);
  const isMobile = useIsMobile();

  // Check if user is logged in and get username
  useEffect(() => {
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
      
      // This is just for demo purposes - in a real app, you'd check user roles from your backend
      // Assuming "admin" is a supervisor for demonstration
      setIsSupervisor(parsedUser.name === "admin");
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = brochures.filter(
        brochure => 
          brochure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          brochure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          brochure.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBrochures(filtered);
    } else {
      setFilteredBrochures(brochures);
    }
  }, [searchTerm, brochures]);

  // Handle adding a new brochure
  const handleAddBrochure = () => {
    if (!newBrochure.title || !newBrochure.description || !newBrochure.category) {
      toast.error("Please fill in all fields");
      return;
    }

    const newBrochureItem: BrochureType = {
      id: brochures.length > 0 ? Math.max(...brochures.map(b => b.id)) + 1 : 1,
      title: newBrochure.title || "",
      description: newBrochure.description || "",
      category: newBrochure.category || "",
      created: new Date().toISOString().split('T')[0],
      fileSize: "0.5 MB", // Placeholder
      downloadUrl: "#"
    };

    setBrochures([...brochures, newBrochureItem]);
    setNewBrochure({ title: "", description: "", category: "" });
    toast.success("Brochure added successfully");
  };

  // Handle editing a brochure
  const handleUpdateBrochure = () => {
    if (!editingBrochure) return;
    
    const updatedBrochures = brochures.map(brochure => 
      brochure.id === editingBrochure.id ? editingBrochure : brochure
    );
    
    setBrochures(updatedBrochures);
    setEditingBrochure(null);
    toast.success("Brochure updated successfully");
  };

  // Handle deleting a brochure
  const handleDeleteBrochure = () => {
    if (!brochureToDelete) return;
    
    const updatedBrochures = brochures.filter(
      brochure => brochure.id !== brochureToDelete.id
    );
    
    setBrochures(updatedBrochures);
    setBrochureToDelete(null);
    setIsDeleteDialogOpen(false);
    toast.success("Brochure deleted successfully");
  };

  // Handle download (in a real app, this would download the actual file)
  const handleDownload = (brochure: BrochureType) => {
    toast.info(`Downloading ${brochure.title}...`);
    // In a real app, this would trigger the file download
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username={username} />
        <main className="flex-1 overflow-x-auto overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Brochures</h1>
            <p className="text-gray-600">Browse, download and manage medical brochures</p>
          </div>

          {/* Search and Add Button Row */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search brochures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {isSupervior && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#3498db] hover:bg-[#2980b9]">
                    <Plus size={18} className="mr-2" /> Add Brochure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Brochure</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium">Title</label>
                      <Input
                        id="title"
                        value={newBrochure.title}
                        onChange={(e) => setNewBrochure({...newBrochure, title: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="category" className="text-sm font-medium">Category</label>
                      <Input
                        id="category"
                        value={newBrochure.category}
                        onChange={(e) => setNewBrochure({...newBrochure, category: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="text-sm font-medium">Description</label>
                      <Input
                        id="description"
                        value={newBrochure.description}
                        onChange={(e) => setNewBrochure({...newBrochure, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                      className="bg-[#3498db] hover:bg-[#2980b9]"
                      onClick={handleAddBrochure}
                    >
                      Add Brochure
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Brochures Table/Card View */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-white border-b py-4">
              <CardTitle className="text-lg font-semibold">Available Brochures</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isMobile ? (
                // Mobile view - cards
                <div className="divide-y">
                  {filteredBrochures.map((brochure) => (
                    <div key={brochure.id} className="p-4 bg-white hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{brochure.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{brochure.description}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2">
                              {brochure.category}
                            </span>
                            <span>{brochure.created}</span>
                            <span className="mx-2">•</span>
                            <span>{brochure.fileSize}</span>
                          </div>
                        </div>
                        <div className="flex">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(brochure)}
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <Download size={18} />
                          </Button>
                          
                          {isSupervior && (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-amber-600"
                                    onClick={() => setEditingBrochure(brochure)}
                                  >
                                    <Edit size={18} />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Brochure</DialogTitle>
                                  </DialogHeader>
                                  {editingBrochure && (
                                    <div className="grid gap-4 py-4">
                                      <div className="grid gap-2">
                                        <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                                        <Input
                                          id="edit-title"
                                          value={editingBrochure.title}
                                          onChange={(e) => setEditingBrochure({
                                            ...editingBrochure,
                                            title: e.target.value
                                          })}
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
                                        <Input
                                          id="edit-category"
                                          value={editingBrochure.category}
                                          onChange={(e) => setEditingBrochure({
                                            ...editingBrochure,
                                            category: e.target.value
                                          })}
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                                        <Input
                                          id="edit-description"
                                          value={editingBrochure.description}
                                          onChange={(e) => setEditingBrochure({
                                            ...editingBrochure,
                                            description: e.target.value
                                          })}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button 
                                      className="bg-amber-500 hover:bg-amber-600"
                                      onClick={handleUpdateBrochure}
                                    >
                                      Update Brochure
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-500 hover:text-red-600"
                                onClick={() => {
                                  setBrochureToDelete(brochure);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 size={18} />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Desktop view - table
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBrochures.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No brochures found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBrochures.map((brochure) => (
                        <TableRow key={brochure.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{brochure.title}</TableCell>
                          <TableCell>
                            <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
                              {brochure.category}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-md truncate">{brochure.description}</TableCell>
                          <TableCell>{brochure.created}</TableCell>
                          <TableCell>{brochure.fileSize}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(brochure)}
                                className="text-gray-500 hover:text-blue-600"
                              >
                                <Download size={18} />
                              </Button>
                              
                              {isSupervior && (
                                <>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-amber-600"
                                        onClick={() => setEditingBrochure(brochure)}
                                      >
                                        <Edit size={18} />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Brochure</DialogTitle>
                                      </DialogHeader>
                                      {editingBrochure && (
                                        <div className="grid gap-4 py-4">
                                          <div className="grid gap-2">
                                            <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                                            <Input
                                              id="edit-title"
                                              value={editingBrochure.title}
                                              onChange={(e) => setEditingBrochure({
                                                ...editingBrochure,
                                                title: e.target.value
                                              })}
                                            />
                                          </div>
                                          <div className="grid gap-2">
                                            <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
                                            <Input
                                              id="edit-category"
                                              value={editingBrochure.category}
                                              onChange={(e) => setEditingBrochure({
                                                ...editingBrochure,
                                                category: e.target.value
                                              })}
                                            />
                                          </div>
                                          <div className="grid gap-2">
                                            <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                                            <Input
                                              id="edit-description"
                                              value={editingBrochure.description}
                                              onChange={(e) => setEditingBrochure({
                                                ...editingBrochure,
                                                description: e.target.value
                                              })}
                                            />
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button 
                                          className="bg-amber-500 hover:bg-amber-600"
                                          onClick={handleUpdateBrochure}
                                        >
                                          Update Brochure
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-red-600"
                                    onClick={() => {
                                      setBrochureToDelete(brochure);
                                      setIsDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 size={18} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Are you sure you want to delete "{brochureToDelete?.title}"?</p>
                <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleDeleteBrochure}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Brochures;
