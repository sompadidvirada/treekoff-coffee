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
import { Spinner } from "@/components/ui/spinner";
import { deleteCategory } from "api/coffee_menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
}

interface Prop {
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteCate = ({ category, setCategory }: Prop) => {
  const [isLoad, setIsLoad] = useState(false);

  const handleDelete = async () => {
    setIsLoad(true);
    try {
      const ress = await deleteCategory(category.id);
      console.log(ress);

      setCategory((prev) => prev.filter((item) => item.id != category.id));
      toast.success("ລົບໝວດໝູ່ສຳເລັດ");
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    } finally {
      setIsLoad(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-500 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-lao">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-lao">
            ລົບຢູເຊີໝວດໝູ່ "{category.name}" ອອກຈາກລະບົບ
          </AlertDialogTitle>
          <AlertDialogDescription>
            ຫລັງຈາກລົບແລ້ວ ຈະບໍ່ສາມາດກູ້ຄືນໄດ້
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoad}>ຍົກເລີກ</AlertDialogCancel>
          <AlertDialogAction disabled={isLoad} onClick={handleDelete}>
            {isLoad ? <Spinner /> : "ຢືນຢັນ"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCate;
