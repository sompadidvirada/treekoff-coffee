import React, { useState } from "react";
import { CirclePlus, Upload, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addCoffeeMenu } from "api/coffee_menu";
import { Spinner } from "@/components/ui/spinner";

interface Category {
  id: number;
  name: string;
}

interface Prop {
  category: Category[];
  setMenuItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddCoffeeMenu = ({ category, setMenuItems }: Prop) => {
  // 1. States for form data and preview
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cate, setCate] = useState<number | null>(null);
  const [isLoad, setIsLoad] = useState(false);
  const [open, setOpen] = useState(false);

  // 2. Handle Image Selection
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // 3. Prepare and Submit FormData
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);
    if (!selectedFile)
      return toast.error(`ຕ້ອງອັປໂຫລດຮູບພາບຂອງເມນູ`, { className: "font-lao" });
    const formData = new FormData(e.currentTarget);
    if (!cate) return toast.error(`ກະລຸນາເລືອກໝວດໝູ່ກ່ອນ`);

    formData.append("category_id", cate.toString());

    // Add the image file manually if it exists
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    const name = formData.get("name");

    try {
      const ress = await addCoffeeMenu(formData);
      setMenuItems((prev) => [...prev, ress.data]);
      setOpen(false);
      toast.success(`ເພີ່ມເມນູ "${name} ສຳເລັດ"`, {className:"font-lao"});

      setSelectedFile(null)
      setPreviewUrl(null)
      setIsLoad(false);
    } catch (error) {
      console.error(error);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);

        if (!open) {
          setPreviewUrl(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="font-lao">
          <CirclePlus className="w-4 h-4" /> ເພີ່ມເມນູໃໝ່
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="font-lao">ເພີ່ມເມນູກາເຟ</DialogTitle>
          </DialogHeader>

          <FieldGroup className="space-y-4 font-lao">
            {/* IMAGE UPLOAD SECTION */}
            <Field className="space-y-2">
              <Label>ຮູບພາບເມນູ</Label>
              <div className="flex flex-col items-center justify-center gap-4">
                {previewUrl ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-200">
                    <img
                      src={previewUrl}
                      className="object-contain w-full h-full"
                      alt="Preview"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-200 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                      <p className="text-xs text-zinc-500 font-lao">
                        ກົດເພື່ອອັບໂຫລດຮູບ
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={onImageChange}
                    />
                  </label>
                )}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="name">ຊື່ເມນູ</Label>
                <Input id="name" name="name" required className="font-lao" />
              </Field>
              <Field>
                <Label htmlFor="price">ລາຄາ</Label>
                <Input id="price" name="price" type="number" required min={0} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label>ຂະໜາດ</Label>
                <Select name="size">
                  <SelectTrigger>
                    <SelectValue placeholder="ເລືອກ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SHORT">SHORT</SelectItem>
                    <SelectItem value="TALL">TALL</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label>ປະເພດ</Label>
                <Select name="type">
                  <SelectTrigger>
                    <SelectValue placeholder="ເລືອກ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOT">ຮ້ອນ</SelectItem>
                    <SelectItem value="ICED">ເຢັນ</SelectItem>
                    <SelectItem value="SMOOHTIE">ປັ່ນ</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <Label>ໝວດໝູ່</Label>
              <Select onValueChange={(value) => setCate(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="ເລືອກໝວດໝູ່" />
                </SelectTrigger>

                <SelectContent>
                  {category.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="font-lao"
                disabled={isLoad}
              >
                ຍົກເລີກ
              </Button>
            </DialogClose>
            <Button type="submit" className="font-lao">
              {isLoad ? <Spinner /> : "ບັນທຶກເມນູ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoffeeMenu;
