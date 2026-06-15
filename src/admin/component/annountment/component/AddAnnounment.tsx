import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { AddNews } from "api/news";
import { Camera, Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

interface Prop {
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
}

interface UploadedImage {
  file: File;
  previewUrl: string;
}


const AddAnnounment = ({ setTotalItems, setAnnouncements }: Prop) => {
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
    description: "",
    images: [] as string[],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isLoad, setIsLoad] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Limit to 3 items max
      if (images.length >= 3) return;

      setImages([
        ...images,
        {
          file: selectedFile,
          previewUrl: URL.createObjectURL(selectedFile),
        },
      ]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (indexToRemove: number) => {
    URL.revokeObjectURL(images[indexToRemove].previewUrl);
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCreateAnnouncement = async () => {
    const formDataPayload = new FormData();

    formDataPayload.append("title", formData.title);
    formDataPayload.append("description", formData.description);
    formDataPayload.append("sub_title", formData.sub_title);

    images.forEach((imgSlot) => {
      formDataPayload.append("images", imgSlot.file);
    });

    try {
      setIsLoad(true);
      const ress = await AddNews(formDataPayload);
      setAnnouncements((prev) => {
        const updatedList =
          prev.length >= 3
            ? [ress.data, ...prev.slice(0, 2)]
            : [ress.data, ...prev];

        return updatedList;
      });
      setTotalItems((prevTotal) => prevTotal + 1);

      toast.success(`ເພີ່ມຂ່າວສານໃຫ່ມສຳເລັດ`);
    } catch (error) {
      console.error("Failed publishing announcement:", error);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ", { className: "font-lao" });
    } finally {
      setIsLoad(false);
      setFormData({
        title: "",
        sub_title: "",
        description: "",
        images: [] as string[],
      });
      setImages([]);
    }
  };
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="xl:col-span-4 space-y-8 font-lao">
      <div className="bg-zinc-50 p-8 rounded-none border border-zinc-100 space-y-8 sticky top-8">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-950 p-2 rounded-none">
            <Plus size={16} className="text-white" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
            {isEditing ? "Edit Announcement" : "Create New"}
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Headline
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={(e) => handleTextChange(e)}
              placeholder="The main title..."
              className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-900 bg-white font-lao"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Sub Headline
            </label>
            <Input
              name="sub_title"
              value={formData.sub_title}
              onChange={(e) => handleTextChange(e)}
              placeholder="Context or date..."
              className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-900 bg-white font-lao"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Details
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleTextChange(e)}
              placeholder="Full description..."
              className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-900 bg-white font-lao min-h-[150px] resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex justify-between">
              <span>Visual Content</span>
              <span className="text-zinc-300 italic">
                {images.length} / 3 Images
              </span>
            </label>

            {/* Hidden Input File Trigger */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*"
            />

            <div className="grid grid-cols-3 gap-2">
              {/* Render Active Image Previews */}
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square bg-zinc-100 border border-zinc-200 overflow-hidden group"
                >
                  <img
                    src={img.previewUrl} // Using object block strings
                    alt=""
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-white p-1 shadow-sm opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Render Remaining Empty Skeleton Slots */}
              {Array.from({ length: 3 - images.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square bg-white border border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-950 hover:bg-zinc-50 transition-all group"
                >
                  <Camera
                    size={16}
                    className="text-zinc-300 group-hover:text-zinc-950 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-[8px] uppercase mt-2 text-zinc-300 group-hover:text-zinc-950 font-bold tracking-tighter">
                    ເພີ່ມຮູບພາບ
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button
            disabled={isLoad}
            onClick={handleCreateAnnouncement}
            className="w-full cursor-pointer rounded-none bg-zinc-950 uppercase text-[10px] tracking-widest h-12 shadow-xl shadow-zinc-200"
          >
            {isLoad ? <Spinner /> : "ເພີ່ມບົດຄວາມ"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnounment;
