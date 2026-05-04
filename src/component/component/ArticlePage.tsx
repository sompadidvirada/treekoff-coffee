import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  SiFacebook,
  SiImessage,
  SiInstagram,
  SiX,
} from "@icons-pack/react-simple-icons";

const ArticlePage = () => {
  const images = ["/tk-image/tk29.jpg", "/tk-image/tk32.jpg", "/tk-image/tk33.jpg"];

  const pinnedPost = {
    id: 1,
    title: "ທຮິຄອຟ ສາຂາສິບຸນເຮືອງ ກຽມພ້ອມເປີດບໍລິການແລ້ວໄວໆນີ້",
    date: "MAY 01, 2026",
    description:
      "ສຳລັບສາຂາສີບຸນເຮືອງນັ້ນແມ່ນໃກ້ສຳເລັດການກໍສ້າງ ພ້ອມທີ່ຈະໃຫ້ບໍລິການຄົນຮັກກາເຟໃນໄວໆນີ້.",
    image: "https://www.treekoff.coffee/img/coffee_plant/bolaven_coffee1.jpeg",
  };

  return (
    <div className="min-h-screen bg-white font-lao pt-10">
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12">
        <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-8 h-px bg-[#D4AF37]"></span>
          Announcement
        </div>

        <h1 className="text-4xl md:text-6xl text-[#1A0F0A] leading-[1.2] mb-8 italic">
          ທຮິຄອຟ ສາຂາສິບຸນເຮືອງ ກຽມພ້ອມເປີດບໍລິການແລ້ວໄວໆນີ້
        </h1>

        <div className="flex items-center gap-6 text-gray-400 text-sm border-y border-gray-100 py-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>May 01, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>3 min read</span>
          </div>
        </div>
      </div>

      {/* Dynamic Image Section (Slider) */}
      <div className="max-w-4xl mx-auto px-6 mb-16 relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={images.length > 1 ? { delay: 5000 } : false}
          className="rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[12/8]"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}

          {/* Custom Navigation Arrows (Only show if multiple images) */}
          {images.length > 1 && (
            <>
              <button className="prev-btn absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-[#1A0F0A] rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft size={24} />
              </button>
              <button className="next-btn absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-[#1A0F0A] rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </Swiper>

        {/* Global CSS override to style swiper pagination to match your theme */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .swiper-pagination-bullet-active { background: #D4AF37 !important; }
          .swiper-pagination-bullet { background: rgba(255,255,255,0.7); }
        `,
          }}
        />
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-lg prose-stone max-w-none">
          <div className="bg-[#FDFBF7] p-10 rounded-3xl border-l-4 border-[#D4AF37] italic text-lg text-[#1A0F0A]">
            ພວກເຮົາຕື່ນເຕັ້ນທີ່ຈະແຈ້ງໃຫ້ຊາບວ່າ ສາຂາໃໝ່ລ່າສຸດຂອງພວກເຮົາ
            ທີ່ບ້ານສິບຸນເຮືອງ ແມ່ນໃກ້ຈະສຳເລັດສົມບູນແລ້ວ.
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Share Story:
            </span>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    "_blank",
                  )
                }
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
                title="Share on Facebook"
              >
                <SiFacebook size={18} />
              </button>

              {/* X (Twitter) */}
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(pinnedPost.title)}`,
                    "_blank",
                  )
                }
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all shadow-sm"
                title="Share on X"
              >
                <SiX size={18} />
              </button>

              {/* WhatsApp */}
              <button
                onClick={() =>
                  window.open(
                    `https://api.whatsapp.com/send?text=${encodeURIComponent(pinnedPost.title + " " + window.location.href)}`,
                    "_blank",
                  )
                }
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                title="Share on WhatsApp"
              >
                <SiImessage size={18} />
              </button>

              {/* Instagram (Copy Link Fallback) */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied for Instagram!");
                }}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#E4405F] hover:text-white transition-all shadow-sm"
                title="Copy link for Instagram"
              >
                <SiInstagram size={18} />
              </button>
            </div>
          </div>

          <button
            onClick={() => window.close()}
            className="text-sm font-bold text-[#1A0F0A] hover:text-[#D4AF37] transition-colors border-b-2 border-transparent hover:border-[#D4AF37] pb-1"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
