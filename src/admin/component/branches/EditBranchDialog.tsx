import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link2, Trash2, RefreshCcw, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { editBranch } from "api/branches";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface EditBranchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  branchData: any;
  setBranchess: React.Dispatch<React.SetStateAction<any[]>>;
  onDelete?: (id: number) => void;
  provinces: any[];
}

const EditBranchDialog = ({
  isOpen,
  onClose,
  branchData,
  setBranchess,
  onDelete,
  provinces,
}: EditBranchDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoad, setIsLoad] = useState(false);
  const [file, setFile] = useState<File>();
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    province_id: "",
    location_url: "",
    location_des: "",
    phoen: "",
    email: "",
    galory_image_url: "",
    image: "",
  });

  useEffect(() => {
    setFormData({
      id: branchData?.id,
      name: branchData?.name,
      province_id: branchData?.province_id,
      location_url: branchData?.location_url,
      location_des: branchData?.location_des,
      phoen: branchData?.phoen,
      email: branchData?.email,
      galory_image_url: branchData?.galory_image_url,
      image: branchData?.image,
    });
  }, [branchData]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: url }));
      setFile(file);
    }
  };
  const handleSendEdit = async () => {
    setIsLoad(true);
    const formDa = new FormData();

    if (file) {
      formDa.append("image", file);
    }
    if (formData.email) {
      formDa.append("email", formData.email);
    }
    formDa.append("name", formData.name);
    formDa.append("province_id", formData.province_id);
    formDa.append("location_url", formData.location_url);
    formDa.append("location_des", formData.location_des);
    formDa.append("phone", formData.phoen);
    formDa.append("galory_image_url", formData.galory_image_url);
    try {
      await editBranch(formDa, formData.id);

      setBranchess((prev) =>
        prev.map((item) => (item.id == formData.id ? formData : item)),
      );
      toast.success(`ອັປເດດສາຂາ "${formData.name}" ສຳເລັດ`);
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`);
    } finally {
      setIsLoad(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl p-0 overflow-hidden border-none rounded-none bg-white shadow-2xl font-lao">
        <div className="flex h-full max-h-[90vh]">
          {/* Left Side: Image Management */}
          <div className="w-1/3 bg-zinc-50 border-r border-zinc-100 p-8 flex flex-col items-center justify-between">
            <div className="text-center space-y-2 w-full">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 italic">
                Branch Visual Asset
              </h3>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative aspect-[3/4] w-full mt-6 bg-white border border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-950 transition-all overflow-hidden"
              >
                <img
                  src={formData.image || "/api/placeholder/400/600"}
                  alt="Branch"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <RefreshCcw size={20} className="mb-2" />
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em]">
                    Change Photo
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4 pt-8">
              <div className="p-4 bg-zinc-100/50 border border-zinc-100 space-y-1">
                <p className="text-[9px] uppercase font-bold text-zinc-400">
                  System ID
                </p>
                <p className="text-[10px] font-mono text-zinc-600">
                  BR-{formData.id || "XXXX"}
                </p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Right Side: Edit Form */}
          <div className="flex-1 p-10 space-y-8 overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0">
              <DialogTitle className="text-2xl font-light italic font-serif tracking-tight text-zinc-900">
                Update Branch Details
              </DialogTitle>
              <Badge
                variant="outline"
                className="rounded-none border-zinc-200 text-[9px] uppercase tracking-widest text-zinc-400 py-1"
              >
                Active Location
              </Badge>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Branch Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleTextChange}
                  className="rounded-none border-zinc-200 focus-visible:border-zinc-950"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Province
                </label>
                <Select
                  value={formData.province_id}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, province_id: v }))
                  }
                >
                  <SelectTrigger className="rounded-none border-zinc-200 uppercase text-[10px] tracking-widest h-10">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {provinces?.map((p) => (
                      <SelectItem
                        key={p.id}
                        value={p.id}
                        className="text-[10px] uppercase tracking-widest"
                      >
                        {p.name_lao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Contact Number
                </label>
                <Input
                  name="phoen"
                  value={formData.phoen}
                  onChange={handleTextChange}
                  className="rounded-none border-zinc-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Official Email
                </label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleTextChange}
                  className="rounded-none border-zinc-200"
                />
              </div>

              <div className="col-span-2 space-y-2 pt-4 border-t border-zinc-50">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  Google Maps Link{" "}
                  <ExternalLink size={10} className="text-zinc-300" />
                </label>
                <Input
                  name="location_url"
                  value={formData.location_url}
                  onChange={handleTextChange}
                  className="rounded-none border-zinc-200 text-xs text-zinc-500"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  Category Drive Asset{" "}
                  <Link2 size={10} className="text-zinc-300" />
                </label>
                <Input
                  name="galory_image_url"
                  value={formData.galory_image_url}
                  onChange={handleTextChange}
                  className="rounded-none border-zinc-200 text-xs text-zinc-500"
                />
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-10 flex items-center justify-between border-t border-zinc-100 mt-4">
              <div className="flex gap-3">
                <Button
                  disabled={isLoad}
                  onClick={onClose}
                  variant="outline"
                  className="rounded-none uppercase text-[10px] tracking-widest h-12 px-8 border-zinc-200"
                >
                  Discard
                </Button>
                <Button
                  disabled={isLoad}
                  onClick={handleSendEdit}
                  className="rounded-none bg-zinc-950 uppercase text-[10px] tracking-widest h-12 px-8 shadow-xl shadow-zinc-200"
                >
                  {isLoad ? <Spinner /> : "Update Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBranchDialog;
