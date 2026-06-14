import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { JobDetailDialog } from "./component/JobDetailDialog";
import AddJobDescription from "./component/AddJobDescription";
import {
  GetAllJobDescription,
  GetAllJobRequire,
  UpdateStautsJobRequire,
} from "api/job_require";
import AddJobRequire from "./component/AddJopRequire";
import { getAllBranchForSelect } from "api/branches";
import EditJobRequire from "./component/EditJobRequire";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const JobRequire = () => {
  // Mock data - replace with your actual data from the database/API
  const [jobs, setJobs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [job_rq, setJob_rq] = useState([]);

  useEffect(() => {
    const fecthJobDecription = async () => {
      try {
        const ress = await GetAllJobDescription();
        setJobs(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fecthBranchs = async () => {
      try {
        const ress = await getAllBranchForSelect();

        setBranches(ress.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fecthAllJobRequire = async () => {
      try {
        const ress = await GetAllJobRequire();
        setJob_rq(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthJobDecription();
    fecthBranchs();
    fecthAllJobRequire();
  }, []);

  const [isLoad, setIsLoad] = useState(false);
  const handleUpdate = async (id: number, stt: boolean) => {
    setIsLoad(true);
    try {
      await UpdateStautsJobRequire(id, { status: stt });
      setJob_rq((prev) =>
        prev.map((item) => (item.id == id ? { ...item, status: stt } : item)),
      );
      toast.success(`ອັປເດດສະຖານະສະໝັກງານສຳເລັດ`, { className: "font-lao"})
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen font-lao">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-light text-[#1A0F0A]">
              Job Requirements
            </h1>
            <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest">
              Management Portal
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-12 border-b border-gray-100 pb-8">
          <div className="flex gap-8">
            <AddJobDescription setJobs={setJobs} />

            <JobDetailDialog jobs={jobs} setJobs={setJobs} />
          </div>

          <AddJobRequire
            jobs={jobs}
            branches={branches}
            setJob_rq={setJob_rq}
          />
        </div>
        {job_rq.map((j) => (
          <div
            key={j.id}
            className="bg-white mb-5 border border-gray-100 p-8 relative group transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          >
            {/* Hover Accent */}
            <div className="absolute top-0 left-0 w-1 h-0 bg-[#D4AF37] transition-all group-hover:h-full" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-1">
                  Position / ຕຳແໜ່ງ
                </p>
                <h3 className="text-2xl font-light text-[#1A0F0A] font-lao">
                  {j.job_description_name}{" "}
                  {j.job_level ? `(${j.job_level})` : ""}
                </h3>
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold px-3 py-1 tracking-widest uppercase",
                  j.status
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600",
                )}
              >
                {j.status ? "Active" : "In Active"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-gray-50 pt-6">
              {/* 01. Location Stack */}
              <div className="space-y-1">
                <span className="text-[15px] uppercase text-gray-500 block tracking-widest">
                  Location / ສາຂາ
                </span>
                <div className="flex flex-col">
                  <p className="text-xl font-lao text-gray-800 leading-tight">
                    {j.branch_name}
                  </p>
                  {/* Province: Muted color and smaller size to look like a sub-label */}
                  <span className="text-[15px] font-lao text-gray-600 mt-0.5 flex items-center gap-1">
                    <span className="h-[1px] w-2 bg-gray-200" />{" "}
                    {/* Subtle dash separator */}
                    {j.province_name}
                  </span>
                </div>
              </div>

              {/* 02. Quota */}
              <div className="space-y-1">
                <span className="text-[15px] uppercase text-gray-500 block tracking-widest">
                  Quota / ຈຳນວນ
                </span>
                <p className="text-xl font-lao text-gray-800">
                  {j.require_number}{" "}
                  <span className="text-[15px] text-gray-700 font-bold">
                    ຕຳແໜ່ງ
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400">
                <FileText size={14} strokeWidth={1.5} />
                <span className="text-[15px] font-mono tracking-tighter">
                  {j.contract_number}
                </span>
              </div>
              <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
                <EditJobRequire
                  data={j}
                  branches={branches}
                  jobs={jobs}
                  setJop_rq={setJob_rq}
                />
                <button
                  onClick={() => handleUpdate(j.id, !j.status)}
                  disabled={isLoad}
                  className={cn(
                    "cursor-pointer transition-colors",
                    j.status
                      ? "text-red-900/40  hover:text-red-600 "
                      : "text-green-900/40  hover:text-green-600",
                  )}
                >
                  {j.status ? "ປິດຮັບສະໝັກ" : "ເປີດີຮັບສະໝັກ"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
