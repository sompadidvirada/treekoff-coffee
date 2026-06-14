import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  MapPin,
  MoreHorizontal,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  LayoutGrid,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CreateBranchDialog from "./CreateBranchDialog";
import EditBranchDialog from "./EditBranchDialog";
import { deleteBranch, getAllBranchess, getAllProvince } from "api/branches";
import { toast } from "sonner";
import EditQcScore from "./EditQcScore";

const ManageBranches = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [branchess, setBranchess] = useState([]);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    const faecthProvince = async () => {
      try {
        const ress = await getAllProvince();
        setProvinces(ress.data);
      } catch (err) {
        console.log(err);
      }
    };

    faecthProvince();
  }, []);

  useEffect(() => {
    const fecthAllBranches = async () => {
      try {
        const ress = await getAllBranchess(itemsPerPage, currentPage);
        setBranchess(ress.data.data);
        setTotalCount(ress.data.total_count);
      } catch (err) {
        console.log(err);
      }
    };

    fecthAllBranches();
  }, [currentPage]);

  // Then inside your JSX:

  // Mock Data

  // 1. Filter Logic

  const filteredBranches = useMemo(() => {
    if (selectedProvince === "all") return branchess;
    return branchess.filter((b) => b.province_id === selectedProvince);
  }, [selectedProvince, branchess]);

  // 2. Pagination Logic
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(null);

  const handleEditClick = (branch) => {
    setActiveBranch(branch);
    setIsEditOpen(true);
    console.log(isEditOpen);
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      await deleteBranch(id);
      toast.success(`ລົບ "${name}"ສຳເລັດ`);
      setBranchess((prev) => prev.filter((item) => item.id != id));
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`);
    }
  };

  //getting star fucntion

  const getStarCount = (score: number) => {
    if (score >= 98) return 5;
    if (score >= 95) return 4;
    if (score >= 90) return 3;
    if (score >= 85) return 2;
    if (score == null) return null

    return 1;
  };

  return (
    <div className="p-8 w-full font-lao mx-auto space-y-8 antialiased min-h-screen bg-white text-zinc-950">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-zinc-400">
            <MapPin size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Operational Network
            </span>
          </div>
          <h1 className="text-4xl font-light tracking-tight italic font-serif">
            Manage Branches
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* PROVINCE SELECT FILTER */}
          <Select
            onValueChange={(value) => {
              setSelectedProvince(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[220px] rounded-none border-zinc-200 h-12 uppercase text-[10px] tracking-widest focus:ring-0">
              <SelectValue placeholder="All Provinces" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-100 shadow-2xl">
              <SelectItem
                value="all"
                className="text-[10px] uppercase tracking-widest py-3"
              >
                All Provinces
              </SelectItem>
              {provinces?.map((p) => (
                <SelectItem
                  key={p.id}
                  value={p.id}
                  className="text-[10px] font-lao uppercase tracking-widest py-3"
                >
                  {p.name_lao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => setIsCreateOpen(true)}
            className="rounded-none bg-zinc-950 hover:bg-zinc-800 text-white h-12 px-8 uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-zinc-200 transition-all"
          >
            <Plus size={16} className="mr-2" /> Add Branch
          </Button>
        </div>
      </header>

      {/* BRANCH TABLE */}
      <div className="overflow-hidden border border-zinc-100">
        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="w-[100px] text-[10px] uppercase font-bold tracking-widest py-6 px-6">
                Visual
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">
                Branch Identity
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">
                Location & Assets
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">
                Contact Info
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">
                QC Status
              </TableHead>
              <TableHead className="w-[80px] px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.map((branch) => (
              <TableRow
                key={branch.id}
                className="group hover:bg-zinc-50/50 transition-colors border-zinc-100"
              >
                <TableCell className="py-6 px-6">
                  <div className="w-14 h-14 bg-zinc-100 overflow-hidden relative border border-zinc-100">
                    <img
                      src={branch.image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-sm text-zinc-900 tracking-tight">
                      {branch.name}
                    </div>
                    <Badge
                      variant="outline"
                      className="rounded-none text-[9px] font-bold uppercase tracking-tighter border-zinc-200 text-zinc-400 px-2 py-0"
                    >
                      {branch.province_name_lao}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5">
                    <a
                      href={branch.location_url}
                      target="_blank"
                      className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors font-bold"
                    >
                      <MapPin size={10} /> Google Maps
                    </a>
                    <a
                      href={branch.galory_image_url}
                      target="_blank"
                      className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors font-bold"
                    >
                      <LayoutGrid size={10} /> Category Drive
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5 text-[11px] text-zinc-500 font-mono">
                    <div className="flex items-center gap-2 tracking-tight">
                      {branch.phoen}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 italic">
                      {branch.email}
                    </div>
                    <div className="flex font-lao items-center gap-2 text-zinc-400 italic">
                      {branch.location_des}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-light italic font-serif leading-none">
                      {branch?.qc_rating?.toFixed(2)}
                    </span>

                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => {
                        const starCount = getStarCount(branch.qc_rating);

                        return (
                          <Star
                            key={i}
                            size={10}
                            fill={i < starCount ? "#09090b" : "transparent"}
                            className={
                              i < starCount ? "text-zinc-950" : "text-zinc-200"
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-white border-zinc-100"
                      >
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-none border-zinc-100 shadow-2xl min-w-[160px]"
                    >
                      <DropdownMenuItem
                        onClick={() => handleEditClick(branch)}
                        className="text-[10px] uppercase tracking-widest py-3 cursor-pointer"
                      >
                        <Edit2 size={12} className="mr-3" /> Edit Profile
                      </DropdownMenuItem>

                      <EditQcScore branch={branch} setBranch={setBranchess} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-[10px] uppercase tracking-widest py-3 text-red-500 cursor-pointer focus:text-red-500"
                          >
                            <Trash2 size={12} className="mr-3" /> Terminate
                            Branch
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your branch from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(branch.id, branch.name)
                              }
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-50">
        <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">
          Showing{" "}
          <span className="text-zinc-950">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="text-zinc-950">
            {Math.min(currentPage * itemsPerPage, filteredBranches.length)}
          </span>{" "}
          of {totalCount} locations
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="rounded-none w-10 h-10 border-zinc-200 hover:bg-zinc-50 transition-all"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="flex items-center px-4 h-10 border-y border-zinc-200 text-[10px] font-bold tracking-widest">
            PAGE {currentPage} OF {totalPages || 1}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-none w-10 h-10 border-zinc-200 hover:bg-zinc-50 transition-all"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/**create dialog */}

      <CreateBranchDialog
        isOpen={isCreateOpen}
        provinces={provinces}
        onClose={() => setIsCreateOpen(false)}
        setBranchs={setBranchess}
      />

      {/* eidt dialog */}

      <EditBranchDialog
        isOpen={isEditOpen}
        branchData={activeBranch}
        setBranchess={setBranchess}
        provinces={provinces}
        onClose={() => setIsEditOpen(false)}
      />

      {/* FOOTER STATS */}
      <footer className="pt-10 flex justify-between items-center text-zinc-300">
        <div className="text-[9px] uppercase tracking-[0.2em] font-bold">
          Network Density: {filteredBranches.length} active in view
        </div>
        <div className="text-[9px] uppercase tracking-[0.2em] italic">
          Copyright © 2026 Sompadid Virada
        </div>
      </footer>
    </div>
  );
};

export default ManageBranches;
