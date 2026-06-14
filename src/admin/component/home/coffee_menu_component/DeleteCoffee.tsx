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
import { deleteCoffeeMenu } from "api/coffee_menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CoffeeMenu } from "../ManageRcmMenu";

interface Prop {
  coffee: CoffeeMenu;
  setCoffee: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteCoffee = ({ coffee, setCoffee }: Prop) => {
  const [isLoad, setIsLoad] = useState(false);

  const handleDelete = async () => {
    setIsLoad(true);
    try {
      const ress = await deleteCoffeeMenu(coffee.id);
      console.log(ress);
      setCoffee((prev) => prev.filter((item) => item.id != coffee.id));
      toast.success(`ລົບເມນູ "${coffee.name}" ອອກຈາກລະບົບສຳເລັດ`, {
        className: "font-lao",
      });
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="font-lao">
          <Trash2 className="w-4 h-4" /> ລົບເມນູ
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-lao">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-lao">
            ລົບຢູເມນູ "{coffee.name}" ອອກຈາກລະບົບ
          </AlertDialogTitle>
          <AlertDialogDescription>
            ຫລັງຈາກລົບແລ້ວເມນູນີ້ແລ້ວຂໍ້ມູນຂອງເມນູນີ້ທັງໝົດຈະຖຶກລົບອອກຈາກລະບົບ
            ແລະ ຈະບໍ່ສາມາດກູ້ຄືນໄດ້
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

export default DeleteCoffee;
