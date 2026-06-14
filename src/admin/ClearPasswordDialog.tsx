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
import { ClearPasswordStaffByAdmin } from "api/staff";
import { toast } from "sonner";

interface EditStaffProps {
  staff: any;
}

const ClearPasswordDialog = ({ staff }: EditStaffProps) => {


  const handleSubmit = async () => {
    try {
        const ress = await ClearPasswordStaffByAdmin(staff.id)
        console.log(ress)
        toast.success(`ລ້າງລະຫັດຜ່ານໄອດີ "${staff.name}" ສຳເລັດ`)
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`)
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
          className="rounded-lg  cursor-pointer focus:bg-zinc-50 focus:text-zinc-900 gap-2 text-zinc-600"
        >
          ລ້າງລະຫັດຢູເຊີ
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-lao">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-lao">
            ລ້າງລະຫັດຢູເຊີ "{staff.name}"
          </AlertDialogTitle>
          <AlertDialogDescription>
            ຫລັງຈາກລ້າງລະຫັດແລ້ວ ລະຫັດຢູ່ເຊີດັ່ງກ່າວຈະການເປັນລະຫັດພື້ນຖານ "123"
            ແນະນຳໃຫ້ຢູ່ເຊີດັ່ງກ່າວປ່ຽນລະຫັດ ເພື່ອຄວາມປອດໄພຂອງການໃຊ້ງານ
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>ຢືນຢັນ</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearPasswordDialog;
