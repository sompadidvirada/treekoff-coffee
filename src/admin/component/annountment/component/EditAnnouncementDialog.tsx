import { useState, useEffect, useRef } from "react";
import {
  Save,
  X,
  Image as ImageIcon,
  Trash2,
  AlertCircle,
  Camera,
} from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UpdateNews } from "api/news";

interface EditAnnouncementProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: any;
  setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
}

const EditAnnouncementDialog = ({
  isOpen,
  onClose,
  announcement,
  setAnnouncements,
}: EditAnnouncementProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden file input
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
    description: "",
    articles_image: [],
  });
  const [files, setFiles] = useState({
    removeImage: [],
    files: [],
  });

  useEffect(() => {
    if (announcement) {
      setFormData({ ...announcement });
    }
  }, [announcement]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const itemToRemove = formData.articles_image[indexToRemove];

    // If it's a string, it's an old image from the DB
    if (typeof itemToRemove === "string" || !itemToRemove.file) {
      const url =
        typeof itemToRemove === "string" ? itemToRemove : itemToRemove.image;
      setFiles((prev) => ({
        ...prev,
        removeImage: [...prev.removeImage, url],
      }));
    }
    // If it has a .file property, it's a new upload.
    // We just remove it from the UI; no need to tell the backend to "delete" it.

    setFormData((prev) => ({
      ...prev,
      articles_image: prev.articles_image.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData.articles_image.length >= 3)
      return toast.error("ບໍ່ສາດມາດອັປໂຫລດຫລາຍກ່ວາ 3 ຮູບພາບໃນບົດຄວາມ", { className:"font-lao"});


    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const previewUrl = URL.createObjectURL(selectedFile);

    setFormData((prev) => ({
      ...prev,
      // We store an object so we know this is a NEW file
      articles_image: [
        ...prev.articles_image,
        { image: previewUrl, file: selectedFile },
      ],
    }));

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSave = async (id: number) => {
    const formDa = new FormData();

    // Basic Fields
    formDa.append("title", formData.title);
    formDa.append("sub_title", formData.sub_title);
    formDa.append("description", formData.description);

    // Handle Images Logic
    formData.articles_image.forEach((item) => {
      if (item.file) {
        // This is a new file to upload
        formDa.append("images", item.file);
      }
    });

    // Handle Deletions
    files.removeImage.forEach((url) => {
      formDa.append("remove_images", url);
    });

    try {
      const ress = await UpdateNews(formDa, id);
      setAnnouncements((prev) =>
        prev.map((item) => (item.id == ress.data.id ? ress.data : item)),
      );
      toast.success("Updated successfully");
      onClose();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-lao min-w-[600px] w-[95vw] rounded-none border-none p-0 bg-white shadow-2xl antialiased overflow-hidden">
        {/* FORM BODY */}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        <div className="p-10 space-y-8 overflow-y-auto max-h-[80vh]">
          <div className="space-y-8">
            {/* Title Field */}
            <div className="group space-y-1 font-lao">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-focus-within:text-zinc-950 transition-colors">
                Headline Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="rounded-none border-t-0 border-x-0 border-b border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-950 px-0 text-xl font-medium placeholder:text-zinc-200"
                placeholder="Enter announcement title..."
              />
            </div>

            {/* SubTitle Field */}
            <div className="group space-y-1 font-lao">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-focus-within:text-zinc-950 transition-colors">
                Sub Headline / Category
              </label>
              <Input
                value={formData.sub_title}
                onChange={(e) => handleInputChange("sub_title", e.target.value)}
                className="rounded-none border-t-0 border-x-0 border-b border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-950 px-0 text-zinc-600"
                placeholder="e.g. Vientiane Center • May 2026"
              />
            </div>

            {/* Description Field */}
            <div className="group space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-focus-within:text-zinc-950 transition-colors">
                Detailed Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="rounded-none border-zinc-100 bg-zinc-50/50 focus-visible:ring-0 focus-visible:border-zinc-950 min-h-[140px] resize-none font-lao p-4 text-sm leading-relaxed"
                placeholder="Write content..."
              />
            </div>

            {/* Media Management */}
            {/* IMAGE DISPLAY GRID */}
            <div className="pt-4 border-t border-zinc-100 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Current Media
                </label>
                <span className="text-[9px] text-zinc-300 italic uppercase">
                  {formData.articles_image.length} File(s) Attached
                </span>
              </div>

              {/* IMAGE DISPLAY GRID WITH REMOVE BUTTON */}
              <div className={`grid gap-2 grid-cols-1}`}>
                {formData.articles_image.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative group overflow-hidden bg-zinc-100 border border-zinc-200 aspect-square}`}
                  >
                    <img
                      src={img?.image ? img.image : img}
                      alt=""
                      className="object-cover w-full h-full"
                    />

                    {/* REMOVE BUTTON (X) */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white p-1.5 shadow-sm transition-colors text-zinc-900 opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>

                    <div className="absolute inset-0 bg-black/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera size={16} className="text-white opacity-40" />
                    </div>
                  </div>
                ))}

                {formData.articles_image.length === 0 && (
                  <div className="aspect-[21/9] border border-dashed border-zinc-200 flex flex-col items-center justify-center gap-2 bg-zinc-50">
                    <ImageIcon size={20} className="text-zinc-300" />
                    <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                      No images uploaded
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={triggerUpload} // Trigger the hidden input
                  className="rounded-none h-12 flex-grow border-zinc-200 uppercase text-[10px] tracking-[0.2em] hover:bg-zinc-50"
                >
                  <ImageIcon size={14} className="mr-2" /> Upload New
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInputChange("images", [])}
                  className="rounded-none h-12 border-red-50 text-red-400 hover:bg-red-50 hover:text-red-600 uppercase text-[10px] tracking-widest transition-all px-4"
                  title="Remove All"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="p-8 bg-zinc-50/80 border-t border-zinc-100 sm:justify-between flex-row gap-4">
          <div className="hidden sm:flex items-center gap-2 text-zinc-400">
            <AlertCircle size={14} />
            <span className="text-[9px] uppercase tracking-tighter">
              Live Update Mode
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              onClick={onClose}
              variant="ghost"
              className="rounded-none uppercase text-[10px] tracking-widest h-12 px-6 hover:bg-white"
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={() => onSave(announcement.id)}
              className="rounded-none bg-zinc-950 hover:bg-zinc-800 text-white uppercase text-[10px] tracking-[0.2em] h-12 px-10 shadow-lg shadow-zinc-200 flex-grow sm:flex-grow-0"
            >
              <Save size={14} className="mr-2" /> ສົ່ງຟອມແກ້ໄຂ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAnnouncementDialog;
