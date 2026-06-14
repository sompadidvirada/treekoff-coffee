import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Coffee,
  IceCream,
  Flame,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddCoffeeMenu from "./coffee_menu_component/AddCoffeeMenu";
import { Separator } from "@/components/ui/separator";
import AddCategory from "./coffee_menu_component/AddCategory";
import { toast } from "sonner";
import {
  getAllCategory,
  getAllCoffeeMenu,
  updateRecommendMenu,
} from "api/coffee_menu";
import ManageAllCategories from "./coffee_menu_component/ManageAllCategories";
import EditCoffee from "./coffee_menu_component/EditCoffee";
import DeleteCoffee from "./coffee_menu_component/DeleteCoffee";

interface Category {
  id: number;
  name: string;
}

export interface CoffeeMenu {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  type: string;
  category_id: number;
  category_name: string;
  is_recommend: boolean;
}

const ITEMS_PER_PAGE = 8;

const ManageRcmMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("ALL");
  const [filterSize, setFilterSize] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<CoffeeMenu[]>();

  useEffect(() => {
    const fecthCategory = async () => {
      try {
        const ress = await getAllCategory();
        setCategory(ress.data);
      } catch (err) {
        console.log(err);
        toast.error("ລອງໃຫ່ມພາຍຫລັງ");
      }
    };

    const fecthCoffeemenus = async () => {
      try {
        const ress = await getAllCoffeeMenu();
        setMenuItems(ress.data);
      } catch (err) {
        console.log(err);
        toast.error(`ລອງໃຫ່ມພາຍຫລັງ`);
      }
    };
    fecthCategory();
    fecthCoffeemenus();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems?.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" ||
        item.category_id.toString() === filterCategory;
      const matchesType = filterType === "ALL" || item.type === filterType;
      const matchesSize = filterSize === "all" || item.size === filterSize;
      return matchesSearch && matchesCategory && matchesType && matchesSize;
    });
  }, [searchTerm, filterCategory, filterType, filterSize, menuItems]);

  const totalPages = Math.ceil(filteredItems?.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleUpdateRCM = async (id: number, stt: boolean) => {
    try {
      await updateRecommendMenu({ is_recommend: stt }, id);
      setMenuItems((prev) =>
        prev?.map((m) => (m.id === id ? { ...m, is_recommend: stt } : m)),
      );
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    }
  };

  const selectedItems = menuItems?.filter((item) => item.is_recommend);

  // Helper to render Type Icons
  const getTypeIcon = (type: string) => {
    if (type === "HOT") return <Flame className="h-3 w-3 text-orange-400" />;
    if (type === "ICED") return <IceCream className="h-3 w-3 text-blue-400" />;
    return <Coffee className="h-3 w-3 text-emerald-400" />; // Smoothie
  };

  return (
    <div className="min-h-screen w-full bg-[oklch(1_0_0)] p-8 lg:p-12 max-w-[1400px] mx-auto space-y-10 antialiased">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-6 border-b border-zinc-100 pb-10">
        <div className="space-y-0">
          <h2 className="text-4xl font-extralight tracking-tighter text-zinc-950 uppercase">
            Recommend <span className="font-bold">Menu</span>
          </h2>
        </div>
        <div className="h-10 w-[1px] bg-zinc-200" />
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Curation Tool
          </p>
          <p className="text-xs font-lao text-zinc-500 font-medium">
            ເລືອກລາຍການເມນູແນະນຳເພື່ອສະແດງໃນໜ້າທຳອິດ
          </p>
        </div>
      </div>

      {/** manage menu */}

      <div className="flex flex-col xl:flex-row gap-6 items-center justify-between bg-zinc-50/50 p-2 rounded-lg">
        <AddCoffeeMenu category={category} setMenuItems={setMenuItems} />
        <div className="flex gap-2">
          <AddCategory setCategory={setCategory} />
          <ManageAllCategories category={category} setCategory={setCategory} />
        </div>
      </div>

      <Separator />

      {/* FILTER TOOLBAR */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-between bg-zinc-50/50 p-2 rounded-lg">
        <div className="relative w-full xl:max-w-md group ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="ຄົ້ນຫາລາຍການເມນູ..."
            className="pl-10 font-lao bg-white border-zinc-200 rounded-xm focus-visible:ring-0 focus-visible:border-zinc-900 shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          {/* Category Select */}

          <Select
            value={filterCategory}
            onValueChange={(v) => {
              setFilterCategory(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px] rounded-xm border-zinc-200 bg-white text-xs uppercase tracking-widest font-bold">
              <SelectValue placeholder="ເລືອກໝວດໝູ່" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL CATEGORY</SelectItem>
              {category?.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Select */}
          <Select
            value={filterType}
            onValueChange={(v) => {
              setFilterType(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px] rounded-xm border-zinc-200 bg-white text-xs uppercase tracking-widest font-bold">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="HOT">Hot</SelectItem>
              <SelectItem value="ICED">Iced</SelectItem>
              <SelectItem value="SMOOHTIE">Smoothie</SelectItem>
            </SelectContent>
          </Select>

          {/* Size Select */}
          <Select
            value={filterSize}
            onValueChange={(v) => {
              setFilterSize(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[110px] rounded-xm border-zinc-200 bg-white text-xs uppercase tracking-widest font-bold">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="SHORT">Medium (SHORT)</SelectItem>
              <SelectItem value="TALL">Large (TALL)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* MENU TABLE */}
      <div className="min-h-[600px]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold py-6 w-[300px]">
                Menu Item
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold">
                Category
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold">
                Type / Size
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold">
                Price
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold text-center">
                Recommend
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems?.map((item) => (
              <TableRow
                key={item.id}
                className="group border-zinc-50 transition-colors hover:bg-zinc-50/50"
              >
                <TableCell className="py-5">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-lg border border-zinc-100 shadow-sm overflow-hidden">
                      <AvatarImage src={item.image} className="object-cover" />
                      <AvatarFallback className="bg-zinc-50 text-zinc-400 text-xs">
                        TK
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-zinc-900 leading-tight">
                      {item.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="rounded-none bg-zinc-100 text-zinc-600 font-medium text-[10px] uppercase tracking-tighter"
                  >
                    {item.category_name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      {getTypeIcon(item.type)} {item.type}
                    </span>
                    <span className="text-zinc-300">|</span>
                    <span className="font-bold text-zinc-400 uppercase">
                      Size {item.size}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-zinc-900">
                  {item.price.toLocaleString()} LAK
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleUpdateRCM(item.id, !item.is_recommend)}
                    className={`rounded-full h-10 w-10 p-0 transition-all ${item.is_recommend ? "text-zinc-900 bg-zinc-100 shadow-inner" : "text-zinc-200 hover:text-zinc-400"}`}
                  >
                    <Star
                      className={`h-5 w-5 ${item.is_recommend ? "fill-yellow-400" : ""}`}
                    />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditCoffee
                      coffee={item}
                      category={category}
                      setCoffee={setMenuItems}
                    />
                    <DeleteCoffee coffee={item} setCoffee={setMenuItems} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION CONTROLS */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
        <p className="text-[11px] text-zinc-400 uppercase tracking-widest">
          Showing {paginatedItems?.length} of {filteredItems?.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-none h-8 w-8 border-zinc-200"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                className={`rounded-none h-8 w-8 text-[11px] ${currentPage === page ? "bg-zinc-900" : "text-zinc-400"}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-none h-8 w-8 border-zinc-200"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* FOOTER ACTION (Dialog code same as your previous version) */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-8">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {selectedItems?.slice(0, 3).map((item) => (
              <Avatar
                key={item.id}
                className="h-8 w-8 border-2 border-white shadow-sm"
              >
                <AvatarImage src={item?.image} className="object-cover" />
              </Avatar>
            ))}
          </div>
          <p className="text-[11px] text-zinc-400 uppercase tracking-widest font-medium">
            {selectedItems?.length} Menus Curated
          </p>
        </div>

        <div className="flex gap-4">
          {/* --- PREVIEW DIALOG --- */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-none border-zinc-200 text-xs uppercase tracking-widest h-11 px-8 hover:bg-zinc-50 transition-all"
              >
                <Eye className="mr-2 h-4 w-4" /> Preview Selection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] lg:max-w-[80vw] h-[90vh] md:h-[90vh] flex flex-col p-0 border-none rounded-none bg-white shadow-2xl overflow-hidden">
              {" "}
              <div className="flex flex-col h-full">
                {/* Dialog Header */}
                <DialogHeader className="p-10 border-b border-zinc-50">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <DialogTitle className="text-3xl font-extralight tracking-tighter uppercase text-zinc-900">
                        Recommend <span className="font-bold">Lookbook</span>
                      </DialogTitle>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                        Spring Collection • Treekoff Coffee
                      </p>
                    </div>
                  </div>
                </DialogHeader>

                {/* Grid Display */}
                <div className="flex-1 overflow-y-auto p-10">
                  {selectedItems?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                      {selectedItems?.map((item) => (
                        <div key={item.id} className="group space-y-4">
                          <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50">
                            <img
                              src={item.image}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-4 right-4 h-6 w-6 bg-zinc-900 text-white flex items-center justify-center rounded-full">
                              <Check className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-tight">
                              {item.name}
                            </h4>
                            <div className="flex justify-between text-[11px] text-zinc-400 uppercase tracking-widest">
                              <span>{item.category_id}</span>
                              <span>{item.price.toLocaleString()} LAK</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-zinc-300">
                      <p className="text-sm uppercase tracking-widest">
                        No items currently selected
                      </p>
                    </div>
                  )}
                </div>

                {/* Dialog Footer Actions */}
                <div className="p-10 bg-zinc-50/50 flex justify-end gap-4 border-t border-zinc-100">
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-none text-xs uppercase tracking-widest px-8"
                    >
                      Close
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ManageRcmMenu;
