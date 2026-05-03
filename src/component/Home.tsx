import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { Coffee, Play } from "lucide-react";

import { SiApple } from "@icons-pack/react-simple-icons";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    image: "https://www.treekoff.coffee/img/menu/java_chip.jpeg",
    name: "Java Chip",
    price: 85000,
  },
  {
    image: "https://www.treekoff.coffee/img/menu/iced_cappucino.jpeg",
    name: "Ices Cappucino",
    price: 36000,
  },
  {
    image: "https://www.treekoff.coffee/img/menu/black_coffee.jpeg",
    name: "Iced Mocha",
    price: 36000,
  },
  {
    image: "https://www.treekoff.coffee/img/menu/iced_orange_coffee.jpeg",
    name: "Orange Coffee",
    price: 42000,
  },
  {
    image: "https://www.treekoff.coffee/img/menu/iced_coconut.jpeg",
    name: "Iced Coconut Coffee",
    price: 42000,
  },
  {
    image: "https://www.treekoff.coffee/img/menu/classic_yokurt.jpeg",
    name: "Classic Yokurt",
    price: 54000,
  },
];

const pinnedPost = {
  id: 1,
  title: "ທຮິຄອຟ ສາຂາສິບຸນເຮືອງ ກຽມພ້ອມເປີດບໍລິການແລ້ວໄວໆນີ້",
  date: "MAY 01, 2026",
  description:
    "ສຳລັບສາຂາສີບຸນເຮືອງນັ້ນແມ່ນໃກ້ສຳເລັດການກໍສ້າງ ພ້ອມທີ່ຈະໃຫ້ບໍລິການຄົນຮັກກາເຟໃນໄວໆນີ້.",
  image: "https://www.treekoff.coffee/img/coffee_plant/bolaven_coffee1.jpeg",
};

// --- Types ---
interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

