import React, { useState, useRef } from "react";
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
import { Camera, MapPin, Link2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { addBranch } from "api/branches";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface CreateBranchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  provinces: any[];
  setBranchs: React.Dispatch<React.SetStateAction<any[]>>
}

const CreateBranchDialog = ({
  isOpen,
  onClose,
  provinces,
  setBranchs
}: CreateBranchDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [isLoad, setIsLoad] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    province_id: "",
    location_url: "",
    location_des: "",
    phone: "",
    email: "",
    galory_image_url: "",
    image: "",
  });

  const handleSave = async () => {
    const formDa = new FormData();

    formDa.append("name", formData.name);
    formDa.append("province_id", formData.province_id);
    formDa.append("location_url", formData.location_url);
    formDa.append("location_des", formData.location_des);
    formDa.append("phone", formData.phone);
    if (formData.email != "") {
      formDa.append("email", formData.email);
    }
    if (file) {
      formDa.append("image", file);
    }
    formDa.append("galory_image_url", formData.galory_image_url);

    setIsLoad(true);
    try {
      const ress = await addBranch(formDa);
      console.log(ress);
      setBranchs((prev)=> [...prev, ress.data])
      toast.success(`ເພີ່ມສາຂາ "${formData.name}" ສຳເລັດ`, {
        className: "font-lao",
      });
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    } finally {
      setIsLoad(false);
      handleClose();
    }
  };
  const handleClose = () => {
    onClose();
    setFormData({
      name: "",
      province_id: "",
      location_url: "",
      location_des: "",
      phone: "",
      email: "",
      galory_image_url: "",
      image: "",
    });
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-4xl p-0 overflow-hidden border-none rounded-none bg-white shadow-2xl">
        <div className="flex h-full max-h-[90vh]">
          {/* Left Side: Visual/Image Upload */}
          <div className="w-1/3 bg-zinc-50 border-r border-zinc-100 p-8 flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                Branch Identity
              </h3>
              <p className="text-[10px] italic text-zinc-300">
                Minimum 1200x800px
              </p>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative aspect-[3/4] w-full bg-white border border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-950 transition-all overflow-hidden"
            >
              {formData.image ? (
                <>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="text-white" size={24} />
                  </div>
                </>
              ) : (
                <>
                  <Camera
                    size={24}
                    className="text-zinc-200 group-hover:text-zinc-950 group-hover:scale-110 transition-all"
                  />
                  <span className="text-[9px] uppercase mt-4 font-bold tracking-widest text-zinc-300 group-hover:text-zinc-950">
                    Upload Cover
                  </span>
                </>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Right Side: Form Content */}
          <div className="flex-1 font-lao p-10 space-y-8 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-light italic font-serif tracking-tight">
                Register New Branch
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              {/* Branch Name */}
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Official Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleTextChange}
                  placeholder="Treekoff - Branch Name"
                  className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-950"
                />
              </div>

              {/* Province */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Province
                </label>
                <Select
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, province_id: v }))
                  }
                >
                  <SelectTrigger className="rounded-none border-zinc-200 focus:ring-0 uppercase text-[10px] tracking-widest h-10">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {provinces?.map((p) => (
                      <SelectItem
                        key={p.id}
                        value={p.id}
                        className="text-[10px] font-lao uppercase tracking-widest"
                      >
                        {p.name_lao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Phone Number
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleTextChange}
                  placeholder="+856 20..."
                  className="rounded-none border-zinc-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Internal Email
                </label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleTextChange}
                  placeholder="branch@treekoff.com"
                  className="rounded-none border-zinc-200"
                />
              </div>

              {/* URLs */}
              <div className="col-span-2 space-y-2 pt-4 border-t border-zinc-50">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Google Maps Location URL
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300"
                    size={14}
                  />
                  <Input
                    name="location_url"
                    value={formData.location_url}
                    onChange={handleTextChange}
                    className="pl-10 rounded-none border-zinc-200"
                    placeholder="https://maps.app.goo.gl/..."
                  />
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Location of the branch description.
                </label>
                <div className="relative">
                  <Textarea
                    name="location_des"
                    value={formData.location_des}
                    onChange={handleTextChange}
                    placeholder="Type your message here."
                  />
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Category Drive URL (Google Drive)
                </label>
                <div className="relative">
                  <Link2
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300"
                    size={14}
                  />
                  <Input
                    name="galory_image_url"
                    value={formData.galory_image_url}
                    onChange={handleTextChange}
                    className="pl-10 rounded-none border-zinc-200"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 flex gap-3">
              <Button
                disabled={isLoad}
                onClick={onClose}
                variant="outline"
                className="flex-1 rounded-none uppercase text-[10px] tracking-widest h-12 border-zinc-200 hover:bg-zinc-50"
              >
                ຍົກເລີກ
              </Button>
              <Button
                disabled={isLoad}
                onClick={() => handleSave()}
                className="flex-[2] rounded-none bg-zinc-950 uppercase text-[10px] tracking-widest h-12 shadow-xl shadow-zinc-200"
              >
                {isLoad ? <Spinner /> : "ສົ່ງຟອມ"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBranchDialog;
