import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserCog, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddStaffDialog from "./AddStaffDialog";
import { getAllStaff } from "../../api/home_cover_image";
import { EditStaffDialog } from "./EditStaffDialog";
import ClearPasswordDialog from "./ClearPasswordDialog";
import DeleteStaffDialog from "./DeleteStaff";

type Staffs = {
  name: string
  role: string
  id: number
  image: string
  available: boolean
  phone: string
  create_at: string
}

const ManageUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);

  const [staffs, setStaffs] = useState<Staffs[]>([]);

  // 1. Logic for filtering
  const filteredStaffs = React.useMemo(() => {
    return staffs?.filter((staff) => {
      // Search by Name (case-insensitive)
      const matchesSearch = staff.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by Role
      const matchesRole = roleFilter === "ALL" || staff.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [staffs, searchTerm, roleFilter]);

  useEffect(() => {
    const fecthStaffs = async () => {
      try {
        const ress = await getAllStaff();
        setStaffs(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthStaffs();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4 font-lao">
      {/* ສ່ວນຫົວຂໍ້ */}
      <div className="flex items-center gap-2">
        <UserCog className="h-6 w-6 text-muted-foreground" />
        <h2 className="text-xl font-bold tracking-tight">
          ຈັດການຂໍ້ມູນພະນັກງານ
        </h2>
      </div>

      {/* ສ່ວນ Filter ແລະ Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-2 w-full md:max-w-sm">
          <div className="relative w-full border border-black/10 rounded-xl">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ຄົ້ນຫາຊື່ພະນັກງານ..."
              className="pl-9 bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-white/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select
            onValueChange={(value) => setRoleFilter(value)}
            value={roleFilter} // Add this to keep it controlled
          >
            <SelectTrigger className="w-[180px] bg-muted/20 capitalize">
              <SelectValue placeholder="ເລືອກຕຳແໜ່ງ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">ທັງໝົດ</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="STAFF">STAFF</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setIsOpen(true)}
            className="bg-white text-black hover:bg-zinc-200 cursor-pointer"
            variant="outline"
          >
            ເພີ່ມພະນັກງານ
          </Button>
        </div>
      </div>

      {/* ຕາຕະລາງລາຍຊື່ */}
      <div className="rounded-xl border border-black/10 bg-muted/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="w-[80px]">ຮູບພາບ</TableHead>
              <TableHead>ຊື່ພະນັກງານ</TableHead>
              <TableHead>ເບີໂທລະສັບ</TableHead>
              <TableHead>ຕຳແໜ່ງ</TableHead>
              <TableHead>ສະຖານະ</TableHead>
              <TableHead>ວັນທີເຂົ້າວຽກ</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaffs?.map((staff) => (
              <TableRow
                key={staff.id}
                className="border-black/15 hover:bg-black/20 transition-colors"
              >
                <TableCell>
                  <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src={staff.image || ""} />
                    <AvatarFallback className="bg-zinc-800 text-xs">
                      {staff.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-gray">
                  {staff.name}
                </TableCell>
                <TableCell>{staff.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-white/20 font-light uppercase"
                  >
                    {staff.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {staff.available ? (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-emerald-500">
                        ກຳລັງເຮັດວຽກ
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-zinc-500" />
                      <span className="text-xs text-muted-foreground">
                        ພັກວຽກ
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(staff.create_at).toLocaleDateString("en-CA")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-xl font-lao border-zinc-100 shadow-xl bg-white p-1"
                    >
                      {" "}
                      <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-zinc-400 px-2 py-1.5">
                        ແກ້ໄຂ
                      </DropdownMenuLabel>
                      {/* dialog edit staff */}
                      <EditStaffDialog staff={staff} setStaffs={setStaffs} />

                       <DropdownMenuSeparator className="bg-zinc-50" />

                      {/** clear password dialog */}
                      <ClearPasswordDialog staff={staff} />
                      <DropdownMenuSeparator className="bg-zinc-50" />


                      <DeleteStaffDialog staff={staff} setStaffs={setStaffs} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {filteredStaffs?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground italic"
                >
                  ບໍ່ພົບຂໍ້ມູນພະນັກງານທີ່ທ່ານຄົ້ນຫາ...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/**dialog add user */}
      <AddStaffDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setStaffs={setStaffs}
      />
    </div>
  );
};

export default ManageUser;
