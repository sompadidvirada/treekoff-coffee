import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, FileText, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

import { Plus, Hash, Layers, UserPlus } from "lucide-react";
import { AddJobRequireApi } from "api/job_require";
import { toast } from "sonner";
interface Prop {
  jobs: any;
  branches: any;
  setJob_rq: React.Dispatch<React.SetStateAction<any[]>>
}

const AddJobRequire = ({ jobs, branches,setJob_rq }: Prop) => {
  const [open, setOpen] = useState(false);
  const [openBranch, setOpenBranch] = useState(false);
  const [branchValue, setBranchValue] = useState("");

  const [openJob, setOpenJob] = useState(false);
  const [jobValue, setJobValue] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      jop_description_id: Number(jobValue),
      branches_id: Number(branchValue),
      require_number: parseInt(formData.get("require_number") as string),
      contact_number: formData.get("contact_number") as string,
      job_level: formData.get("job_level") as string,
    };

    try {
      const ress = await AddJobRequireApi(payload);
      setJob_rq((prev)=> [ress.data, ...prev])
      setOpen(false);
      toast.success(`ເພີ່ມຕຳແໜ່ງຮັບສະໝັກສຳເລັດ`, { className: "font-lao" });
    } catch (err) {
      if (err.response?.data?.code === "CONFLICT_DUPLICATE_JOB") {
        toast.error(`ຕຳແໜ່ງນີ້ ຂອງສາຂານີ້ ຖືກສ້າງແລ້ວ`, {
          className: "font-lao",
        });
        console.log(err.response)
      } else {
        console.log(err.response);
        toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
      }
    } finally {
        setJobValue("")
        setBranchValue("")
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#1A0F0A] font-lao text-white px-8 py-3 rounded-none flex items-center gap-3 hover:bg-[#D4AF37] transition-all group tracking-widest text-xs uppercase font-bold">
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform"
          />
          <span>ເພີ່ມຕຳແໜ່ງໃຫ່ມ</span>
        </button>
      </DialogTrigger>

      <DialogContent className="min-w-4xl p-0 overflow-hidden border-none bg-white rounded-none shadow-[0_30px_80px_rgba(0,0,0,0.2)] font-lao">
        {/* Luxury Top Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#F4E0A1] to-[#D4AF37]" />

        <DialogHeader className="px-12 pt-12 pb-8 text-left">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em]">
              Staff Acquisition
            </p>
          </div>
          <DialogTitle className="font-lao text-4xl font-light text-[#1A0F0A] tracking-tight">
            ລົງທະບຽນຄວາມຕ້ອງການບຸກຄະລາກອນ
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-12 pb-12">
          <div className="space-y-0 border border-gray-100">
            {/* SECTION 01: PRIMARY SELECTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-b border-gray-100">
              <div className="p-8 space-y-4 hover:bg-gray-50/30 transition-colors">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
                  <span className="opacity-30">01</span> Location / ສາຂາ
                </Label>
                <Popover open={openBranch} onOpenChange={setOpenBranch}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto font-normal hover:bg-transparent group"
                    >
                      <div className="flex items-center gap-4">
                        <MapPin
                          size={20}
                          className="text-gray-300 group-hover:text-[#D4AF37] transition-colors"
                        />
                        <span
                          className={cn(
                            "text-lg font-lao",
                            !branchValue && "text-gray-300",
                          )}
                        >
                          {branchValue
                            ? branches.find(
                                (b) => b.id.toString() === branchValue,
                              )?.name
                            : "ເລືອກສາຂາ..."}
                        </span>
                      </div>
                      <ChevronsUpDown className="h-4 w-4 opacity-30" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-none w-[--radix-popover-trigger-width]">
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
                              className="rounded-none font-lao py-3"
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

              <div className="p-8 space-y-4 hover:bg-gray-50/30 transition-colors">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
                  <span className="opacity-30">02</span> Position / ຕຳແໜ່ງ
                </Label>
                <Popover open={openJob} onOpenChange={setOpenJob}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto font-normal hover:bg-transparent group"
                    >
                      <div className="flex items-center gap-4">
                        <UserPlus
                          size={20}
                          className="text-gray-300 group-hover:text-[#D4AF37] transition-colors"
                        />
                        <span
                          className={cn(
                            "text-lg font-lao",
                            !jobValue && "text-gray-300",
                          )}
                        >
                          {jobValue
                            ? jobs.find((j) => j.id.toString() === jobValue)
                                ?.name_lao
                            : "ເລືອກຕຳແໜ່ງ..."}
                        </span>
                      </div>
                      <ChevronsUpDown className="h-4 w-4 opacity-30" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-none w-[--radix-popover-trigger-width]">
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
                                setOpenJob(false);
                              }}
                              className="rounded-none font-lao py-3"
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

            {/* SECTION 02: SPECIFIC DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Job Level */}
              <div className="p-8 space-y-4 group">
                <Label className="text-[10px] uppercase tracking-widest text-gray-400">
                  Level / ລະດັບ
                </Label>
                <Select name="job_level">
                  <SelectTrigger className="border-none shadow-none p-0 h-auto bg-transparent focus:ring-0 ring-0 group">
                    <div className="flex items-center gap-3 p-2">
                      <Layers
                        size={18}
                        className="text-gray-300 group-hover:text-[#D4AF37] transition-colors"
                      />
                      <SelectValue placeholder="ລະດັບວຽກ" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Middle">Middle</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="ຜູ້ຈັດການຮ້ານ">ຜູ້ຈັດການຮ້ານ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="p-8 space-y-4 group">
                <Label className="text-[10px] uppercase tracking-widest text-gray-400">
                  Amount / ຈຳນວນ
                </Label>
                <div className="flex items-center gap-3">
                  <Hash
                    size={18}
                    className="text-gray-300 group-hover:text-[#D4AF37] transition-colors"
                  />
                  <Input
                    type="number"
                    min="1"
                    name="require_number"
                    className="border-none shadow-none p-2 h-auto bg-transparent focus-visible:ring-0 text-lg"
                    required
                  />
                </div>
              </div>

              {/* Contract Number */}
              <div className="p-8 space-y-4 group">
                <Label className="text-[10px] uppercase tracking-widest text-gray-400">
                  Contact Ref / ເລກທີສັນຍາ
                </Label>
                <div className="flex items-center gap-3">
                  <FileText
                    size={18}
                    className="text-gray-300 group-hover:text-[#D4AF37] transition-colors"
                  />
                  <Input
                    className="border-none shadow-none p-2 h-auto bg-transparent focus-visible:ring-0 text-lg font-mono"
                    name="contact_number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-16 py-4 bg-[#1A0F0A] text-white text-[11px] uppercase tracking-[0.4em] font-black hover:bg-[#D4AF37] transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
            >
              Confirm & Create
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobRequire;
