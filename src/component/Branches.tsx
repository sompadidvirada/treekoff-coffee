import { Image, MapPin } from "lucide-react";
import PageTransition from "./PageTransition";

const Branches = () => {
  return (
    <PageTransition>
      <div className="bg-[#FDFBF7] pt-10 w-full">
        <section className="bg-[#FDFBF7] pt-20 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-20">
              <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
                Our Branches
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-serif text-[#1A0F0A] mt-4 leading-tight">
                34 Branches <br className="md:hidden" /> Available Now
              </h1>
              <div className="w-12 md:w-16 h-1 bg-[#D4AF37] mx-auto mt-6 md:mt-8"></div>
            </div>

            {/* Stats Grid - Now uses a grid for better mobile flow */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-y-8 md:gap-12 mb-12 md:mb-16 border-y border-[#1A0F0A]/5 py-8 md:py-10">
              {[
                { state: "Vientiane Capital", count: 32 },
                { state: "Luang Prabang", count: 2 },
                { state: "Pakse", count: 1 },
                { state: "Savannakhet", count: 1 },
              ].map((item, idx) => (
                <div key={idx} className="text-center px-2 md:px-4">
                  <p className="text-[#D4AF37] text-xl md:text-3xl font-serif font-bold">
                    {item.count.toString().padStart(2, "0")}
                  </p>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1 px-2">
                    {item.state}
                  </p>
                </div>
              ))}
            </div>

            {/* Branch List */}
            <div className="space-y-8 md:space-y-12">
              {[
                {
                  id: 1,
                  ratng: 9.2,
                  image: "/tk-image/tk7.jpg",
                  name: "ສາຂາ ໜອງໜ່ຽງ",
                  province: "ນະຄອນຫຼວງວຽງຈັນ",
                  location: "",
                  phoennumber: "",
                  email: "",
                },
                {
                  id: 2,
                  ratng: 7.2,
                  image: "/tk-image/tk8.jpg",
                  name: "ສາຂາ ວັດຈັນ",
                  province: "ນະຄອນຫຼວງວຽງຈັນ",
                  location: "",
                  phoennumber: "",
                  email: "",
                },
                {
                  id: 3,
                  ratng: 9.2,
                  image: "tk-image/tk9.jpg",
                  name: "ສາຂາ ພາກຊັ້ນ",
                  province: "ນະຄອນຫຼວງວຽງຈັນ",
                  location: "",
                  phoennumber: "",
                  email: "",
                },
                {
                  id: 4,
                  ratng: 9.2,
                  name: "ສາຂາ ວັດແສນ",
                  image: "/tk-image/tk10.jpg",
                  province: "ຫຼວງພະບາງ",
                  location: "",
                  phoennumber: "",
                  email: "",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm border border-black/5 flex flex-col lg:flex-row min-h-[450px] lg:h-[450px]"
                >
                  {/* Image Section - Fixed height on mobile, auto on desktop */}
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
                        {b.ratng.toFixed(1)} / 10
                      </p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <div className="space-y-6 md:space-y-10">
                      {/* Title and Rating Row - Responsive stack */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 border-b border-gray-100 pb-4 md:pb-6">
                        <h2 className="text-2xl md:text-4xl font-lao text-[#1A0F0A] leading-tight">
                          {b.name}
                        </h2>
                        <span className="text-[#D4AF37] font-lao font-bold text-sm md:text-xl tracking-widest uppercase">
                          {b.province}
                        </span>
                      </div>

                      {/* Content Grid */}
                      <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-2 md:space-y-4">
                          <h4 className="text-[10px] font-lao font-bold uppercase tracking-widest text-[#D4AF37]">
                            ລາຍລະອຽດທີ່ຕັ້ງຂອງສາຂາ
                          </h4>
                          <p className="text-gray-600 font-lao text-xs md:text-sm leading-relaxed md:leading-loose">
                            ບ້ານ ສີບຸນເຮືອງ, ເມືອງ ຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ.
                            <br className="hidden md:block" />
                            ຕັ້ງຢູ່ໃຈກາງເມືອງ ໃກ້ກັບອະນຸສາວະລີ.
                          </p>
                        </div>

                        <div className="space-y-2 md:space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                            Connect
                          </h4>
                          <div className="space-y-1 md:space-y-2">
                            <p className="text-[#1A0F0A] font-bold text-xs md:text-sm">
                              +856 20 5555 9999
                            </p>
                            <p className="text-[#1A0F0A] font-medium text-xs md:text-sm break-all">
                              treekoff.sbh@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Links */}
                      <div className="flex flex-wrap gap-6 md:gap-8 pt-4 border-t border-gray-50">
                        <a
                          href="#"
                          className="group flex items-center gap-2 text-[9px] md:text-[10px] font-bold tracking-widest uppercase"
                        >
                          <MapPin size={14} className="text-[#D4AF37]" />
                          <span className="group-hover:text-[#D4AF37] transition-colors">
                            Direction
                          </span>
                        </a>
                        <a
                          href="#"
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
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Branches;
