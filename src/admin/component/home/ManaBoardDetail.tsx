import React, { useEffect, useState } from "react";
import {
  User,
  Quote,
  Image as ImageIcon,
  Save,
  RefreshCcw,
  Camera,
  Briefcase,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getBoardDetail, updateBoardDetail } from "api/board";
import { toast } from "sonner";

const ManaBoardDetail = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [editBoard, setEditBoard] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<Record<number, File>>({});

  const handleUpdate = (id: number, field: string, value: string) => {
    setHasChanges(true);
    setEditBoard((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    );
  };

  const saveAllProfiles = async () => {
    setIsSaving(true);
    try {
      // 1. Identify only the members who actually have changes to save bandwidth
      const changedMembers = editBoard.filter((member) => {
        const original = boardMembers.find((m) => m.id === member.id);
        return JSON.stringify(member) !== JSON.stringify(original);
      });

      // 2. Map through changed members and create a request for each
      const uploadPromises = changedMembers.map(async (member) => {
        const formData = new FormData();
        formData.append("name", member.name);
        formData.append("position", member.position);
        formData.append("speech", member.speech);

        const fileToUpload = uploadFiles[member.id];
        if (fileToUpload) {
          formData.append("image", fileToUpload);
        }

        return updateBoardDetail(member.id, formData); 
      });

      await Promise.all(uploadPromises);

      
      setBoardMembers(editBoard);
      setHasChanges(false);
      
      toast.success(`ອັປເດດຂໍ້ມູນສຳເລັດ`)
    } catch (err) {
      console.error(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`)
    } finally {
      setIsSaving(false);
    }
  };

  const resetChanges = () => {
    setEditBoard(boardMembers);
    setHasChanges(false);
  };

  const handleImageChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Create preview for UI
      const localUrl = URL.createObjectURL(file);

      // 2. Update UI state
      setHasChanges(true);
      setEditBoard((prev) =>
        prev.map((member) =>
          member.id === id ? { ...member, image: localUrl } : member,
        ),
      );

      // 3. Store the actual File object for the API
      setUploadFiles((prev) => ({
        ...prev,
        [id]: file,
      }));
    }
  };

  useEffect(() => {
    const fecthBoardDetail = async () => {
      try {
        const ress = await getBoardDetail();
        setBoardMembers(ress.data);
        setEditBoard(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthBoardDetail();
  }, []);
  return (
    <div className="min-h-screen bg-[oklch(1_0_0)] p-8 lg:p-16 max-w-[1600px] mx-auto space-y-12 antialiased">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-100 pb-12 gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-extralight tracking-tighter text-zinc-950 uppercase">
            Board <span className="font-bold italic">Identity</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-900" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
              Corporate Personnel Management
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={resetChanges}
            disabled={!hasChanges || isSaving}
            className="rounded-none border-zinc-200 uppercase text-[10px] tracking-widest h-12 px-6 disabled:opacity-30"
          >
            <RefreshCcw className="mr-2 h-3 w-3" /> Reset
          </Button>

          <Button
            onClick={saveAllProfiles}
            disabled={isSaving}
            className={`rounded-none uppercase text-[10px] tracking-widest h-12 px-10 transition-all shadow-xl shadow-zinc-100
              ${hasChanges ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-zinc-950 text-white"}
            `}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            ) : hasChanges ? (
              <CheckCircle2 className="mr-2 h-3 w-3" />
            ) : (
              <Save className="mr-2 h-3 w-3" />
            )}
            {isSaving ? "Saving..." : "Save All Profiles"}
          </Button>
        </div>
      </div>

      {/* EDITING GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {editBoard.map((member, index) => (
          <div
            key={member.id}
            className="group flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* IMAGE SECTION */}
            <div className="relative aspect-[4/5] bg-zinc-50 overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-700 ease-in-out">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage
                  src={member.image}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <AvatarFallback className="rounded-none text-zinc-300 bg-zinc-50">
                  <User size={64} strokeWidth={1} />
                </AvatarFallback>
              </Avatar>

              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange(member.id, e)} // <--- ADD THIS
                />
                <div className="bg-white p-4 flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Camera size={20} className="text-zinc-900" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
                    Upload Portrait
                  </span>
                </div>
              </label>

              <div className="absolute bottom-0 left-0 bg-zinc-950 text-white px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase">
                Member 0{member.id}
              </div>
            </div>

            {/* FORM FIELDS */}
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <User size={12} /> Name
                </label>
                <Input
                  value={member.name}
                  onChange={(e) =>
                    handleUpdate(member.id, "name", e.target.value)
                  }
                  className="rounded-none border-t-0 border-x-0 border-b border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-950 font-medium px-0 text-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Briefcase size={12} /> Position
                </label>
                <Input
                  value={member.position}
                  onChange={(e) =>
                    handleUpdate(member.id, "position", e.target.value)
                  }
                  className="rounded-none border-t-0 border-x-0 border-b border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-950 px-0"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Quote size={12} /> Speech
                </label>
                <Textarea
                  value={member.speech}
                  onChange={(e) =>
                    handleUpdate(member.id, "speech", e.target.value)
                  }
                  className="rounded-none font-lao border-zinc-100 bg-zinc-50/30 focus-visible:ring-0 focus-visible:border-zinc-950 min-h-[100px] resize-none p-3 text-sm italic"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManaBoardDetail;
