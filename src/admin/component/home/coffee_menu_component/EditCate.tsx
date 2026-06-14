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
import { editCategory } from "api/coffee_menu";
import { number } from "framer-motion";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
}

type Prop = {
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
};

const EditCate = ({ category, setCategory }: Prop) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    try {
      const ress = await editCategory(category.id, formData);
      setCategory((prev) =>
        prev.map((item) =>
          item.id == category.id ? { ...item, name: name } : item,
        ),
      );
      setOpen(false)
      toast.success(`ແກ້ໄຂໝວດໝູ່ສຳເລັດ`, {className:"font-lao"})
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="submit"
          className="h-8 w-8 text-zinc-500 hover:text-blue-600"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm font-lao">
        {/* Move the form here */}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-lao">ແກ້ໄຂໝວດໝູ່ເມນຸ</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">ຊື່ໝວດໝູ່</Label>
              <Input id="name" name="name" required  defaultValue={category.name}/>
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

export default EditCate;
