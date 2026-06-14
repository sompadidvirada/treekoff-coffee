import { useState } from "react";
import { StarIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateScoreBranch } from "api/branches";

interface Prop {
  branch: any;
  setBranch: React.Dispatch<React.SetStateAction<any[]>>;
}

const EditQcScore = ({ branch, setBranch }: Prop) => {
  const [qcRating, setQcRating] = useState(branch.qc_rating?.toFixed(2));

  const handleUpdateQc = async () => {
    const rating = Number(qcRating);

    if (rating < 0 || rating > 100) {
      toast.error("QC Rating must be between 0.00 and 100.00");
      return;
    }

    try {
      const ress = await updateScoreBranch(branch.id, { score: rating });
      console.log(ress.data);
      toast.success(`ອັປເດດຂະແນນ QC ສຳເລັດ`);

      setBranch((prev) =>
        prev.map((item) =>
          item.id == branch.id ? { ...item, qc_rating: rating } : item,
        ),
      );
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`);
    }
    // API CALL HERE
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-[10px] uppercase tracking-widest py-3 cursor-pointer"
        >
          <StarIcon size={12} className="mr-3" />
          Edit QC Score
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md border-0 rounded-3xl p-0 overflow-hidden">
        {/* BODY */}
        <div className="px-8 py-8 space-y-6 bg-white">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                Quality Control Score
              </label>

              <span className="text-xs text-zinc-400 font-medium">
                0.00 — 100.00
              </span>
            </div>

            <div className="relative">
              <Input
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={qcRating}
                onChange={(e) => setQcRating(e.target.value)}
                placeholder="0.00"
                className="h-16 rounded-2xl border-zinc-200 bg-zinc-50 text-3xl font-bold text-center tracking-tight focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              />

              <div className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                QC
              </div>
            </div>

            <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-300">
              <span>Minimum: 0.00</span>
              <span>Maximum: 100.00</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <AlertDialogFooter className="px-8 py-6 bg-zinc-50 border-t border-zinc-100">
          <AlertDialogCancel className="rounded-xl border-zinc-200">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleUpdateQc}
            className="rounded-xl bg-[#1A0F0A] hover:bg-[#2B1810] text-white px-6"
          >
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditQcScore;
