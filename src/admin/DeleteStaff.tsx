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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { DeleteStaffApi } from "api/staff";
import { useState } from "react";
import { toast } from "sonner";

interface EditStaffProps {
  staff: any;
  setStaffs: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteStaffDialog = ({ staff, setStaffs }: EditStaffProps) => {
  const [isLoad, setIsLoad] = useState(false)
  const handleSubmit = async () => {
    setIsLoad(true)
    try {
      const ress = await DeleteStaffApi(staff.id);
      console.log(ress);
      setStaffs((prev) => prev.filter((item) => item.id != staff.id));
      toast.success(`ລົບໄອດີ "${staff.name}" ອອກຈາກລະບົບສຳເລັດ`);
    } catch (err) {
      console.log(err);
      toast.error("ລອງໄຫ່ມພາຍຫລັງ");
    } finally {
      setIsLoad(false)
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
          className="rounded-lg cursor-pointer focus:bg-red-50 focus:text-red-600 gap-2 text-red-500"
        >
          ລົບຢູເຊີນີ້
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-lao">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-lao">
            ລົບຢູເຊີ "{staff.name}" ອອກຈາກລະບົບ
          </AlertDialogTitle>
          <AlertDialogDescription>
            ຫລັງຈາກລົບແລ້ວ ຈະບໍ່ສາມາດກູ້ຄືນໄດ້
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoad}>ຍົກເລີກ</AlertDialogCancel>
          <AlertDialogAction disabled={isLoad} onClick={handleSubmit}>{isLoad ? <Spinner />  : "ຢືນຢັນ"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStaffDialog;
