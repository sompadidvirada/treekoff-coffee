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
import { Button } from "@/components/ui/button";
import { deleteNews } from "api/news";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Prop {
  annountment: any;
  setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteAnnountment = ({ annountment, setAnnouncements }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const handleDelete = async () => {
    setIsLoad(true);
    try {
      await deleteNews(annountment.id);
      setAnnouncements((prev) =>
        prev.filter((item) => item.id != annountment.id),
      );
      toast.success("ລົບບົດຄວາມສຳເລັດ", { className: "font-lao" });
    } catch (err) {
      console.log(err);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ", { className: "font-lao" });
    } finally {
      setIsOpen(false);
      setIsLoad(false);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="h-8 w-8 text-zinc-400 hover:text-red-500"
        >
          <Trash2 size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-lao">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-lao">
            ທ່ານຕ້ອງການລົບບົດຄວາມນີ້ແທ້ບໍ່ "{annountment.title}" ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            ການລົບນີ້ຈະເປັນການລົບບົດຄວາມນີ້ອອກຈາກບະບົບ
            ລວມໄປເຖິງຮູບພາບຂອງບົດຄວາມດັ່ງກ່າວ
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoad}>ຍົກເລີກ</AlertDialogCancel>
          <AlertDialogAction disabled={isLoad} onClick={handleDelete}>
            ຢືນຢັນ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAnnountment;
