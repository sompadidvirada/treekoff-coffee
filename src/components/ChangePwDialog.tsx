import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ChangePasswordStaff } from "api/staff";
import { Spinner } from "./ui/spinner";

interface Prop {
  user: any;
}

const ChangePwDialog = ({ user }: Prop) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false)

  console.log(user);

  const handleChangePw = async () => {
    setIsLoad(true)
    const payload = {
      id: user.id,
      old_password: oldPassword,
      new_password: newPassword,
    };
    try {
      const ress = await ChangePasswordStaff(payload);
      console.log(ress);
      toast.success("ປ່ຽນລະຫັດຜ່ານສຳເລັດ", { className: "font-lao" });
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ", { className: "font-lao" });
    } finally {
        setOldPassword: ""
        setNewPassword: ""
        setIsLoad(false)
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <KeyRound size={18} />
          <span className="cursor-pointer font-medium font-lao">
            ປ່ຽນລະຫັດຜ່ານ
          </span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm font-lao">
        <DialogHeader>
          <DialogTitle className="font-lao">ປ່ຽນລະຫັດຜ່ານ</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="old_password">ລະຫັດຜ່ານເກົ່າ</Label>
            <Input
              id="old_password"
              name="old_password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="new_password">ລະຫັດຜ່ານໃຫ່ມ</Label>
            <Input
              id="new_password"
              name="new_password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoad} variant="outline">ຍົກເລີກ</Button>
          </DialogClose>
          <Button disabled={isLoad} onClick={handleChangePw}>{isLoad ? <Spinner /> : "ຢືນຢັນ"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePwDialog;
