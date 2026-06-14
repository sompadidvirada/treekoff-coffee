import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UpdateRoleAndAvailable } from "api/staff";

interface EditStaffProps {
  staff: any;
  setStaffs: React.Dispatch<React.SetStateAction<any[]>>;
}

export const EditStaffDialog = ({ staff, setStaffs }: EditStaffProps) => {
  const [role, setRole] = useState(staff?.role || "staff");
  const [available, setAvailable] = useState(staff?.available ?? true);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = async (id: number) => {
    setLoading(true);
    try {
      const ress = await UpdateRoleAndAvailable(
        { role: role, available: available },
        id,
      );
      console.log(ress);
      setStaffs((prev) =>
        prev.map((item) =>
          item.id == staff.id
            ? { ...item, role: role, available: available }
            : item,
        ),
      );
      toast.success("ອັບເດດຂໍ້ມູນສຳເລັດ", { className: "font-lao" });
      handleClose();
    } catch (error) {
      toast.error("ບໍ່ສາມາດອັບເດດໄດ້", { className: "font-lao" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="rounded-lg cursor-pointer focus:bg-zinc-50 focus:text-zinc-900 gap-2 text-zinc-600"
      >
        ແກ້ໄຂສິດຢູເຊິ
      </DropdownMenuItem>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] font-lao">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium font-lao tracking-tight">
              ແກ້ໄຂສິດທິພະນັກງານ
            </DialogTitle>
            <p className="text-sm text-zinc-500">
              ປ່ຽນແປງຕຳແໜ່ງ ຫຼື ສະຖານະການເຮັດວຽກຂອງ {staff?.name}
            </p>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Role Selection */}
            <div className="grid gap-2">
              <Label htmlFor="role">ຕຳແໜ່ງ (Role)</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="ເລືອກຕຳແໜ່ງ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between p-3 border rounded-lg bg-zinc-50">
              <div className="space-y-0.5">
                <Label>ສະຖານະພະນັກງານ</Label>
                <p className="text-xs text-zinc-500">
                  ເປີດ-ປິດ ການເຂົ້າເຖິງລະບົບຂອງພະນັກງານ
                </p>
              </div>
              <Switch checked={available} onCheckedChange={setAvailable} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              ຍົກເລີກ
            </Button>
            <Button
              onClick={() => handleUpdate(staff.id)}
              disabled={loading}
              className="bg-zinc-900"
            >
              {loading ? "ກຳລັງບັນທຶກ..." : "ບັນທຶກການປ່ຽນແປງ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
