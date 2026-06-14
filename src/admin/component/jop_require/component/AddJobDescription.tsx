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
import { Spinner } from "@/components/ui/spinner";
import { CreateJobDescription } from "api/job_require";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Prop {
  setJobs: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddJobDescription = ({ setJobs }: Prop) => {
  const [isLoad, setIsLoad] = useState(false);
  const [open, setOpen] = useState(false)

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nameLao = formData.get("name_lao") as string;
    const nameEng = formData.get("name_eng") as string;
    
    try {
      const ress = await CreateJobDescription({
        name_lao: nameLao,
        name_eng: nameEng,
      });

      setJobs((prev) => [...prev, ress.data]);
      setOpen(false)
      toast.success(`ເພີ່ມຕຳແໜ່ງ ${nameLao} ສຳເລັດ`, { className: "font-lao" });
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    } finally {
      setIsLoad(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group relative flex items-center gap-3 font-lao text-sm tracking-widest text-[#1A0F0A] transition-all">
          <span className="flex h-8 w-8 items-center justify-center border border-gray-200 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
            <Plus size={14} strokeWidth={1.5} />
          </span>
          <span className="uppercase font-medium font-lao">
            ເພີ່ມຕຳແໜ່ງໃຫ່ມ
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm font-lao">
        <form onSubmit={handleSave}>
          {" "}
          <DialogHeader>
            <DialogTitle className="font-lao mb-5 font-xl">
              ເພີ່ມຕຳແໜ່ງເປິດຮັບສະໝັກງານ
            </DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-lao">ຊື່ຕຳແໜ່ງພາສາລາວ</Label>
              <Input required id="name-lao" name="name_lao" />
            </Field>
            <Field>
              <Label htmlFor="name-eng">ຊື້ຕຳແໜ່ງພາສາອັງກິດ</Label>
              <Input required id="name-eng" name="name_eng" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isLoad} variant="outline">
                ຍົກເລີກ
              </Button>
            </DialogClose>
            <Button disabled={isLoad} type="submit">
              {isLoad ? <Spinner /> : "ສົ່ງຟອມ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDescription;
