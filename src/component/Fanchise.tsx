import { ArrowRight, Download } from "lucide-react";
import PageTransition from "./PageTransition";

const Fanchise = () => {
  return (
    <PageTransition>
      <section className="bg-white overflow-hidden md:pt-15">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Big Visual Side */}
          <div className="lg:w-1/2 h-[400px] sm:h-[500px] lg:h-auto relative">
            <img
              src="/tk-image/tk25.jpeg"
              alt="Franchise Opportunity"
              className="w-full h-full object-cover"
            />
            {/* Adjusted gradient for better text legibility on small screens */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/80 via-[#1A0F0A]/20 to-transparent flex items-end p-8 md:p-12">
              <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
                Grow with <br />{" "}
                <span className="text-[#D4AF37]">Treekoff.</span>
              </h2>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col justify-center bg-[#FDFBF7]">
            <div className="max-w-2xl mx-auto lg:mx-0 space-y-10 md:space-y-12">
              <div>
                <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 block">
                  Partner Program
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#1A0F0A] mb-6">
                  Become a Franchise Partner
                </h3>
                <p className="text-gray-600 font-lao leading-relaxed md:leading-loose text-sm md:text-base">
                  ບໍລິສັດ ບິກທຣີການຄ້າ ຈຳກັດ
                  ຄືຜູ້ຖືລິຂະສິດເຈົ້າຂອງແບຣນທີຄອຟແຕ່ພຽງຜູ້ດຽວ
                  ໂດຍໄດ້ເປີດໃຫ້ນັກລົງທຶນທີ່ສົນໃຈໃນການຊື້ແຟຣນຊາຍເພື່ອເຊົ່າຊື່ ແລະ
                  ຮູບແບບຮ້ານໃນການເປັນຕົວແທນຈຳໜ່າຍ ໂດຍມີລາຍລະອຽດັ່ງລຸ່ມນີ້:
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6 md:space-y-8">
                {[
                  {
                    step: "01",
                    title: "ແນະນໍາການຊື້ອຸປະກອນ ແລະ ເຄື່ອງມືຕ່າງໆ",
                    detail: "",
                  },
                  {
                    step: "02",
                    title:
                      "ການຕົບແຕ່ງຮ້ານ ແລະ ປັບປຸງຮ້ານຄ້າໃຫ້ເຂົ້າກັບຮູບແບບຂອງແບຣນ TREEKOFF",
                    detail: "",
                  },
                  {
                    step: "03",
                    title: "ການຈັດສົ່ງວັດຖຸດິບໃຫ້ຕະຫຼອດອາຍຸສັນຍາ",
                    detail: "",
                  },
                  {
                    step: "04",
                    title:
                      "ບໍລິສັດຈະຕິດຕັ້ງລະບົບການຂາຍເຊື່ອມຕໍ່ກັບບໍລິສັດ ແລະ ອົບຮົມຄວາມຮູ້ເຕັກນິກການບໍລິຫານຈັດການຮ້ານຄ້າ",
                    detail: "",
                  },
                  {
                    step: "05",
                    title: "ບໍລິສັດຈະໃຫ້ຄໍາແນະນໍາຕະຫຼອດອາຍຸສັນຍາດັ່ງນີ້:",
                    detail:
                      "- ຈັດສົ່ງທີມງານບໍລິຫານໜ້າຮ້ານຄ້າລົງໄປຊ່ວຍເຫຼືອໃຫ້ຄໍາປຶກສາໃນຊ່ວງເລີ່ມຕົ້ນເປີດຮ້ານຄ້າ",
                    detail2:
                      "- ສາມາດໂທຮຽກເຈົ້າໜ້າທີ່ລົງໄປແກ້ບັນຫາໄດ້ຕະຫຼອດເວລາລັດຖະການ",
                  },
                  {
                    step: "06",
                    title:
                      "ບໍລິສັດຈະມີທີມງານກວດສອບສິນຄ້າຄົງເຫຼືອ ແລະ ມາດຕະຖານການບໍລິການ",
                    detail: "",
                  },
                  {
                    step: "07", // Corrected duplicate 03 to 07
                    title:
                      "ບໍລິສັດຈະມີໂຄສະນາປະຊາສໍາພັນແບຣນຂອງ TREEKOFF ຕະຫຼອດເວລາພ້ອມຮ່ວມກັບຮ້ານຄ້າສ້າງກິດຈະກໍາການຕະຫຼາດເພື່ອສົ່ງເສີມການຂາຍ",
                    detail: "",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 md:gap-6 group">
                    <span className="text-xl md:text-2xl font-serif text-[#D4AF37] opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-[#1A0F0A] font-lao font-bold text-[13px] md:text-sm uppercase tracking-wider md:tracking-widest mb-2 leading-snug">
                        {item.title}
                      </h4>
                      {item.detail && (
                        <p className="text-gray-500 font-lao text-xs md:text-sm leading-relaxed">
                          {item.detail}
                        </p>
                      )}
                      {item.detail2 && (
                        <p className="text-gray-500 font-lao text-xs md:text-sm leading-relaxed">
                          {item.detail2}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Document Links */}
              <div className="pt-8 md:pt-12 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://drive.google.com/drive/folders/16Bv-XHG0_bWaGjEDyzDR1XWQJpmfOJ3Y"
                  className="flex items-center justify-between p-5 md:p-6 bg-white border border-gray-100 rounded-2xl hover:border-[#D4AF37] transition-all group shadow-sm hover:shadow-md"
                >
                  <span className="text-[10px] md:text-[11px] font-bold font-lao uppercase tracking-widest text-[#1A0F0A]">
                    ລາຍລະອຽດແຟຣນໄຊສ໌
                  </span>
                  <Download
                    size={16}
                    className="text-[#D4AF37] group-hover:translate-y-1 transition-transform shrink-0 ml-2"
                  />
                </a>
                <a
                  href="https://franchise.treekoff.coffee/"
                  className="flex items-center justify-between p-5 md:p-6 bg-[#1A0F0A] border border-[#1A0F0A] rounded-2xl hover:bg-transparent transition-all group shadow-sm"
                >
                  <span className="text-[10px] md:text-[11px] font-lao font-bold uppercase tracking-widest text-white group-hover:text-[#1A0F0A]">
                    ລົງທະບຽນ
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-[#D4AF37] group-hover:translate-x-1 transition-transform shrink-0 ml-2"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Fanchise;
