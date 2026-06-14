import React, { useState } from "react";
import {
  Save,
  MapPin,
  Layers,
  Hash,
  FileText,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditJobRequireApi } from "api/job_require";
import { toast } from "sonner";

// Types for your Bigtree project
interface JobRequire {
  id: number;
  branches_id: number;
  branch_name: string;
  job_description_name: string;
  job_description_id: number;
  job_level: string;
  require_number: number;
  contact_number: string;
  province_name: string;
}

interface EditJobRequireProps {
  data: JobRequire;
  branches: any[];
  jobs: any[];
  setJop_rq: React.Dispatch<React.SetStateAction<any[]>>;
}

const EditJobRequire = ({
  data,
  branches,
  jobs,
  setJop_rq,
}: EditJobRequireProps) => {
  const [openBranch, setOpenBranch] = useState(false);
  const [openJobs, setOpenJobs] = useState(false);
  const [jobValue, setJobValue] = useState(String(data.job_description_id));
  const [branchValue, setBranchValue] = useState(String(data.branches_id));
  const [isOpen, setIsOpen] = useState(false);

  // Mock data for the dropdowns

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const jobLe = formData.get("job_level") as string
    // Logic to update the backend via Go API
    const payload = {
      branches_id: Number(branchValue),
      require_number: parseInt(formData.get("require_number") as string),
      contact_number: formData.get("contact_number") as string,
      job_level: jobLe == "none" ? "" : jobLe,
      job_description_id: Number(jobValue),
    };
    try {
      const ress = await EditJobRequireApi(data.id, payload);
      
      setJop_rq((prev) =>
        prev.map((item) => (item.id == data.id ? ress.data : item)),
      );
      toast.success(`ອັປເດດສຳເລັດ`, { className: "font-lao" });
      setIsOpen(false);
    } catch (err) {
      if (err.response?.data?.code === "CONFLICT_DUPLICATE_JOB") {
        toast.error(`ຕຳແໜ່ງນີ້ ຂອງສາຂານີ້ ຖືກສ້າງແລ້ວ`, {
          className: "font-lao",
        });
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-400 font-lao cursor-pointer hover:text-[#D4AF37] transition-all hover:scale-105 active:scale-95">
          ແກ້ໄຂ
        </button>
      </DialogTrigger>

      <DialogContent className="min-w-2xl p-0 overflow-hidden border-none bg-white rounded-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] font-lao">
        {/* High-End Branding Header */}
        <div className="bg-[#1A0F0A] px-10 py-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative z-10">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">
              Modification Mode
            </span>
            <DialogTitle className="text-white font-lao text-3xl font-light tracking-tight">
              ແກ້ໄຂລາຍລະອຽດ
            </DialogTitle>
            <div className="h-[1px] w-12 bg-[#D4AF37] mx-auto mt-6" />
          </div>
        </div>

        <form onSubmit={handleSave} className="p-0">
          {/* The "Structural Table" Layout */}
          <div className="divide-y divide-gray-100 border-b border-gray-100">
            {/* ROW 1: Branch Selection */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-center group">
              <div className="md:col-span-1 px-10 py-6 bg-gray-50/50 border-r border-gray-100 h-full flex items-center">
                <Label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                  ສາຂາ / Branch
                </Label>
              </div>
              <div className="md:col-span-3 px-10 py-6 transition-colors group-hover:bg-[#FDFCFB]">
                <Popover open={openBranch} onOpenChange={setOpenBranch}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto font-normal hover:bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <MapPin size={18} className="text-[#D4AF37]" />
                        <span className="text-lg text-gray-900">
                          {branchValue
                            ? branches.find(
                                (b) => b.id.toString() === branchValue,
                              )?.name
                            : "ເລືອກສາຂາ..."}
                        </span>
                      </div>
                      <ChevronsUpDown className="h-4 w-4 opacity-20" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-none w-[--radix-popover-trigger-width] border-[#1A0F0A]">
                    <Command className="rounded-none">
                      <CommandInput
                        placeholder="ຄົ້ນຫາສາຂາ..."
                        className="font-lao"
                      />
                      <CommandList>
                        <CommandEmpty>ບໍ່ພົບຂໍ້ມູນ.</CommandEmpty>
                        <CommandGroup>
                          {branches.map((b) => (
                            <CommandItem
                              key={b.id}
                              onSelect={() => {
                                setBranchValue(b.id.toString());
                                setOpenBranch(false);
                              }}
                              className="rounded-none py-3 font-lao cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 text-[#D4AF37]",
                                  branchValue === b.id.toString()
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {b.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* ROW 2: Job Selection */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-center group">
              <div className="md:col-span-1 px-10 py-6 bg-gray-50/50 border-r border-gray-100 h-full flex items-center">
                <Label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                  ຕຳແໜ່ງ / Position
                </Label>
              </div>
              <div className="md:col-span-3 px-10 py-6 transition-colors group-hover:bg-[#FDFCFB]">
                <Popover open={openJobs} onOpenChange={setOpenJobs}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto font-normal hover:bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <MapPin size={18} className="text-[#D4AF37]" />
                        <span className="text-lg text-gray-900">
                          {jobValue
                            ? jobs.find((j) => j.id.toString() === jobValue)
                                ?.name_lao
                            : "ເລືອກຕຳແໜ່ງ..."}
                        </span>
                      </div>
                      <ChevronsUpDown className="h-4 w-4 opacity-20" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-none w-[--radix-popover-trigger-width] border-[#1A0F0A]">
                    <Command className="rounded-none">
                      <CommandInput
                        placeholder="ຄົ້ນຫາຕຳແໜ່ງ..."
                        className="font-lao"
                      />
                      <CommandList>
                        <CommandEmpty>ບໍ່ພົບຂໍ້ມູນ.</CommandEmpty>
                        <CommandGroup>
                          {jobs.map((j) => (
                            <CommandItem
                              key={j.id}
                              onSelect={() => {
                                setJobValue(j.id.toString());
                                setOpenJobs(false);
                              }}
                              className="rounded-none py-3 font-lao cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 text-[#D4AF37]",
                                  jobValue === j.id.toString()
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {j.name_lao}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* ROW 2: Job Level */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-center group">
              <div className="md:col-span-1 px-10 py-6 bg-gray-50/50 border-r border-gray-100 h-full flex items-center">
                <Label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                  ລະດັບ / Level
                </Label>
              </div>
              <div className="md:col-span-3 px-10 py-6 transition-colors group-hover:bg-[#FDFCFB]">
                <Select defaultValue={data.job_level || "none"} name="job_level">
                  <SelectTrigger className="border-none shadow-none p-0 h-auto focus:ring-0 bg-transparent">
                    <div className="flex items-center gap-4">
                      <Layers size={18} className="text-gray-300" />
                      <SelectValue className="text-lg" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-none font-lao border-[#1A0F0A]">
                    {/* The "None" Choice - Styled with a lighter color to differentiate */}
                    <SelectItem
                      value="none"
                      defaultValue={data.job_level}
                      className="text-gray-400 italic focus:text-gray-600 cursor-pointer"
                    >
                      ບໍ່ລະບຸ (None)
                    </SelectItem>
                    <div className="h-px bg-gray-100 my-1" />{" "}
                    {/* Subtle separator */}
                    <SelectItem value="Junior">Junior Level</SelectItem>
                    <SelectItem value="Middle">Middle Level</SelectItem>
                    <SelectItem value="Manager">Senior Level</SelectItem>
                    <SelectItem value="ຜູ້ຈັດການຮ້ານ">ຜູ້ຈັດການຮ້ານ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ROW 3: Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-center group">
              <div className="md:col-span-1 px-10 py-6 bg-gray-50/50 border-r border-gray-100 h-full flex items-center">
                <Label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                  ຈຳນວນ / Qty
                </Label>
              </div>
              <div className="md:col-span-3 px-10 py-6 transition-colors group-hover:bg-[#FDFCFB]">
                <div className="flex items-center gap-4">
                  <Hash size={18} className="text-gray-300" />
                  <Input
                    type="number"
                    name="require_number"
                    defaultValue={data.require_number}
                    className="border-none p-0 h-auto focus-visible:ring-0 text-lg font-medium"
                  />
                </div>
              </div>
            </div>

            {/* ROW 4: Contract Ref */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-center group">
              <div className="md:col-span-1 px-10 py-6 bg-gray-50/50 border-r border-gray-100 h-full flex items-center">
                <Label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                  Ref No.
                </Label>
              </div>
              <div className="md:col-span-3 px-10 py-6 transition-colors group-hover:bg-[#FDFCFB]">
                <div className="flex items-center gap-4">
                  <FileText size={18} className="text-gray-300" />
                  <Input
                    name="contact_number"
                    defaultValue={data.contact_number}
                    className="border-none p-0 h-auto focus-visible:ring-0 text-lg font-mono tracking-tighter"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modern Action Bar */}
          <div className="px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[10px] cursor-pointer uppercase tracking-[0.3em] font-black text-gray-400 hover:text-red-600 transition-colors"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className="w-full cursor-pointer md:w-auto px-14 py-4 bg-[#1A0F0A] text-white text-[11px] uppercase tracking-[0.4em] font-black hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-[#1A0F0A]/10"
            >
              <Save size={16} />
              ຢືນຢັນແກ້ໄຂ
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobRequire;
