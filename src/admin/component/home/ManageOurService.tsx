import { useState } from "react";
import {
  Upload,
  Save,
  Image as ImageIcon,
  Type,
  AlignLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { updateOurservice } from "api/our_service";

const mockData = [
  {
    id: 1,
    title: "Coffee Brewing",
    subtitle: "Art of Taste",
    description: "Experience the finest beans...",
    image: "/tk-image/tk20.jpg",
  },
  {
    id: 2,
    title: "Bakery",
    subtitle: "Freshly Baked",
    description: "Daily fresh bread and pastries...",
    image: "/tk-image/tk26.jpeg",
  },
  {
    id: 3,
    title: "Co-Working",
    subtitle: "Productive Space",
    description: "Work comfortably with our high-speed WiFi...",
    image: "/tk-image/tk27.jpg",
  },
  {
    id: 4,
    title: "Delivery",
    subtitle: "To Your Door",
    description: "Fast delivery within the city...",
    image: "/tk-image/tk28.jpg",
  },
];

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  newFile?: File;
}

const ManageOurService = () => {
  // Simulating the 4 service parts
  const [services, setServices] = useState<Service[]>(mockData);

  const handleImageChange = (index, file) => {
    if (!file) return;
    if (services[index].image.startsWith("blob:")) {
      URL.revokeObjectURL(services[index].image);
    }

    const previewUrl = URL.createObjectURL(file);

    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      image: previewUrl,
      newFile: file,
    };

    setServices(updatedServices);
  };

  const handleSaveAll = async () => {
    try {
      // We use Promise.all to handle all 4 services at once
      const uploadPromises = services.map(async (service, index) => {
        const formData = new FormData();
        formData.append("id", service.id.toString());
        formData.append("title", service.title);
        formData.append("subtitle", service.subtitle);
        formData.append("description", service.description);
        formData.append("section_number", (index + 1).toString());

        // Only append the image if a new file was actually selected
        if (service.newFile) {
          formData.append("image", service.newFile);
        }

        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
      });

      return
      toast.success("ບັນທຶກຂໍ້ມູນທັງໝົດສຳເລັດ");
    } catch (err) {
      console.error(err);
      toast.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກ");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[oklch(1_0_0)] p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12 antialiased">
      {/* HEADER: Style 1 (Minimal Gallery) */}
      <div className="flex items-center gap-6 border-b border-zinc-100 pb-10">
        <div className="space-y-0">
          <h2 className="text-4xl font-extralight tracking-tighter text-zinc-950 uppercase">
            Our <span className="font-bold">Services</span>
          </h2>
        </div>
        <div className="h-10 w-[1px] bg-zinc-200" />
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Content Management
          </p>
          <p className="text-xs font-lao text-zinc-500 font-medium">
            ປັບແຕ່ງຂໍ້ມູນການບໍລິການທັງໝົດ 4 ພາກສ່ວນຂອງ Treekoff
          </p>
        </div>
        <Button
          onClick={handleSaveAll}
          className="ml-auto bg-zinc-900 text-white rounded-none px-8 h-12 hover:bg-zinc-800 transition-all"
        >
          <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 gap-10">
        {services.map((service, index) => (
          <div key={service.id} className="group relative">
            <div className="absolute -left-4 top-0 text-[60px] font-bold text-zinc-50 opacity-0 group-hover:opacity-100 transition-all -z-10 select-none">
              0{index + 1}
            </div>

            <Card className="rounded-none border border-zinc-100 shadow-none hover:shadow-2xl hover:shadow-zinc-100 transition-all duration-500 overflow-hidden">
              <CardContent className="p-0 flex flex-col lg:flex-row">
                {/* LEFT: FORM SECTION */}
                <div className="flex-1 p-8 space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-[1px] bg-zinc-900" />
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                      Service Configuration
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight flex items-center gap-2">
                        <Type className="h-3 w-3" /> Main Title
                      </label>
                      <Input
                        defaultValue={service.title}
                        className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-900 bg-transparent text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight">
                        Subtitle
                      </label>
                      <Input
                        defaultValue={service.subtitle}
                        className="rounded-none border-zinc-100 focus-visible:ring-0 focus-visible:border-zinc-900 bg-transparent text-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-1">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight flex items-center gap-2">
                          <AlignLeft className="h-3 w-3" /> Description
                        </label>

                        {/* MINI TOOLBAR */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            title="Add Bullet Point"
                            onClick={(e) => {
                              // Find the actual textarea element in the DOM
                              const textarea = e.currentTarget
                                .closest(".space-y-2")
                                ?.querySelector("textarea");
                              if (!textarea) return;

                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const currentText = service.description;

                              // Determine if we need a new line prefix or just the dash
                              const isNewLine =
                                start === 0 ||
                                currentText.charAt(start - 1) === "\n";
                              const insertText = isNewLine ? "- " : "\n- ";

                              // Splice the "- " into the exact cursor position
                              const newText =
                                currentText.substring(0, start) +
                                insertText +
                                currentText.substring(end);

                              const updatedServices = [...services];
                              updatedServices[index] = {
                                ...updatedServices[index],
                                description: newText,
                              };
                              setServices(updatedServices);

                              // Put focus back onto the textarea and position cursor right after the dash
                              setTimeout(() => {
                                textarea.focus();
                                const newCursorPos = start + insertText.length;
                                textarea.setSelectionRange(
                                  newCursorPos,
                                  newCursorPos,
                                );
                              }, 0);
                            }}
                            className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-2 py-1 transition-all border border-zinc-200 bg-white"
                          >
                            + Bullet Point
                          </button>

                          <button
                            type="button"
                            title="Add New Paragraph Line"
                            onClick={(e) => {
                              const textarea = e.currentTarget
                                .closest(".space-y-2")
                                ?.querySelector("textarea");
                              if (!textarea) return;

                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const currentText = service.description;

                              // Insert two line breaks for a clean paragraph spacing block
                              const insertText = "\n\n";
                              const newText =
                                currentText.substring(0, start) +
                                insertText +
                                currentText.substring(end);

                              const updatedServices = [...services];
                              updatedServices[index] = {
                                ...updatedServices[index],
                                description: newText,
                              };
                              setServices(updatedServices);

                              setTimeout(() => {
                                textarea.focus();
                                const newCursorPos = start + insertText.length;
                                textarea.setSelectionRange(
                                  newCursorPos,
                                  newCursorPos,
                                );
                              }, 0);
                            }}
                            className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-2 py-1 transition-all border border-zinc-200 bg-white"
                          >
                            + New Paragraph
                          </button>
                        </div>
                      </div>

                      <Textarea
                        value={service.description}
                        onChange={(e) => {
                          const updatedServices = [...services];
                          updatedServices[index] = {
                            ...updatedServices[index],
                            description: e.target.value,
                          };
                          setServices(updatedServices);
                        }}
                        placeholder="ພິມລາຍລະອຽດທີ່ນີ້...\nໃຊ້ປຸ່ມດ້ານເທິງ ຫຼື ເຄື່ອງໝາຍ - ສໍາລັບຫົວຂໍ້ຍ່ອຍ"
                        className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-900 bg-transparent min-h-[180px] resize-none leading-relaxed text-zinc-600 font-lao"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT: IMAGE PREVIEW SECTION */}
                <div className="w-full lg:w-96 bg-zinc-50 p-8 border-l border-zinc-50">
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight flex items-center gap-2">
                      <ImageIcon className="h-3 w-3" /> Service Image
                    </label>

                    <div className="relative group/img overflow-hidden border border-zinc-200">
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="object-cover w-full h-full group-hover/img:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            {/* Use a label to trigger the hidden input */}
                            <label
                              htmlFor={`file-upload-${index}`}
                              className="cursor-pointer bg-white/90 backdrop-blur-sm px-4 py-2 text-xs uppercase font-bold hover:bg-white transition-colors"
                            >
                              <Upload className="inline mr-2 h-3 w-3" /> Replace
                              Photo
                            </label>
                            <input
                              id={`file-upload-${index}`}
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageChange(index, e.target.files[0])
                              }
                            />
                          </div>
                        </div>
                      </AspectRatio>
                    </div>

                    <p className="text-[10px] text-zinc-400 text-center italic">
                      Recommended: 800 x 600px (WebP/JPG)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="flex justify-center pt-10 pb-20">
        <p className="text-zinc-400 text-[11px] uppercase tracking-widest flex items-center gap-2">
          <Check className="h-3 w-3 text-emerald-500" /> All fields auto-save to
          draft
        </p>
      </div>
    </div>
  );
};

export default ManageOurService;
