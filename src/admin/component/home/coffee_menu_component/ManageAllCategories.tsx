import React, { useState } from "react";
import { 
  ListOrdered, 
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditCate from "./EditCate";
import DeleteCate from "./DeleteCate";

interface Category {
  id: number;
  name: string;
}



type Props = {
  category: Category[];
  setCategory: React.Dispatch<React.SetStateAction<any[]>>
};


// Mock data - in real app, pass this as a prop or fetch it


const ManageAllCategories = ({category, setCategory}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");


  // Filter categories based on search
  const filteredCategories = category?.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-lao gap-2">
          <ListOrdered className="h-4 w-4" /> ຈັດການໝວດໝູ່ທັງໝົດ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl font-lao max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            ລາຍການໝວດໝູ່ທັງໝົດ
          </DialogTitle>
          <p className="text-sm text-zinc-500">
            ເບິ່ງ, ແກ້ໄຂ ຫຼື ລຶບໝວດໝູ່ສິນຄ້າຂອງທ່ານ
          </p>
        </DialogHeader>

        {/* SEARCH BAR */}
        <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="ຄົ້ນຫາໝວດໝູ່..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE SECTION */}
        <div className="border rounded-md overflow-hidden flex-1 overflow-y-auto">
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>ຊື່ໝວດໝູ່</TableHead>
                <TableHead className="text-right">ຈັດການ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.id} className="group">
                    <TableCell className="font-mono text-xs text-zinc-500">
                      #{category.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditCate category={category} setCategory={setCategory} />
                        <DeleteCate category={category} setCategory={setCategory} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-zinc-400">
                    ບໍ່ພົບຂໍ້ມູນໝວດໝູ່
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-between items-center text-xs text-zinc-400 uppercase tracking-widest">
          <span>Total: {filteredCategories.length} Items</span>
          <Button variant="link" size="sm" onClick={() => setSearchTerm("")}>
            Reset Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAllCategories;