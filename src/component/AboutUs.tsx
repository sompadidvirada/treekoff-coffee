import PageTransition from "./PageTransition";

const AboutUs = () => {
  return (
    <PageTransition>
      <div>
        <section className="bg-[#1A0F0A] py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Our Story
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto uppercase text-[10px] tracking-[0.4em]">
                Crafting Excellence Across Every Branch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              <div className="h-[500px] rounded-3xl overflow-hidden group">
                <img
                  src={
                   "/tk-image/tk21.jpg" }
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="h-[500px] rounded-3xl overflow-hidden md:mt-12 group">
                <img
                  src={
                    "/tk-image/tk22.jpeg"
                  }
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="h-[500px] rounded-3xl overflow-hidden group">
                <img
                  src={
                   "/tk-image/tk20.jpg"  }
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <p className="text-2xl md:text-4xl font-serif text-white/90 leading-snug">
                "Every Bean Local, Every Cup Meaningful”."
              </p>
              <div className="w-20 h-1 bg-[#D4AF37] mx-auto my-8"></div>
              <p className="text-gray-400 italic font-lao leading-relaxed max-w-2xl mx-auto">
                ທີຄອຟເລີ່ມຕົ້ນດ້ວຍເຫດຜົນໃຫຍ່ໆຄື
                ເຮົາຕ້ອງການໃຫ້ຄົນລາວໄດ້ມີກາເຟທີ່ຄຸນນະພາບໃຫ້ດື່ມທີ່ເຮັດໂດຍຄົນລາວແທ້ໆ
                ນຳໃຊ້ເມັດຈາກປາກຊ່ອງ ພ້ອມດ້ວຍເມນູທີ່ຄິດ ແລະ
                ສ້າງສັນໃຫ້ຖືກກັບລົດຊາດທີ່ຄົນລາວເຮົາມັກ
                ພວກເຮົານຳໃຊ້ເມັດກາເຟສາຍພັນອາຣາບິກ້າ 100%
                ໂດຍທີ່ບໍ່ປະສົມກັບສາຍພັນອື່ນເພື່ອໃຫ້ລົດຊາດອອກມານຸ້ມ ແລະ
                ດື່ມງ່າຍສຳຫຼັບຄົນທີ່ເລີ່ມຕົ້ນດື່ມກາເຟທີຄອຟຈະຕອບໂຈດທ່ານທີ່ສຸດ
                ທີຄອຟເປີດສາຂາທຳອິດ ສາຂາ ໂພນທັນ (ຕິດກັບບໍລິສັດກຸງສີເຊົ່າສິນເຊື່ອ)
                ທີ່ ບ້ານ ໂພນທັນ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນໃນວັນທີ່
                11/11/2021 ແລະ ໃນປີ 2023 ນີ້ເຮົາຈະມີສາຂາເຖິງ 20 ສາຂາ
                ເພື່ອຮອງຮັບການເຕີບໂຕຂອງລູກຄ້າເຮົາ
                ທີມງານທີຄອຟປະກອບດ້ວຍໄວໜຸ່ມລາວທີ່ຕັ້ງໃຈຕ້ອງການສ້າງແບຣນກາເຟທີ່ໂດ່ງດັງໄປທົ່ວໂລກ
                ເຮົາຫວັງວ່າທ່ານຈະມັກໃນລົດຊາດກາເຟເຮົາເໝືອນດັ່ງທີ່ລູກຄ້າເຮົາຫຼາຍຄົນໄດ້ລອງມາແລ້ວ.
              </p>
            </div>
          </div>
        </section>

        {/** our vision */}

        <section className="bg-[#1A0F0A] py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Our Vision
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto uppercase text-[10px] tracking-[0.4em]">
                Growth Knows No Borders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              <div className="h-[500px] rounded-3xl overflow-hidden group">
                <img
                  src={
                  "/tk-image/tk23.jpg"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="h-[500px] rounded-3xl overflow-hidden md:mt-12 group">
                <img
                  src={
                  "/tk-image/tk24.jpg"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="h-[500px] rounded-3xl overflow-hidden group">
                <img
                  src={"/tk-image/tk7.JPG"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center px-6 py-20">
              <div className="inline-block px-4 py-1 border border-[#D4AF37] rounded-full mb-8">
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                  Vision 2026
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif text-white mb-16 italic">
                "From Community Roots to Regional Influence"
              </h2>

              <div className="space-y-24">
                {[
                  "ຂະຫຍາຍສາຂາໃຫ້ຄວບຄຸມຕົວເມືອງສຳຄັນໃນປະເທດລາວ",
                  "ເປີດຮັບແຟຣນຊາຍຂະຫຍາຍໄປທົ່ວປະເທດ",
                  "ເປີດຮັບໂຕແທນໃນປະເທດເພື່ອນບ້ານເຊັ່ນ ໄທ, ຫວຽດນາມ, ກຳປູເຈຍ",
                ].map((text, i) => (
                  <div key={i} className="relative">
                    {i !== 2 && (
                      <div className="absolute left-1/2 -bottom-16 w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
                    )}
                    <p className="text-xl md:text-2xl font-lao text-gray-300 max-w-xl mx-auto leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-32 pt-12 border-t border-white/5">
                <p className="text-xl text-[#D4AF37] font-lao tracking-wide uppercase opacity-70">
                  ດ້ວຍວິໄສທັດ ແລະ ເປົ້າໝາຍເທິງນີ້ທີມງານເຮົາຕ້ອງພັດທະນາຄຸນນະພາບ
                  ແລະ ມາດຕະຖານໃນການບໍລິການຂອງເຮົາໃຫ້ເປັນສາກົນທີ່ສຸດ.
                  ພວກເຮົາໝັ້ນໃຈເປັນຢ່າງຍິ່ງວ່າແບຣນທີຄອຟຈະກາຍເປັນແບຣນກາເຟທີ່ໂດ່ງດັງໄປທົ່ວພູມິພາກນີ້
                  ແລະ ຮັບຮູ້ໃນທົ່ວໂລກ
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AboutUs;
