import React, { useEffect, useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  deleteHomeCoverImage,
  getAllHomeCoverImage,
  UpdatStatusHomeCoverImage,
  uploadHomeCoverImage,
} from "api/home_cover_image";
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


const ManageHome = () => {
  const [covers, setCovers] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    try {
      const ress = await uploadHomeCoverImage(formData);
      toast.success("ອັປໂຫລດສຳເລັດ", { className: "fomt-lao" });
      setCovers((prev) => [...prev, ress.data]);
    } catch (err) {
      console.log(err);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ", { className: "fomt-lao" });
    } finally {
      setIsUploading(false);
    }
  };

  const fecthHomeCover = async () => {
    try {
      const ress = await getAllHomeCoverImage();
      setCovers(ress.data);
    } catch (err) {
      console.log(err);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ");
    }
  };

  const handleUpdateStatus = async (id: number, status: boolean) => {
    try {
      await UpdatStatusHomeCoverImage(id, { status: status });

      setCovers((prev) =>
        prev.map((item) =>
          item.id == id ? { ...item, status: status } : item,
        ),
      );
      toast.success("ອັປເດດສຳເລັດ", { className: "font-lao" });
    } catch (err) {
      console.log(err);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ", { className: "font-lao" });
    }
  };

  useEffect(() => {
    fecthHomeCover();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteHomeCoverImage(id);

      toast.success("ລົບຮຸບພາບສຳເລັດ", { className: "fomt-lao" });
      setCovers((prev) => prev.filter((item) => item.id != id));
    } catch (err) {
      console.log(err);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ", { className: "font-lao" });
    }
  };

  console.log(covers);
  return (
    <div className="min-h-screen w-full p-8 max-w-[1600px] mx-auto space-y-10 antialiased">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b pb-8 border-zinc-100">
        <div className="space-y-2">
          <span className="inline-block px-2 py-0.5 rounded-full bg-zinc-100 text-[9px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-200">
            Management Portal
          </span>
          <h2 className="text-4xl font-light tracking-tighter text-zinc-900">
            Home <span className="italic font-serif">Covers</span>
          </h2>
          <p className="text-xs font-lao text-zinc-400 tracking-wide uppercase">
            ການຈັດການຮູບພາບ Home Page Cover • treekoff.coffee
          </p>
        </div>

        <div className="flex gap-3">
          <input
            onChange={handleFileChange}
            accept="image/*"
            type="file"
            id="cover-upload"
            className="hidden"
          />
          <Button
            asChild
            disabled={isUploading}
            className="bg-zinc-900 font-lao text-white hover:bg-zinc-800 rounded-none h-12 px-8 transition-all shadow-lg shadow-zinc-200 cursor-pointer"
          >
            <label htmlFor="cover-upload">
              {isUploading ? (
                "ກຳລັງໂຫລດ..."
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> ອັປໂຫລດຮູບໜ້າປົກໃຫ່ມ
                </>
              )}
            </label>
          </Button>
        </div>
      </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {covers.map((cover) => (
          <div
            key={cover.id}
            className="relative aspect-[2/1] overflow-hidden bg-zinc-900 group"
          >
            <img
              src={cover.image}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pt-40 p-8 flex justify-between items-end">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleUpdateStatus(cover.id, !cover.status)}
                  size="icon"
                  className="bg-white cursor-pointer text-black rounded-full h-10 w-10"
                >
                  <Star
                    fill={cover.status ? "#facc15" : ""}
                    className="h-4 w-4"
                  />
                </Button>
                {/** dialog confirm delete home cover image */}{" "}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      className="bg-red-500 cursor-pointer text-white rounded-full h-10 w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="font-lao">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-lao">
                        ຢືນຢັນການລົບຮູບພາບ
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        ການລົບນີ້ຈະເປັນການລົບຮູບພາບອອກຈາກລະບົບຖາວອນ,
                        ຈະບໍ່ສາມາດກູ້ຄືນຮູບພາບພາຍຫລັງໄດ້.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        className="cursor-pointer"
                        disabled={isUploading}
                      >
                        ຍົກເລີກ
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="cursor-pointer"
                        onClick={() => handleDelete(cover.id)}
                        variant="destructive"
                        disabled={isUploading}
                      >
                        ຢືນຢັນ
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageHome;
