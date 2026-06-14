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
import { UserPlus, Phone, Lock, Camera } from "lucide-react";
import { createStaff } from "../../api/home_cover_image";

interface AddStaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setStaffs: React.Dispatch<React.SetStateAction<any[]>>
}

const AddStaffDialog = ({ isOpen, onClose, setStaffs }: AddStaffDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    imagePreview: "",
    rawFile: null as File | null,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file), // Used for the src in your dialog
        rawFile: file, // Used for the FormData append
      }));
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      name: "",
      role: "",
      phone: "",
      imagePreview: "",
      rawFile: null as File | null,
    });
  };

  // Roles matching your ROLE enum
  const roles = ["ADMIN", "STAFF"];

  const onSave = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("phone", formData.phone);
    if (formData.rawFile) {
      data.append("image", formData.rawFile);
    }
    try {
        const ress = await createStaff(data)
        setStaffs((prevStaffs) => [...prevStaffs, ress.data]);
    } catch (err) {
      console.log(err);
    } finally {
        handleClose()
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-2xl p-0 overflow-hidden border-none rounded-none bg-white shadow-2xl">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-950 p-2.5">
                <UserPlus size={18} className="text-white" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl font-light italic font-serif tracking-tight text-zinc-900">
                  Register New Staff Member
                </DialogTitle>
              </DialogHeader>
            </div>
          </div>

          <div className="p-8 grid grid-cols-12 gap-8">
            {/* Avatar Upload (3 Cols) */}
            <div className="col-span-4 space-y-4 text-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square w-full bg-zinc-100 border border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-950 transition-all group relative overflow-hidden"
              >
                {formData.imagePreview ? (
                  <img
                    src={formData.imagePreview}
                    alt="Staff"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                ) : (
                  <>
                    <Camera
                      size={20}
                      className="text-zinc-300 group-hover:text-zinc-950 transition-colors"
                    />
                    <span className="text-[8px] uppercase mt-2 font-bold tracking-widest text-zinc-300 group-hover:text-zinc-950">
                      Upload Profile
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
              <p className="text-[9px] text-zinc-400 leading-relaxed uppercase tracking-tighter">
                Portrait should be <br /> high resolution.
              </p>
            </div>

            {/* Form Fields (8 Cols) */}
            <div className="col-span-8 space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Full Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleTextChange}
                  placeholder="Employee name..."
                  className="rounded-none border-zinc-200 focus-visible:border-zinc-950 h-10"
                />
              </div>

              {/* Role & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Role
                  </label>
                  <Select
                    onValueChange={(v) =>
                      setFormData((p) => ({ ...p, role: v }))
                    }
                  >
                    <SelectTrigger className="rounded-none border-zinc-200 uppercase text-[10px] tracking-widest h-10 focus:ring-0">
                      <SelectValue placeholder="Access Level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {roles.map((r) => (
                        <SelectItem
                          key={r}
                          value={r}
                          className="text-[10px] uppercase tracking-widest"
                        >
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300"
                      size={12}
                    />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleTextChange}
                      placeholder="51778..."
                      className="rounded-none border-zinc-200 pl-9 h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-none uppercase text-[10px] tracking-widest h-12 border-zinc-200 hover:bg-white"
            >
              Discard
            </Button>
            <Button
              onClick={onSave}
              className="flex-[2] rounded-none bg-zinc-950 text-white uppercase text-[10px] tracking-widest h-12 shadow-xl shadow-zinc-200"
            >
              Confirm Registration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffDialog;
