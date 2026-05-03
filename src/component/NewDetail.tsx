import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "./PageTransition";

const NewDetail = () => {
  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const POSTS_PER_PAGE = 3;
  const MAX_PAGES = 5; // As per your request

  const handleOpenDetail = (id: string | number) => {
    // This opens in a new tab
    window.open(`/news/${id}`, "_blank");
  };
  const pinnedPost = {
    id: 1,
    title: "ທຮິຄອຟ ສາຂາສິບຸນເຮືອງ ກຽມພ້ອມເປີດບໍລິການແລ້ວໄວໆນີ້",
    date: "MAY 01, 2026",
    description:
      "ສຳລັບສາຂາສີບຸນເຮືອງນັ້ນແມ່ນໃກ້ສຳເລັດການກໍສ້າງ ພ້ອມທີ່ຈະໃຫ້ບໍລິການຄົນຮັກກາເຟໃນໄວໆນີ້.",
    image: "https://www.treekoff.coffee/img/coffee_plant/bolaven_coffee1.jpeg",
  };

  const regularPosts = [
    {
      id: 2,
      image:
        "https://scontent.fvte1-2.fna.fbcdn.net/v/t39.30808-6/682687700_1010159548191942_387393452640065946_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=HG5QRkIzWyYQ7kNvwEKQ1K7&_nc_oc=AdrUtNHFWFq8gWjZUfe2J56dSv3i2WncYyw1gicyR7_CnTL2Z39w0Vk4RmRI4mcLxCA&_nc_zt=23&_nc_ht=scontent.fvte1-2.fna&_nc_gid=V0UZAhXOqxXM315SpVTFKQ&_nc_ss=7b2a8&oh=00_Af7o1d73Evk-QBqCPg4ua5m47MpIVNjEoJN0WqW_GmMzAw&oe=69FA05E8",
      date: "April 28, 2026",
      title: "ໂປຮໂມຊັ່ນສະຫຼອງສາຂາເປີດໃຫ່ມ ສາຂາ ໂພນສີນວນ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 3,
      image:
        "https://scontent.fvte5-1.fna.fbcdn.net/v/t39.30808-6/677466598_1004220388785858_5379267257476667586_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=YkMxZnhIpz4Q7kNvwGIyz1u&_nc_oc=Adr8UM93ju8jnOsZ0hd4FcBf2ZOraMJuTlybgVh-ig80xB4hG6lgsTHpwG2d5lesyVc&_nc_zt=23&_nc_ht=scontent.fvte5-1.fna&_nc_gid=NYo1nKJnUP1GJ37vcO96pQ&_nc_ss=7b2a8&oh=00_Af4U_2rsI5g9_yyiChgCGfKUlLGRVXTHSMH5cUytsLNOEQ&oe=69FA0565",
      date: "April 28, 2026",
      title: "ໂປຮໂມຊັ່ນສະຫຼອງສາຂາເປີດໃຫ່ມ ສາຂາ ໂພນສີນວນ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 4,
      image:
        "https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/677832717_27062877063304129_8985271323232133348_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OhN01NmMQs4Q7kNvwEt-P--&_nc_oc=Adr_PKY7oEjA3NaEkRORA4ENxqFXn65ikReRPoXJUq73TS_ChEd674ymCbVY9xRRKtw&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=TuAKClQ0lSEAdQbXXIfdNw&_nc_ss=7b2a8&oh=00_Af5NhuUoAFsSqKouACdhI567S93EQaRd0vMdBj2rshD_-Q&oe=69F9E6FF",
      date: "April 28, 2026",
      title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 5,
      image:
        "https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/677832717_27062877063304129_8985271323232133348_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OhN01NmMQs4Q7kNvwEt-P--&_nc_oc=Adr_PKY7oEjA3NaEkRORA4ENxqFXn65ikReRPoXJUq73TS_ChEd674ymCbVY9xRRKtw&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=TuAKClQ0lSEAdQbXXIfdNw&_nc_ss=7b2a8&oh=00_Af5NhuUoAFsSqKouACdhI567S93EQaRd0vMdBj2rshD_-Q&oe=69F9E6FF",
      date: "April 28, 2026",
      title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 6,
      image:
        "https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/677832717_27062877063304129_8985271323232133348_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OhN01NmMQs4Q7kNvwEt-P--&_nc_oc=Adr_PKY7oEjA3NaEkRORA4ENxqFXn65ikReRPoXJUq73TS_ChEd674ymCbVY9xRRKtw&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=TuAKClQ0lSEAdQbXXIfdNw&_nc_ss=7b2a8&oh=00_Af5NhuUoAFsSqKouACdhI567S93EQaRd0vMdBj2rshD_-Q&oe=69F9E6FF",
      date: "April 28, 2026",
      title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 7,
      image:
        "https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/677832717_27062877063304129_8985271323232133348_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OhN01NmMQs4Q7kNvwEt-P--&_nc_oc=Adr_PKY7oEjA3NaEkRORA4ENxqFXn65ikReRPoXJUq73TS_ChEd674ymCbVY9xRRKtw&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=TuAKClQ0lSEAdQbXXIfdNw&_nc_ss=7b2a8&oh=00_Af5NhuUoAFsSqKouACdhI567S93EQaRd0vMdBj2rshD_-Q&oe=69F9E6FF",
      date: "April 28, 2026",
      title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 8,
      image:
        "https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/677832717_27062877063304129_8985271323232133348_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OhN01NmMQs4Q7kNvwEt-P--&_nc_oc=Adr_PKY7oEjA3NaEkRORA4ENxqFXn65ikReRPoXJUq73TS_ChEd674ymCbVY9xRRKtw&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=TuAKClQ0lSEAdQbXXIfdNw&_nc_ss=7b2a8&oh=00_Af5NhuUoAFsSqKouACdhI567S93EQaRd0vMdBj2rshD_-Q&oe=69F9E6FF",
      date: "April 28, 2026",
      title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 9,
      image:
        "https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/677832717_27062877063304129_8985271323232133348_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OhN01NmMQs4Q7kNvwEt-P--&_nc_oc=Adr_PKY7oEjA3NaEkRORA4ENxqFXn65ikReRPoXJUq73TS_ChEd674ymCbVY9xRRKtw&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=TuAKClQ0lSEAdQbXXIfdNw&_nc_ss=7b2a8&oh=00_Af5NhuUoAFsSqKouACdhI567S93EQaRd0vMdBj2rshD_-Q&oe=69F9E6FF",
      date: "April 28, 2026",
      title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
    {
      id: 10,
      image:
        "https://scontent.fvte3-1.fna.fbcdn.net/v/t39.30808-6/677832717_27062877063304129_8985271323232133348_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OhN01NmMQs4Q7kNvwEt-P--&_nc_oc=Adr_PKY7oEjA3NaEkRORA4ENxqFXn65ikReRPoXJUq73TS_ChEd674ymCbVY9xRRKtw&_nc_zt=23&_nc_ht=scontent.fvte3-1.fna&_nc_gid=TuAKClQ0lSEAdQbXXIfdNw&_nc_ss=7b2a8&oh=00_Af5NhuUoAFsSqKouACdhI567S93EQaRd0vMdBj2rshD_-Q&oe=69F9E6FF",
      date: "April 28, 2026",
      title: "ສາຂາ ໜອງດ້ວງ ເປີດເປັນທາງການ",
      description: "ເປີດໂຕຢ່າງເປັນທາງການແລ້ວສຳລັບສາຂາໂພນສີນວນ...",
    },
  ];

  // 2. Pagination Logic
  const totalPages = Math.min(
    Math.ceil(regularPosts.length / POSTS_PER_PAGE),
    MAX_PAGES,
  );
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    // 3. Improved Scroll Logic
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <PageTransition>
      <section ref={sectionRef} className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto mt-5">
          <div className="mb-16 flex items-center gap-4">
            <h2 className="text-2xl md:text-5xl font-lao text-[#1A0F0A] italic">
              "ຂ່າວສານລ່າສຸດກ່ຽວກັບພວກເຮົາ"
            </h2>
            <div className="h-px flex-1 bg-gray-100 hidden md:block" />
          </div>

          <div
            className={`grid grid-cols-1 ${regularPosts.length > 0 ? "lg:grid-cols-12" : "max-w-4xl mx-auto"} gap-16`}
          >
            {/* PINNED POST */}
            <article
              onClick={() => handleOpenDetail(pinnedPost.id)} // CLICK HANDLER ADDED
              className={`${regularPosts.length > 0 ? "lg:col-span-7" : "col-span-1"} group cursor-pointer`}
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] mb-8 shadow-xl bg-gray-50">
                <div className="absolute top-6 left-6 z-20 bg-[#D4AF37] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Pinned Story
                </div>
                <img
                  src="https://www.treekoff.coffee/img/coffee_plant/bolaven_coffee1.jpeg" // Placeholder for tk3
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
                  ສຳລັບສາຂາສີບຸນເຮືອງນັ້ນແມ່ນໃກ້ສຳເລັດການກໍສ້າງ
                  ພ້ອມທີ່ຈະໃຫ້ບໍລິການຄົນຮັກກາເຟໃນໄວໆນີ້.
                </p>
              </div>
            </article>

            {/* SIDEBAR WITH PAGINATION */}
            {regularPosts.length > 0 && (
              <div className="lg:col-span-5 flex flex-col lg:pl-10 lg:border-l lg:border-gray-100">
                <div className="space-y-8 flex-1">
                  {currentPosts.map((rp) => (
                    <article
                      onClick={() => handleOpenDetail(rp.id)}
                      key={rp.id}
                      className="flex gap-5 group cursor-pointer border-b border-gray-50 pb-8 last:border-0 hover:translate-x-1 transition-all duration-300"
                    >
                      <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-50">
                        <img
                          src={rp.image}
                          alt={rp.title}
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
                        <p className="text-[11px] text-gray-400 font-lao line-clamp-2 italic">
                          {rp.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* 3. PAGINATION CONTROLS */}
                <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
                  <button
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} className="text-[#1A0F0A]" />
                  </button>

                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${
                          currentPage === i + 1
                            ? "bg-[#1A0F0A] text-white shadow-lg"
                            : "text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      currentPage < totalPages && paginate(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} className="text-[#1A0F0A]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default NewDetail;
