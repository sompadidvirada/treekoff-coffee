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
import { AddCategoryCoffeeMenu } from "api/coffee_menu";
import { ListPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Prop {
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddCategory = ({ setCategory }:Prop) => {
  const [open, setOpen] = useState(false);
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");

    try {
      const ress = await AddCategoryCoffeeMenu(formData);
      setCategory((prev) => [...prev, ress.data]);

      toast.success(`ເພີ່ມໝວດໝູ່ສຳເລັດ ${name} ສຳເລັດ`, {
        className: "font-lao",
      });
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("ລອງໃຫ່ມພາຍຫລັງ", { className: "font-lao" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-lao">
          <ListPlus className="w-4 h-4" />
          ເພີ່ມໝວດໝູ່ເມນຸ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm font-lao">
        {/* Move the form here */}
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle className="font-lao">ເພີ່ມໝວດໝູ່ເມນຸ</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">ຊື່ໝວດໝູ່</Label>
              <Input id="name" name="name" required />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                ຍົກເລີກ
              </Button>
            </DialogClose>
            <Button type="submit">ສົ່ງຟອມ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
