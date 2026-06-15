import { useEffect, useState } from "react";
import { Pin, Edit3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditAnnouncementDialog from "./component/EditAnnouncementDialog";
import { GetAllNews, updatePinNews } from "api/news";
import AddAnnounment from "./component/AddAnnounment";
import DeleteAnnountment from "./component/DeleteAnnountment";
import { toast } from "sonner";

const ManageAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Logic to calculate displayed items
  const [totalItems, setTotalItems] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = announcements;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fecthNews = async () => {
      try {
        const ress = await GetAllNews({
          page: currentPage,
          limit: itemsPerPage,
        });
        setAnnouncements(ress.data.data);
        setTotalItems(ress.data.total_count);
      } catch (err) {
        console.log(err);
      }
    };
    fecthNews();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePin = async (id: number, status: boolean) => {
    try {
      await updatePinNews(id, { status: status });
      setAnnouncements((prev) =>
        prev.map((ann) => {
          if (status === true) {
            return ann.id === id
              ? { ...ann, status: true }
              : { ...ann, status: false };
          } else {
            return ann.id === id ? { ...ann, status: false } : ann;
          }
        }),
      );
      toast.success(`ອັປເດດປັກຫມຸດສຳເລັດ`, { className: "font-lao" });
    } catch (err) {
      console.log(err);
      toast.error(`ລອງໃຫ່ມພາຍຫລັງ`, { className: "font-lao" });
    }
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleEditClick = (ann) => {
    setSelectedAnnouncement(ann);
    setIsEditDialogOpen(true);
  };

  const handleOnCloseDialogEdit = () => {
    setIsEditDialogOpen(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="min-h-screen bg-[oklch(1_0_0)] p-8 lg:p-12 max-w-[1600px] mx-auto antialiased">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-100 pb-10 mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-extralight tracking-tighter text-zinc-950 uppercase">
            Corporate <span className="font-bold">News</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-900" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
              Announcement & Communication Hub
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {/* LEFT: FORM SECTION (Create/Edit) */}
        <AddAnnounment
          setAnnouncements={setAnnouncements}
          setTotalItems={setTotalItems}
        />

        {/* RIGHT: DISPLAY LIST */}

        <div className="flex flex-col min-h-[70vh]">
          <div className="flex items-center justify-between mb-10">
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, totalItems)} of {totalItems} News
            </p>
          </div>

          <div className="space-y-12 flex-grow">
            {currentItems?.map((item) => (
              <div
                key={item.id}
                className={`relative group border-l-4 transition-all duration-500 p-8 ${
                  item.status
                    ? "border-amber-400 bg-amber-100/50 shadow-sm" // Styles for PINNED
                    : "border-zinc-100 bg-transparent" // Styles for NORMAL
                }`}
              >
                {item.status && (
                  <div className="absolute top-0 right-0 p-4">
                    <Pin size={16} className="text-blue-900 fill-zinc-900" />
                  </div>
                )}

                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-zinc-900 tracking-tighter font-lao">
                        {item.title}
                      </h3>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase font-lao">
                        {item.sub_title}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase font-lao">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePin(item.id, !item.status)}
                        className="h-8 w-8 text-zinc-400 hover:text-zinc-900"
                      >
                        <Pin
                          size={14}
                          className={
                            item.status ? "fill-zinc-900 text-zinc-900" : ""
                          }
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(item)}
                        className="h-8 w-8 text-zinc-400 hover:text-zinc-900"
                      >
                        <Edit3 size={14} />
                      </Button>

                      <DeleteAnnountment
                        annountment={item}
                        setAnnouncements={setAnnouncements}
                      />
                    </div>
                  </div>

                  <p className="text-sm font-lao leading-relaxed text-zinc-500 max-w-2xl">
                    {item.description}
                  </p>

                  {/* Dynamic Image Grid */}
                  <div
                    className={`grid gap-4 ${
                      item.articles_image?.length === 1
                        ? "grid-cols-1"
                        : item.articles_image?.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-3"
                    }`}
                  >
                    {item.articles_image?.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative overflow-hidden bg-zinc-100 ${item.articles_image.length == 1 ? "aspect-[21/9]" : "aspect-square"}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4 text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                    <span>Created: {item.created_at}</span>
                    <span className="h-[1px] w-12 bg-zinc-100" />
                    <span className="text-zinc-400 italic">
                      Bigtree Admin Panel
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State if no items */}
            {announcements.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center border border-dashed border-zinc-200">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400">
                  No announcements found
                </p>
              </div>
            )}
          </div>

          {/* --- PREMIUM PAGINATION FOOTER --- */}
          {totalPages > 1 && (
            <div className="mt-20 pt-8 border-t border-zinc-100 flex items-center justify-between">
              <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-none text-[10px] uppercase tracking-widest gap-2 disabled:opacity-20"
              >
                <ChevronLeft size={14} /> Previous
              </Button>

              <div className="flex items-center gap-6">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`text-[10px] font-bold transition-all duration-300 ${
                      currentPage === i + 1
                        ? "text-zinc-950 scale-125 underline underline-offset-8"
                        : "text-zinc-300 hover:text-zinc-500"
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                disabled={currentPage === totalItems}
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-none text-[10px] uppercase tracking-widest gap-2 disabled:opacity-20"
              >
                Next <ChevronRight size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <EditAnnouncementDialog
        isOpen={isEditDialogOpen}
        onClose={handleOnCloseDialogEdit}
        announcement={selectedAnnouncement}
        setAnnouncements={setAnnouncements}
      />
    </div>
  );
};

export default ManageAnnouncement;
