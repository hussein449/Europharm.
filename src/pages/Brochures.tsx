import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Plus, 
  Download, 
  Edit, 
  Trash2, 
  Search,
  Upload 
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
import { Label } from "@/components/ui/label";

type BrochureType = {
  id: number;
  title: string;
  description: string;
  category: string;
  created: string;
  fileSize: string;
  downloadUrl: string;
  fileType?: string;
  fileData?: string;
};

const initialBrochures: BrochureType[] = [
  {
    id: 1,
    title: "Antibiotics Overview",
    description: "Complete guide to modern antibiotics and their applications",
    category: "Medications",
    created: "2023-10-15",
    fileSize: "3.2 MB",
    downloadUrl: "#",
    fileType: "pdf"
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

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
      
      setIsSupervisor(parsedUser.name === "admin");
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit");
        return;
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF and Word documents are supported");
        return;
      }

      setSelectedFile(file);
      
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      setNewBrochure(prev => ({
        ...prev,
        fileSize: `${fileSizeInMB} MB`,
        fileType: file.type.split('/')[1]
      }));
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedFile(null);
  };

  const handleAddBrochure = async () => {
    if (!newBrochure.title || !newBrochure.description || !newBrochure.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      const fileData = await fileToBase64(selectedFile);
      
      const newBrochureItem: BrochureType = {
        id: brochures.length > 0 ? Math.max(...brochures.map(b => b.id)) + 1 : 1,
        title: newBrochure.title || "",
        description: newBrochure.description || "",
        category: newBrochure.category || "",
        created: new Date().toISOString().split('T')[0],
        fileSize: newBrochure.fileSize || `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        downloadUrl: "#",
        fileType: newBrochure.fileType || selectedFile.type.split('/')[1],
        fileData: fileData
      };

      setBrochures([...brochures, newBrochureItem]);
      setNewBrochure({ title: "", description: "", category: "" });
      resetFileInput();
      toast.success("Brochure added successfully");
    } catch (error) {
      console.error("Error adding brochure:", error);
      toast.error("Failed to add brochure");
    }
  };

  const handleUpdateBrochure = () => {
    if (!editingBrochure) return;
    
    const updatedBrochures = brochures.map(brochure => 
      brochure.id === editingBrochure.id ? editingBrochure : brochure
    );
    
    setBrochures(updatedBrochures);
    setEditingBrochure(null);
    toast.success("Brochure updated successfully");
  };

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

  const handleDownload = (brochure: BrochureType) => {
    if (brochure.fileData) {
      const linkSource = brochure.fileData;
      const downloadLink = document.createElement("a");
      const fileName = `${brochure.title.replace(/\s+/g, '_')}.${brochure.fileType || 'pdf'}`;
      
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      toast.success(`Downloading ${brochure.title}...`);
    } else {
      toast.info(`Downloading ${brochure.title}...`);
    }
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
                      <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                      <Input
                        id="title"
                        value={newBrochure.title}
                        onChange={(e) => setNewBrochure({...newBrochure, title: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                      <Input
                        id="category"
                        value={newBrochure.category}
                        onChange={(e) => setNewBrochure({...newBrochure, category: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                      <Input
                        id="description"
                        value={newBrochure.description}
                        onChange={(e) => setNewBrochure({...newBrochure, description: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="file" className="text-sm font-medium">Upload File (PDF, DOC, DOCX)</Label>
                      <div className="flex items-center">
                        <Input
                          ref={fileInputRef}
                          id="file"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="mr-2"
                        >
                          <Upload size={16} className="mr-2" /> Select File
                        </Button>
                        <span className="text-sm text-gray-500">
                          {selectedFile ? `${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)` : "No file selected"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" onClick={resetFileInput}>Cancel</Button>
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

          <Card className="overflow-hidden">
            <CardHeader className="bg-white border-b py-4">
              <CardTitle className="text-lg font-semibold">Available Brochures</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isMobile ? (
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
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {brochure.fileType === 'pdf' ? (
                                <FileText size={16} className="mr-2 text-red-500" />
                              ) : (
                                <FileText size={16} className="mr-2 text-blue-500" />
                              )}
                              {brochure.title}
                            </div>
                          </TableCell>
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
