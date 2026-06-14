import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3, Trash2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";
import { DeleteJobDescription, EditJopDescription } from "api/job_require";
import { Spinner } from "@/components/ui/spinner";

// Types matching your Prisma model
interface JobDescription {
  id: number;
  name_lao: string;
  name_eng: string;
}

interface JobDetailDialogProps {
  jobs: JobDescription[];
  setJobs: React.Dispatch<React.SetStateAction<any[]>>;
}

export function JobDetailDialog({ jobs, setJobs }: JobDetailDialogProps) {
  const [isLoad, setIsLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const id = formData.get("id");

    const name_lao = formData.get("name_lao") as string;
    const name_eng = formData.get("name_eng") as string;

    try {
      const ress = await EditJopDescription(Number(id), {
        name_lao: name_lao,
        name_eng: name_eng,
      });
      setJobs((prev) => prev.map((item) => (item.id == id ? ress.data : item)));
      setIsOpen(false);
      toast.success(`ອັປເດດສຳເລັດ`, { className: "font-lao" });
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    } finally {
      setIsLoad(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log(id);

      await DeleteJobDescription(id);
      setJobs((prev) => prev.filter((item) => item.id != id));
      toast.success(`ລົບຕຳແໜ່ງອອກຈາກລະບົບສຳເລັດ`, { className: "font-lao" });
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    }
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      {/* TRIGGER: Using your custom button style */}
      <DialogTrigger asChild>
        <button className="group relative flex items-center gap-3 font-lao text-sm tracking-widest text-[#1A0F0A] transition-all outline-none">
          <span className="flex h-8 w-8 items-center justify-center border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
            <List size={14} strokeWidth={1.5} />
          </span>
          <span className="uppercase font-medium text-gray-400 group-hover:text-black">
            ເບີ່ງທັງໝົດ
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="min-w-3xl p-0 overflow-hidden border-none bg-white rounded-none shadow-2xl">
        {/* Premium Gold Top Accent */}
        <div className="h-1.5 w-full bg-[#D4AF37]" />

        <DialogHeader className="px-10 pt-10 pb-6 text-left">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-3xl font-light font-lao text-[#1A0F0A] tracking-tight">
              ຕຳແໜ່ງພະນັກງານ
            </DialogTitle>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-medium">
                System Job Archives
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Job List Table */}
        <div className="px-10 pb-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="py-4 font-medium text-left w-16">ID</th>
                <th className="py-4 font-medium text-left font-lao">
                  ຊື່ຕຳແໜ່ງ
                </th>
                <th className="py-4 font-medium text-left italic">
                  Position Name
                </th>
                <th className="py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs?.map((job) => (
                <tr
                  key={job.id}
                  className="group transition-all hover:bg-gray-50/50"
                >
                  <td className="py-5 text-[10px] font-mono text-gray-300">
                    {String(job.id).padStart(3, "0")}
                  </td>
                  <td className="py-5 text-sm font-lao text-[#1A0F0A]">
                    {job.name_lao}
                  </td>
                  <td className="py-5 text-xs text-gray-500 italic font-serif">
                    {job.name_eng}
                  </td>
                  <td className="py-5 text-right">
                    <div className="flex justify-end gap-3 ">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="cursor-pointer">
                            <Edit3 size={15} strokeWidth={1.5} />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-sm font-lao">
                          <DialogHeader>
                            <DialogTitle className="font-lao">
                              ແກ້ໄຂຕຳແໜ່ງ
                            </DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleEdit}>
                            <FieldGroup>
                              <Field>
                                <Label htmlFor="name-1">ຊຶ່ຕຳແໜ່ງພາສາລາວ</Label>

                                <Input
                                  id="name-1"
                                  required
                                  name="name_lao"
                                  defaultValue={job.name_lao}
                                />

                                <input
                                  type="hidden"
                                  name="id"
                                  defaultValue={job.id}
                                />
                              </Field>
                              <Field>
                                <Label htmlFor="name-1">
                                  ຊຶ່ຕຳແໜ່ງພາສາອັງກິດ
                                </Label>

                                <Input
                                  id="name-1"
                                  required
                                  name="name_eng"
                                  defaultValue={job.name_eng}
                                />
                              </Field>
                            </FieldGroup>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button disabled={isLoad} variant="outline">
                                  ຍົກເລີກ
                                </Button>
                              </DialogClose>

                              <Button disabled={isLoad} type="submit">
                                {isLoad ? <Spinner /> : "ຢືນຢັນ"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      {/**delete position job */}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost">
                            {" "}
                            <Trash2 size={15} strokeWidth={1.5} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="font-lao">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-lao">
                              ລົບຕຳແໜ່ງ{" "}
                              <span className="text-red-500">
                                "{job.name_lao}" - "{job.name_eng}"
                              </span>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              ຫລັງຈາກລົບແລ້ວ ຕຳແໜ່ງນີ້ ແລະ
                              ຂໍ້ມູນທີ່ກ່ຽວຂ້ອງກັບຕຳແໜ່ງນີ້ທັງຫມົດ
                              ຈະຖືກລົບອອກຈາກລະບົບຖາວອນ ແລະ ບໍ່ສາມາດກູ້ຄືນໄດ້
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(job.id)}
                            >
                              ຢືນຢັນ
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subtle Footer Information */}
        <div className="bg-gray-50 px-10 py-4 flex justify-between items-center">
          <span className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">
            Project: Treekoff Management
          </span>
          <span className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">
            Total Entry: {jobs?.length}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
