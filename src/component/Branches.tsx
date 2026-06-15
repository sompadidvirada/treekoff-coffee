import { Image, MapPin } from "lucide-react";
import PageTransition from "./PageTransition";
import { useEffect, useMemo, useState } from "react";
import { getAllBranchs } from "api/for_client";

type Branchs = {
  name: string;
  image : string
  province_id: number;
  qc_rating: number
  province_name_lao: string
  location_des: string
  phoen: string
  email: string
  location_url: string
  galory_image_url: string
};

type Province = {
  total_branch: number;
  name_eng: string;
  name_lao: string;
  privince_id: number;
};

const Branches = () => {
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("14");
  const [branchess, setBranchess] = useState<Branchs[]>([]);
  const [province, setProvince] = useState<Province[]>([]);
  const [totalBranch, setTotalBranch] = useState();

  // filter branch
  const filteredBranches = useMemo(() => {
    return branchess.filter((b) => {
      const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());

      const matchProvince =
        selectedProvince === "all" ||
        b.province_id === Number(selectedProvince);

      return matchSearch && matchProvince;
    });
  }, [search, selectedProvince, branchess]);

  useEffect(() => {
    const feacthBrachess = async () => {
      try {
        const ress = await getAllBranchs();
        setBranchess(ress.data.branchs);
        setProvince(ress.data.province_branchs);
        setTotalBranch(ress.data.total_branch);
      } catch (err) {
        console.log(err);
      }
    };
    feacthBrachess();
  }, []);

  console.log(branchess);
  return (
    <PageTransition>
      <div className="bg-[#FDFBF7] pt-6 w-full">
        <section className="bg-[#FDFBF7] pt-20 md:pt-32 pb-12 md:pb-14 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header / Province Banner */}
            <div className="text-center mb-10 md:mb-12">
              <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
                Our Branches
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-7xl font-serif text-[#1A0F0A] mt-4 leading-tight">
                {totalBranch ? totalBranch : 0} Branches{" "}
                <br className="md:hidden" /> Available Now
              </h1>

              <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-y-8 md:gap-12 mb-12 md:mb-2 border-y border-[#1A0F0A]/5 py-8 md:py-10">
                {" "}
                {province.map((item, idx) => (
                  <div key={idx} className="text-center px-2 md:px-4">
                    {" "}
                    <p className="text-[#D4AF37] text-xl md:text-3xl font-serif font-bold">
                      {" "}
                      {item.total_branch.toString().padStart(2, "0")}{" "}
                    </p>{" "}
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1 px-2">
                      {" "}
                      {item.name_eng}{" "}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>
            </div>

            {/* Redesigned Search + Filter: Stationed right below the header elements */}
            <div className="w-full border-b border-black/10 pb-4 mb-16 md:mb-24 flex flex-col md:flex-row items-baseline justify-between gap-6">
              {/* Left: Interactive Input */}
              <div className="flex-1 flex items-baseline gap-4 w-full">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest font-mono">
                  01/ Find
                </span>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="ພິມຊື່ສາຂາທີ່ນີ້..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-10 bg-transparent outline-none text-xl md:text-2xl font-lao text-[#1A0F0A] placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Right: Clean Selection Filter */}
              <div className="flex items-baseline gap-4 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest font-mono">
                  02/ Province
                </span>
                <div className="relative min-w-[180px]">
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full h-10 bg-transparent pr-8 outline-none text-sm font-lao text-[#1A0F0A] appearance-none cursor-pointer font-bold"
                  >
                    <option value="all">ທຸກແຂວງ / All Province</option>
                    {province.map((province, idx) => (
                      <option key={idx} value={province.privince_id}>
                        {province.name_lao}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#D4AF37] text-[9px]">
                    [ ▾ ]
                  </div>
                </div>
              </div>
            </div>

            {/* Branch List */}
            <div className="space-y-8 md:space-y-12">
              {filteredBranches.length > 0 ? (
                filteredBranches.map((b, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm border border-black/5 flex flex-col lg:flex-row min-h-[450px] lg:h-[450px]"
                  >
                    {/* Image */}
                    <div className="h-[250px] sm:h-[300px] lg:h-full lg:w-1/3 relative shrink-0">
                      <img
                        src={b.image}
                        className="w-full h-full object-cover"
                        alt={b.name}
                      />

                      <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-sm">
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">
                          QC Rating
                        </p>

                        <p className="text-[#D4AF37] font-serif text-sm md:text-xl font-bold">
                          {b?.qc_rating?.toFixed(1)} / 10
                        </p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                      <div className="space-y-6 md:space-y-10">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 border-b border-gray-100 pb-4 md:pb-6">
                          <h2 className="text-2xl md:text-4xl font-lao text-[#1A0F0A] leading-tight">
                            {b.name}
                          </h2>

                          <span className="text-[#D4AF37] font-lao font-bold text-sm md:text-xl tracking-widest uppercase">
                            {b.province_name_lao}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
                          <div className="space-y-2 md:space-y-4">
                            <h4 className="text-[10px] font-lao font-bold uppercase tracking-widest text-[#D4AF37]">
                              ລາຍລະອຽດທີ່ຕັ້ງຂອງສາຂາ
                            </h4>

                            <p className="text-gray-600 font-lao text-xs md:text-sm leading-relaxed md:leading-loose">
                              {b.location_des}
                            </p>
                          </div>

                          <div className="space-y-2 md:space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                              Connect
                            </h4>

                            <div className="space-y-1 md:space-y-2">
                              <p className="text-[#1A0F0A] font-bold text-xs md:text-sm">
                                {b.phoen}
                              </p>

                              <p className="text-[#1A0F0A] font-medium text-xs md:text-sm break-all">
                                {b.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Links */}
                        <div className="flex flex-wrap gap-6 md:gap-8 pt-4 border-t border-gray-50">
                          <a
                            href={b?.location_url}
                            target="_blank"
                            className="group flex items-center gap-2 text-[9px] md:text-[10px] font-bold tracking-widest uppercase"
                          >
                            <MapPin size={14} className="text-[#D4AF37]" />

                            <span className="group-hover:text-[#D4AF37] transition-colors">
                              Direction
                            </span>
                          </a>

                          <a
                            href={b?.galory_image_url}
                            className="group flex items-center gap-2 text-[9px] md:text-[10px] font-bold tracking-widest uppercase"
                          >
                            <Image size={14} className="text-[#D4AF37]" />

                            <span className="group-hover:text-[#D4AF37] transition-colors">
                              Photos
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No branch found</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Branches;