// --- Scroll Reveal Component ---
const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const handleOpenDetail = (id: string | number) => {
  // This opens in a new tab
  window.open(`/news/${id}`, "_blank");
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slides: string[] = ["/tk-image/ws1.jpg", "/tk-image/ws2.jpg", "/tk-image/tk1.jpg", "/tk-image/tk2.jpg"];
  const navigator = useNavigate();

  useEffect(() => {
    // Only handle the slider timer here
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [slides.length]);
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1810] font-sans">
      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden bg-[#1A0F0A]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
              idx === currentSlide
                ? "opacity-60 scale-105"
                : "opacity-0 scale-110"
            }`}
          >
            <img
              src={slide}
              alt="Coffee"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A] via-[#1A0F0A]/40 to-transparent z-10" />
          </div>
        ))}

        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] uppercase tracking-[0.5em] text-[8px] md:text-xs font-bold">
                Bolaven Plateau Origin
              </span>
            </div>

            <h1 className="text-6xl md:text-6xl font-serif text-white leading-[0.9] tracking-tighter">
              Start Your Day <br />
              <span className="italic text-[#D4AF37] ml-12 md:ml-24">
                With Treekoff
              </span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl text-xs max-w-md font-lao leading-relaxed border-l-2 border-[#D4AF37]/30 pl-6">
              ສຳຜັດກັບລົດຊາດກາເຟທີ່ແທ້ຈິງ ຈາກແຫຼ່ງປູກທີ່ດີທີ່ສຸດໃນພູພຽງບໍລະເວນ.
            </p>
          </div>
        </div>
      </section>
      {/* BREAK STYLE 3: MINIMALIST STATEMENT */}
      <section className="py-32 bg-[#FDFBF7] relative overflow-hidden">
        {/* Faded Background Lao Script for Texture */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[2rem] md:text-[8rem] font-lao font-bold text-black/[0.02] whitespace-nowrap select-none pointer-events-none">
          ກາເຟລາວ ຄຸນນະພາບສາກົນ
        </div>

        <SectionWrapper className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="space-y-10">
            <div className="flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] text-xs">
                Franchise Opportunity
              </span>
              <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-[#1A0F0A]">
              Join us in sharing <br />
              the pride of Lao coffee.
            </h2>

            <p className="text-gray-500 font-lao text-lg max-w-2xl mx-auto italic">
              "ເປີດຮ້ານກາເຟໃນຝັນຂອງທ່ານ ດ້ວຍການສະໜັບສະໜູນຈາກທີມງານມືອາຊີບ."
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() =>
                  window.open("https://franchise.treekoff.coffee/")
                }
                className="bg-[#1A0F0A] text-[12px] md:text-xm cursor-pointer text-white px-10 py-4 rounded-full font-bold font-lao hover:scale-105 transition-transform shadow-xl"
              >
                ສະໝັກແຟນຊາຍ
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1XMRo1U7mvhHijJbaYKeAIMlXjz5v4NLR/view?usp=drive_link",
                    "_blank",
                  )
                }
                className="bg-transparent text-[12px] md:text-xm  cursor-pointer border font-lao border-[#1A0F0A] text-[#1A0F0A] px-10 py-4 rounded-full font-bold hover:bg-[#1A0F0A] hover:text-white transition-all"
              >
                ຄູ່ມືການລົງຖືນ
              </button>
            </div>
          </div>
        </SectionWrapper>
      </section>
      {/* 3. ABOUT US */}
      <section id="about" className="relative py-24 px-6 overflow-hidden">
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.treekoff.coffee/img/nn_b1.jpeg"
            alt="Coffee Background"
            className="w-full h-full object-cover"
          />
          {/* Switched to a Dark Espresso Overlay for better contrast with the image */}
          <div className="absolute inset-0 bg-[#1A0F0A]/85 backdrop-blur-[1px]"></div>
        </div>

        <SectionWrapper className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-[9px] md:text-sm">
              Discover TREEKOFF
            </span>
            <h2 className="text-xl md:text-6xl font-lao mt-2 text-white">
              ເລີ່ມສາຂາທຳອິດແຕ່ປີ 2021
            </h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
            {/* Left Column: OUR STORY */}
            {/* Card changed to a subtle dark glass effect */}
            <div className="group bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <h3 className="text-xl md:text-3xl font-serif italic text-white">
                  Our Story
                </h3>
              </div>
              <div className="space-y-6">
                <p className="text-gray-200 italic font-bold leading-relaxed text-xm  md:text-xl font-medium font-lao">
                  ກາເຟລາວ ຄຸນນະພາບຈາກພູພຽງບໍລະເວນ.
                </p>
                <p className="text-gray-300 italic text-xs md:text-xl leading-relaxed font-lao">
                  ທີຄອຟເລີ່ມຕົ້ນດ້ວຍເຫດຜົນໃຫຍ່ໆຄື
                  ເຮົາຕ້ອງການໃຫ້ຄົນລາວໄດ້ມີກາເຟທີ່ຄຸນນະພາບໃຫ້ດື່ມທີ່ເຮັດໂດຍຄົນລາວແທ້ໆ
                  ນຳໃຊ້ເມັດຈາກປາກຊ່ອງ ພ້ອມດ້ວຍເມນູທີ່ຄິດ ແລະ
                  ສ້າງສັນໃຫ້ຖືກກັບລົດຊາດທີ່ຄົນລາວເຮົາມັກ
                  ພວກເຮົານຳໃຊ້ເມັດກາເຟສາຍພັນອາຣາບິກ້າ 100%
                  ໂດຍທີ່ບໍ່ປະສົມກັບສາຍພັນອື່ນເພື່ອໃຫ້ລົດຊາດອອກມານຸ້ມ ແລະ
                  ດື່ມງ່າຍສຳຫຼັບຄົນທີ່ເລີ່ມຕົ້ນດື່ມກາເຟທີຄອຟຈະຕອບໂຈດທ່ານທີ່ສຸດ
                  ທີຄອຟເປີດສາຂາທຳອິດ ສາຂາ ໂພນທັນ
                  (ຕິດກັບບໍລິສັດກຸງສີເຊົ່າສິນເຊື່ອ) ທີ່ ບ້ານ ໂພນທັນ, ເມືອງ
                  ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນໃນວັນທີ່ 11/11/2021 ແລະ ໃນປີ 2024
                  ນີ້ເຮົາຈະມີສາຂາເຖິງ 20 ສາຂາ ເພື່ອຮອງຮັບການເຕີບໂຕຂອງລູກຄ້າເຮົາ
                  ທີມງານທີຄອຟປະກອບດ້ວຍໄວໜຸ່ມລາວທີ່ຕັ້ງໃຈຕ້ອງການສ້າງແບຣນກາເຟທີ່ໂດ່ງດັງໄປທົ່ວໂລກ
                  ເຮົາຫວັງວ່າທ່ານຈະມັກໃນລົດຊາດກາເຟເຮົາເໝືອນດັ່ງທີ່ລູກຄ້າເຮົາຫຼາຍຄົນໄດ້ລອງມາແລ້ວ.
                </p>
              </div>
            </div>

            {/* Right Column: OUR VISION */}
            <div className="space-y-8 md:mt-16">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <h3 className="text-xl md:text-3xl font-serif italic text-white">
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-200 italic font-bold leading-relaxed text-xm md:text-xl font-lao">
                ທີຄອຟຂອງເຮົາມີວິໄສທັດທີ່ຈະສ້າງແບຣນກາເຟເປັນອັນດັບໜຶ່ງໃນລາວ ແລະ
                ໃນພູມມິພາກອາຊີໂດຍແບ່ງອອກເປັນ 3 ໄລຍະດັ່ງນີ້:
              </p>

              {/* Highlighted Vision Card - Glassmorphism with Gold Border */}
              <div className="bg-[#D4AF37]/10 p-10 rounded-[2.5rem] text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden group backdrop-blur-sm">
                <p className="relative z-10 italic font-lao text-xs md:text-lg leading-relaxed">
                  "ຂະຫຍາຍສາຂາໃຫ້ຄວບຄຸມຕົວເມືອງສຳຄັນໃນປະເທດລາວ"
                </p>
                <p className="relative z-10 italic font-lao text-xs md:text-lg leading-relaxed">
                  "ເປີດຮັບແຟຣນຊາຍຂະຫຍາຍໄປທົ່ວປະເທດ"
                </p>
                <p className="relative z-10 italic font-lao text-xs md:text-lg leading-relaxed">
                  "ເປີດຮັບໂຕແທນໃນປະເທດເພື່ອນບ້ານເຊັ່ນ ໄທ, ຫວຽດນາມ, ກຳປູເຈຍ
                  ເພື່ອຂະຫຍາຍສາຂາໃນຕົວເມືອງສຳຄັນ"
                </p>
                {/* Subtle icon decoration */}
                <div className="absolute -bottom-6 -right-6 text-[#D4AF37]/10 group-hover:scale-110 transition-transform duration-700">
                  <Coffee size={150} />
                </div>
              </div>

              <p className="text-gray-300 text-xs italic md:text-xl leading-relaxed font-lao">
                ດ້ວຍວິໄສທັດ ແລະ ເປົ້າໝາຍເທິງນີ້ທີມງານເຮົາຕ້ອງພັດທະນາຄຸນນະພາບ ແລະ
                ມາດຕະຖານໃນການບໍລິການຂອງເຮົາໃຫ້ເປັນສາກົນທີ່ສຸດ.
                ພວກເຮົາໝັ້ນໃຈເປັນຢ່າງຍິ່ງວ່າແບຣນທີຄອຟຈະກາຍເປັນແບຣນກາເຟທີ່ໂດ່ງດັງໄປທົ່ວພູມິພາກນີ້
                ແລະ ຮັບຮູ້ໃນທົ່ວໂລກ.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </section>
      {/* --- BREAK: FANCHINSE --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - mobile-friendly (no bg-fixed) */}
        <div
          className="parallax-bg absolute inset-0 z-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('https://images.openai.com/static-rsc-4/MM-qqRmsyISzyZ0NTpUvShix6H7XYd4MJjiesBY6Alb5CouykkwEInNH8VNl2vUWdLPMii9tEqymTsVHXqr0GQxEzW6A0bJc68hOKyv92q6PQZHzdo8DcXsSkY71rMEko_kFWVl7i4xyIhW1D2g5QVVe5tw0uE5t0yw_aJuPDD4M2eii9i-v6tIWOrs3wT5f?purpose=fullsize')`,
          }}
        >
          {/* Darkening Overlay for text legibility */}
          <div className="absolute inset-0 bg-[#1A0F0A]/40"></div>
        </div>

        {/* Content */}
        <SectionWrapper className="relative z-10 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
              Direct Trade
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 italic">
              Grown in the Clouds, <br />
              <span className="not-italic">Poured in the City.</span>
            </h2>
            <div className="flex items-center justify-center gap-4 text-white/80">
              <div className="h-[1px] w-12 bg-white/30"></div>
              <p className="text-sm tracking-widest uppercase font-light">
                High-Altitude Arabica • Sustainable Farming
              </p>
              <div className="h-[1px] w-12 bg-white/30"></div>
            </div>
          </div>
        </SectionWrapper>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent"></div>
      </section>
      {/* 4. OUR SERVICES */}
      <section
        id="process"
        className="py-24 bg-[#1A0F0A] text-white overflow-hidden"
      >
        <SectionWrapper className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase md:text-sm">
              Excellence in Every Cup
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mt-2 text-white">
              Our Services
            </h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6"></div>
          </div>

          <div className="space-y-32">
            {/* Service 1: QC Process */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="flex-1 order-2 md:order-1">
                <span className="text-[#D4AF37] font-lao italic text-xl md:text-2xl mb-4 block">
                  01. ຄັດສັນເມັດກາເຟແທ້ຈາກເມືອງປາກຊ່ອງ
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-6 font-lao">
                  ຜ່ານກຳມະວິທີການຂົ້ວແບບເຂັ້ມຂົ້ນ ແລະ ສົດໃຫ່ມ
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-lg mb-6 font-lao">
                  ປາກຊ່ອງ ຫຼື ເຂດພູພຽງບໍລະເວນເປັນເມືອງທີ່ມີຈຸດພິເສດ ແລະ
                  ອຸດົມສົມບູນໄປດ້ວຍພູມສັນຖານ ,
                  ສະພາບແວດລ້ອມທີ່ເອື້ອອໍານວຍຕໍ່ການຈະເລີນເຕີບໂຕຂອງຕົ້ນກາເຟບໍ່ວ່າຈະເປັນສະພາບອາກາດລະດັບຄວາມສູງຈາກນ້ຳທະເລ,
                  ບັນດາແຮ່ທາດຕ່າງໆຈາກເຂດພູເຂົາໄຟລະເບີດເກົ່າ
                  ເຊິ່ງປັດໃຈເຫຼົ່ານີ້ສົ່ງຜົນຕໍ່ຄຸນນະພາບກາເຟ ແລະ
                  ເຮັດໃຫ້ເມັດກາເຟທີ່ມາຈາກເຂດພູພຽງບໍລະເວນມີລົດຊາດທີ່ເປັນເອກະລັກ..
                </p>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <img
                  src="https://images.openai.com/static-rsc-4/73G_L9pgUK0Nxin73oB1evfAaXFSvl2wt9KTO14ECGMcH6Wn0z0TEcB-newqCHRrLQLqNrSt0ZH8FTvWFBF0KF8wrDPtD0gDZmKik4vonuQxoaDF44gzZatvlX78Rvn9ZdS39D7yspVnv4hyPOYhWct9Lp_zT4pMpTtLkK6Hv9N71YTlBH1QMRCjD1eh8f5E?purpose=fullsize"
                  className="rounded-3xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-700"
                  alt="QC Process"
                />
              </div>
            </div>

            {/* Service 2: The Bean Story */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="flex-1">
                <img
                  src="https://www.foodandwine.com/thmb/XbKXqQvF61Csj9XLs_Nj3xwlwEI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Everything-You-Need-To-Know-About-Arabica-Coffee-FT-BLOG0822-2000-127d1551916e45138ea373de75f08138.jpg"
                  className="rounded-3xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-700"
                  alt="Bean Sourcing"
                />
              </div>
              <div className="flex-1">
                <span className="text-[#D4AF37] font-lao italic text-xl md:text-2xl mb-4 block">
                  02. ເມັດກາເຟສາຍພັນອາຣາບິກ້າ 100%
                </span>
                <h3 className="text:xl md:text-2xl font-bold mb-6 font-lao">
                  ຜ່ານການຄັດສັນຈາກຜູ້ຊ່ຽວຊານຫຼາຍກ່ວາ 20 ປີ
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-lg font-lao">
                  ສາຍພັນນີ້ມີຈຸດພິເສດຈະມີກິ່ນຫອມ ແລະ
                  ມີລົດຊາດທີ່ເປັນເອກະລັກຕາມແຫຼ່ງເພາະປູກ, ປູກຍາກ, ລາຄາສູງ
                  ຕ້ອງປູກໃນພື້ນທີ່ສູງກ່ວາລະດັບນ້ຳທະເລ 800 ແມັດຂຶ້ນໄປ ແລະ
                  ອາລາບິກ້າເປັນສາຍພັນກາເຟທີ່ໄດ້ຮັບຄວາມນິຍົມສູງສຸດທົ່ວໂລກ.
                </p>
              </div>
            </div>

            {/* Service 4: Barista Training */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="flex-1 order-2 md:order-1">
                <span className="text-[#D4AF37] font-lao italic text-xl md:text-2xl mb-4 block">
                  03. ທີມງານການໄດ້ຮັບຝຶກຢ່າງມືອາຊີບ
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-lao mb-6">
                  ເສີບທຸກຈອກດ້ວຍຄວາມໃສ່ໃຈ
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-lg mb-6 font-lao">
                  -
                  ກ່ອນຈະເປັນບາລິດຕ້າຂອງເຮົາຕ້ອງໄດ້ຮຽນຮູ້ອຸປະກອນທີ່ໃຊ້ສໍາລັບການຊົງກາເຟ
                </p>
                <p className="text-gray-400 leading-relaxed text-xs md:text-lg mb-6 font-lao">
                  - ຮຽນຮູ້ການເຮັດກາເຟເບື້ອງຕົ້ນ, ດ້ວຍການຊິມ ແລະ Test
                  ຈົນກວ່າຈະເຂົ້າເຖິງລົດຊາດ.
                </p>
                <p className="text-gray-400 leading-relaxed text-xs md:text-lg mb-6 font-lao">
                  - ຮຽນຮູ້ສູດກາເຟຂອງຮ້ານ ແລະ
                  ໄດ້ມີການຝຶກອົບຮົມຢ່າງສະໝໍ່າສະເໝີເພື່ອຄົງມາດຕະຖານຂອງລົດ.
                </p>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <img
                  src="https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/581390508_878022934738938_1998320758660252564_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=PuOBC4rzit8Q7kNvwEMwKCV&_nc_oc=Adqqe4U_r7XY5TuhXfWySZgantVG6S5xPKzyohshyvOs3VzCd9ryUGViMrEDzEwVkiU&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=Nh92sqWBvl-TAQx4OLrOmw&_nc_ss=7b2a8&oh=00_Af5md1M9R8EAfo4_ktccjXWpO1sqA9LUeZloaAzLyvj04Q&oe=69FB1707"
                  className="rounded-3xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-700"
                  alt="Espresso Machine"
                />
              </div>
            </div>

            {/* Service 3: Engineering (The Machine) */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="flex-1">
                <img
                  src="https://www.treekoff.coffee/img/machine_1.jpeg"
                  className="rounded-3xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-700"
                  alt="Barista Training"
                />
              </div>
              <div className="flex-1">
                <span className="text-[#D4AF37] font-lao italic text-xl md:text-2xl mb-4 block">
                  04. ເຄື່ອງຈັກກາເຟຈາກອິຕາລີຄຸນະພາບສູງ
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-6 font-lao">
                  ລົດຊາດທິດີຍ່ອມມາຈາກເຄື່ອງມືທີ່ພິເສດ
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-lg font-lao">
                  ອິຕາລີ້ເປັນປະເທດແລກທີ່ເລີ່ມຜະລິດ ແລະ
                  ພັດທະນາຈັກກາເຟຈຶ່ງເຮັດໃຫ້ຫຼາຍຄົນມີຄວາມເຊື່ອ ໝັ້ນ ແລະ
                  ນິຍົມໃຊ້ເພາະທຸກຈອກທີ່ສະກັດກາເຟອອກມາຈະມີຄຸນນະພາບ,ມີມາດຕະຖານສະໝໍ່າສະເໝີ..
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>
      {/* 5. Download App - Refined Responsive Version */}
      <section className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto text-center border-y border-[#D4AF37]/20 py-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em]">
              Dowload our app
            </span>
            <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
          </div>

          <h2 className="text-xl md:text-6xl font-lao text-[#1A0F0A] mb-8">
            ບໍລິການຈັດສົ່ງພາຍໃນພີ້ນທີ່ໃກ້ຄຽງຂອງທ່ານ <br />{" "}
            <span className="italic text-[#D4AF37]">ໂຫລດເລີຍ.</span>
          </h2>

          <p className="text-gray-500 max-w-lg mx-auto mb-10 font-lao leading-relaxed font-lao">
            ດາວໂຫລດແອັບ TREEKOFF ເພື່ອສັ່ງກາເຟລ່ວງໜ້າ ແລະ ຫຼືຈັດສົ່ງເຖີງທີ່
            ສະສົມແຕ້ມເພື່ອແລກຂອງລາງວັນຕ່າງໆ.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {/* App Store Button */}
            <button
              onClick={() => window.open(`https://treekoff.com/login.php`)}
              className="flex items-center gap-3 bg-[#1A0F0A] text-white px-6 py-2 rounded-xl hover:bg-black transition-all border border-white/10 group min-w-[180px]"
            >
              <SiApple size={28} className="shrink-0" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium opacity-80">
                  Download on the
                </span>
                <span className="text-lg font-bold -mt-1">App Store</span>
              </div>
            </button>

            {/* Google Play Button */}
            <button
              onClick={() => window.open(`https://treekoff.com/login.php`)}
              className="flex items-center gap-3 bg-[#1A0F0A] text-white px-6 py-2 rounded-xl hover:bg-black transition-all border border-white/10 group min-w-[180px]"
            >
              <Play size={26} fill="white" className="shrink-0" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium opacity-80">
                  GET IT ON
                </span>
                <span className="text-lg font-bold -mt-1">Google Play</span>
              </div>
            </button>
          </div>
        </div>
      </section>
      {/* 6. Memu Recommend */}
      <section className="py-20 bg-[#f8f4ee] overflow-hidden">
        <div className="text-center mb-16 px-6">
          <span className="font-serif italic text-[#D4AF37] text-xl md:text-2xl block mb-1">
            Must Try
          </span>
          <h2 className="text-4xl md:text-5xl font-lao font-bold text-[#1A0F0A] leading-tight">
            ເມນູແນະນຳ
          </h2>
          <div className="flex justify-center mt-4">
            <svg
              width="60"
              height="12"
              viewBox="0 0 60 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6C15 6 15 1 30 1C45 1 45 11 60 11"
                stroke="#D4AF37"
                strokeWidth="1"
              />
            </svg>
          </div>
          <p className="text-gray-500 mt-4 font-lao text-sm max-w-md mx-auto">
            ສຳຜັດກັບລົດຊາດທີ່ເປັນເອກະລັກ ທີ່ພວກເຮົາຕັ້ງໃຈຄັດສັນມາໃຫ້ທ່ານ
          </p>
        </div>
        {/* 
      1. Scroll Container: Allows manual swiping on mobile 
      2. Group: Used to pause animation on hover
  */}
        <div className="relative overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing group">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {/* 
          Map twice (2x) is usually enough for an infinite loop 
          if the width is set to translateX(-50%) 
      */}
            {[...menuItems, ...menuItems].map((item, index) => (
              <div key={index} className="w-[260px] md:w-[350px] shrink-0">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-6 shadow-xl bg-white group/item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-[0.5s] ease-out"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Text Content */}
                <div className="text-center space-y-1 whitespace-normal">
                  <h3 className="text-xl md:text-2xl font-serif text-[#2C1810]">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-6 bg-[#D4AF37]/40" />
                    <p className="text-[#D4AF37] font-medium text-lg font-lao">
                      {new Intl.NumberFormat().format(item.price)} ກີບ
                    </p>
                    <div className="h-px w-6 bg-[#D4AF37]/40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/** behide out seuccess break page */}
      <section className="py-40 bg-[#1A0F0A] text-center px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <h4 className="text-[#D4AF37] uppercase tracking-[0.6em] text-xs font-bold">
            The Treekoff Family
          </h4>

          <h2 className="text-4xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
            BEHIND EVERY{" "}
            <span className="italic text-[#D4AF37]">PERFECT CUP</span> IS A
            DEDICATED TEAM.
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent" />
            <p className="text-white/40 font-lao text-sm tracking-widest uppercase">
              ເລື່ອງລາວຂອງພວກເຮົາແມ່ນເລື່ອງລາວຂອງພວກເຂົາ
            </p>
          </div>
        </div>
      </section>
      {/* 7: Our Broad */} {/** success */}
      <section id="staff" className="py-24 px-6 bg-[#FDFBF7]">
        <SectionWrapper className="max-w-6xl mx-auto">
          <div className="grid gap-24">
            {[
              {
                name: "Thinnakone PHETKHAMPHOU",
                role: "Chairman Of Board",
                quote:
                  "ໃນວັນທີ 11 ເດືອນ ພາຈິກ ປີ 2021 ເປັນວັນທີ່ ຮ້ານກາເຟ Treekoff ເຊິ່ງເປັນ “ແບຣນຮ້ານກາເຟຂອງຄົນລາວ ແລະ ບໍລິຫານໂດຍຄົນລາວຢ່າງແທ້ຈິງ” ໄດ້ປະກາດໂຕເຂົ້າມາມີສ່ວນຮ່ວມໃນຕະຫຼາດແຟຣນຊາຍຮ້ານກາເຟຂອງປະເທດລາວຢ່າງເປັນທາງການ. ທາງບໍລິສັດເຮົາມີທີມງານທີມີຄວາມຊຽວຊານທາງດ້ານການຂົ້ວເມັດກາເຟຕະຫຼອດເຖິງການຊົງເຄື່ອງດື່ມກາເຟທີ່ມີຄວາມເຂັມຂຸ້ນຈາກເມັດກາເຟທີ່ທາງທີມງານໄດ້ຄັດສັນມາຈາກ ເມືອງ ປາກຊອງ, ພູພຽງບໍລະເວດທີ່ມີການປູກຝັງຕົ້ນກາເຟທີ່ມີຄຸນນະພາບທີ່ສຸດໃນປະເທດລາວ. ເພາະສະນັ້ນແລ້ວການທີ່ພວກເຮົາເຂົ້າມີສ່ວນຮ່ວມໃນຕະຫຼາດແຟຣນຊາຍຮ້ານກາເຟແມ່ນເປັນເລື່ອງທີ່ທ້າທາຍຫຼາຍ, ເພາະຕ້ອງໄດ້ຮັບມື້ກັບ ການສ້າງຄວາມເສື່ອໝັນໃຫ້ກັບລູກຄ້າ ແລະ ການຮັບມືກັບ ຮ້ານກາເຟແບຣນອັນດັບຕົ້ນໆຂອງຕ່າງປະເທດ ທີ່ເຂົ້າມາມີສ່ວນແບ່ງໃນຕະຫຼາດປະເທດລາວ. ແຕ່ເຖິງຢ່າງໃດກໍຕາມ, ຂ້າພະເຈົ້າເອງມີຄວາມເຊື່ອໝັນໃນທີມງານ ແລະ ການສະໜັບສະໜູນຈາກລູກຄ້າມາໂດຍຕະຫຼອດ, ເຊິ່ງເປັນແຮງພັກດັນໃຫ້ພວກເຮົາກ້າວໄປຂ້າງໜ້າ ແລະ ມີການພັດທະນາໃນທຸກໆອົງປະກອບທີ່ຈະນຳພາ ຮ້ານກາເຟ Treekoff ກ້າວໄປຊູ “ແບຣນຮ້ານກາເຟອັນດັບ 1 ຂອງປະເທດລາວ ແລະ ບໍ່ນ້ອຍໜ້າໄປກວ່າແບຣນຕ່າງປະເທດ.",
                img: "https://www.treekoff.coffee/img/team/president_2.jpeg",
                side: "left",
              },
              {
                name: "Ekkasith VIRADA",
                role: "Chief Executive Officer",
                quote:
                  "ທີຄອຟຄືແບຣນກາເຟທີ່ພວກເຮົາໄດ້ລີເລີ່ມຮ່ວມກັນ, ສ້າງສັນຂຶ້ນມາບົນພື້ນຖານຄື ເຮົາຕ້ອງການໃຫ້ກາເຟລາວມິຄຸນນະພາບສູ້ກັບກາເຟຕ່າງປະເທດໄດ້ຢ່າງສົມສັກສີ ພາຍໃນໂຈດດັ່ງກ່າວຂ້າພະເຈົ້າໄດ້ຕັ້ງໃຈຄັດສັນວັດຖຸດິບໂດຍການລົງໄປເບິ່ງ ແລະ ສຳພັດເມັດກາເຟເຖິງເມືອງ ປາກຊ່ອງ ຈົນໝັ້ນໃຈວ່າເມັດກາເຟທິ່ຂົ້ວມາໃຫ້ລູກຄ້າມີຄຸນນະພາບ ຈົນມາຮອດປັດຈຸບັນທີຄອຟເປັນທີ່ຮູ້ຈັກກັນທົ່ວໄປໃນນັກດື່ມກາເຟ, ທີຄອຟສາມາດຂະຫຍາຍໄປຄວບຄຸມພື້ນທີ່ສຳຄັນໃນນະຄອນຫຼວງວຽງຈັນ ຂ້າພະເຈົ້າເຊື່ອ ແລະ ໝັ້ນໃຈວ່າພາຍໃນອານາຄົດອັນໃກ້ນີ້ທີຄອຟຈະໄດ້ຮັບການຍອມຮັບຈາກນັກດື່ມທົ່ວໄປ ແລະ ທີິຄອຟຈະກາຍເປັນກາເຟແບຣນອັນດັນໜຶ່ງໃນປະເທດລາວ.",
                img: "https://www.treekoff.coffee/img/ceo_pic.jpg",
                side: "right",
              },
              {
                name: "Souniluk SENGKEO",
                role: "Head of Treekoff Department",
                quote:
                  "ກ່ອນອື່ນໝົດນ້ອງຕ້ອງຂອບໃຈຜູ້ອໍານວຍການທີ່ໃຫ້ໂອກາດນ້ອງໄດ້ເຂົ້າມາບໍລິຫານໜ້າວຽກນີ້ ເຊິ່ງກ່ອນຈະໄດ້ມາເປັນແບຣນທີຄອຟຍ້ອນນ້ອງໄດ້ເຫັນເຖິງຄວາມຕັ້ງໃຈຂອງຜູ້ບໍລິຫານທຸກທ່ານທີ່ຢາກໃຫ້ຄົນລາວຫັນມາບໍລິໂພກຜະລິດຕະພັນຂອງຄົນລາວດ້ວຍກັນ, ນ້ອງຈຶ່ງໄດ້ມີໂອກາດເຂົ້າມາຮັບໜ້າທີ່ດູແລ ເລື່ອງຄຸນນະພາບ ແລະ ມາດຕະຖານຂອງເຄື່ອງດື່ມທຸກຈອກທີ່ເສີບໃຫ້ລູກຄ້າເຮົາໄດ້ຄັດສັນວັດຖຸດິບທີ່ມີຄຸນນະພາບແລະໃສ່ໃຈທຸກຂັ້ນຕອນເພື່ອຢາກໃຫ້ລູກຄ້າທີ່ເຂົ້າມາບໍລິໂພກມີຄວາມປະທັບໃຈ, ນ້ອງເຊື່ອວ່າແບຣນຂອງຄົນລາວກໍບໍ່ແພ້ແບຣນຂອງຕ່າງປະເທດ ແລະ ໃນອານາຄົດ ແບຣນ Treekoff ຈະກ້າວໄປສູ່ລະດັບສາກົນແນ່ນອນ.",
                img: "https://www.treekoff.coffee/img/team/kataiy3.jpeg",
                side: "left",
              },
            ].map((person, i) => (
              <div
                key={i}
                className={`flex flex-col ${person.side === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-20`}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#C4A484] rounded-full blur-3xl opacity-20 -z-10"></div>
                  <img
                    src={person.img}
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-[12px] border-white shadow-2xl"
                    alt={person.name}
                  />
                </div>
                <div className="flex-1 text-center md:text-left space-y-6">
                  <h3 className="text-xl md:text-4xl font-serif text-[#1A0F0A]">
                    {person.name}
                  </h3>
                  <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm">
                    {person.role}
                  </p>
                  <p className="text-xm md:text-2xl italic text-gray-700 leading-relaxed font-lao">
                    "{person.quote}"
                  </p>
                  <div className="h-1 w-12 bg-[#D4AF37] mx-auto md:mx-0"></div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>
      {/** New or Company anountment */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex items-center gap-4">
            <h2 className="text-2xl md:text-5xl font-lao text-[#1A0F0A] italic">
              "ຂ່າວສານລ່າສຸດກ່ຽວກັບພວກເຮົາ"
            </h2>
            <div className="h-px flex-1 bg-gray-100 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* PINNED POST */}
            <article
              onClick={() => handleOpenDetail(pinnedPost.id)}
              className="lg:col-span-7 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] mb-8 shadow-xl">
                <div className="absolute top-6 left-6 z-20 bg-[#D4AF37] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Pinned Story
                </div>
                <img
                  src={"/tk-image/tk3.jpg"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="space-y-4 px-2">
                <time className="text-xs text-[#D4AF37] font-bold tracking-widest">
                  MAY 01, 2026
                </time>
                <h3 className="text-2xl md:text-4xl font-lao text-[#1A0F0A] group-hover:text-[#D4AF37] transition-colors leading-tight">
                  ທຮິຄອຟ ສາຂາສິບຸນເຮືອງ ກຽມພ້ອມເປີດບໍລິການແລ້ວໄວໆນີ້
                </h3>
                <p className="text-gray-500 text-sm md:text-lg font-lao leading-relaxed">
                  ສຳລັບສາຂາສີບຸນເຮືອງນັ້ນແມ່ນໃກ້ສຳເລັດການກໍສ້າງ...
                </p>
              </div>
            </article>

            {/* REGULAR POSTS WITH VERTICAL DIVIDER */}
            <div className="lg:col-span-5 space-y-8 lg:pl-10 lg:border-l lg:border-gray-100">
              {[
                {
                  id: 1,
                  image: "/tk-image/tk4.jpg",
                  date: "April 28, 2026",
                  title: "ໂປຮໂມຊັ່ນສະຫຼອງສາຂາເປີດໃຫ່ມ ສາຂາ ໂພນສີນສນ",
                  description:
                    "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ສຳລັບລູກຄ້າທີ່ເຂົ້າມາຊື້ເຄື່ອງດື່ມ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ",
                },
                {
                  id: 2,
                  image: "/tk-image/tk5.jpg",
                  date: "April 28, 2026",
                  title: "ໂປຮໂມຊັ່ນສະຫຼອງສາຂາເປີດໃຫ່ມ ສາຂາ ໂພນສີນສນ",
                  description:
                    "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ສຳລັບລູກຄ້າທີ່ເຂົ້າມາຊື້ເຄື່ອງດື່ມ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ",
                },
                {
                  id: 3,
                  image: "/tk-image/tk6.jpg",
                  date: "April 28, 2026",
                  title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
                  description:
                    "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ສຳລັບລູກຄ້າທີ່ເຂົ້າມາຊື້ເຄື່ອງດື່ມ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ ພ້ອມນີ້ທາງເຮົາຍັງມີໂປຮໂມຊັ່ນພິເສດ",
                },
              ].map((rp, i) => (
                <article
                  onClick={() => handleOpenDetail(rp.id)}
                  key={i}
                  className="flex gap-5 group cursor-pointer border-b border-gray-50 pb-8 last:border-0 hover:translate-x-1 transition-transform duration-300"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                    <img
                      src={rp.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <time className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      {rp.date}
                    </time>
                    <h4 className="text-sm md:text-md font-bold font-lao text-[#1A0F0A] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                      {rp.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-lao line-clamp-2">
                      {rp.description}
                    </p>
                  </div>
                </article>
              ))}

              <button
                onClick={() => navigator(`/news`)}
                className="w-full font-lao py-4 bg-gray-50 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm"
              >
                ເບີ່ງທັງໝົດ
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* FRANCHISE BREAK: STYLE 5 */}
      <section className="py-32 bg-[#FDFBF7]">
        <SectionWrapper className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-6">
            <div className="flex gap-1 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-[#D4AF37] rounded-full"
                ></div>
              ))}
            </div>
          </div>

          <h2 className="text-5xl md:text-8xl font-serif text-[#1A0F0A] mb-12 tracking-tighter">
            Grow With <span className="italic">TREEKOFF.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 text-left items-center border-t border-gray-200 pt-16">
            <p className="text-2xl font-lao italic text-gray-600 leading-snug">
              "ເຮົາກຳລັງເປີດຮັບແຟນຊາຍແລ້ວທົ່ວປະເທດ"
            </p>
            <div className="space-y-6">
              <p className="text-gray-500 leading-relaxed font-lao">
                ເຮົາກຳລັງຊອກຜູ້ທີ່ສົນໃຈລົງທືນທີ່ສົນໃຈລົງທືນໃນຮ້ານກາເຟ
                ທຮີຄອຟຂອງພວກເຮົາໃນຂອບເຂດທົ່ວປະເທດ
                ທ່ານພ້ອມແລ້ວບໍ່ທີ່ຈະເຕີບໂຕໄປພ້ອມກັບພວກເຮົາ.
              </p>
              <button
                onClick={() =>
                  window.open("https://franchise.treekoff.coffee/", "_blank")
                }
                className="group cursor-pointer relative overflow-hidden bg-[#1A0F0A] text-white px-8 py-4 rounded-xl w-full md:w-auto"
              >
                <span className="relative z-10 font-bold font-lao">
                  ໄປທີ່ແບບຟອມສະໝັກ
                </span>
                <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
};

export default Home;
