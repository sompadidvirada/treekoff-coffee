import { Mail, MapPin, Phone } from "lucide-react";
import PageTransition from "./PageTransition";

const Contract = () => {
  return (
    <PageTransition>
      <section className="bg-white pt-48 pb-20">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          {/* Top Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
            <div className="max-w-xl">
              <h3 className="text-[10px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-6">
                Contact Us
              </h3>
              <h2 className="text-2xl md:text-5xl font-serif text-[#1A0F0A] leading-tight">
                The Office of
                <br /> Bigtree Trading.
              </h2>
            </div>
            <div className="md:text-right">
              <p className="font-lao text-gray-500 mb-2">
                ເປີດທຸກວັນ ຈັນ - ສຸກ
              </p>
              <p className="font-serif text-xm md:text-2xl text-[#1A0F0A]">
                08:00 AM — 05:00 PM
              </p>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-16">
            {/* Address Item */}
            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#D4AF37] shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Our Location
                </h4>
                <p className="text-[#1A0F0A] font-lao text-sm leading-relaxed">
                  ບ້ານ ສິບຸນເຮືອງ, ເມືອງ ຈັນທະບູລິ
                  <br />
                  ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ
                </p>
              </div>
            </div>

            {/* Email Item */}
            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Email Inquiry
                </h4>
                <p className="text-[#1A0F0A] font-serif text-lg leading-none">
                  bigtreetrading1@gmail.com
                </p>
                <p className="text-gray-400 text-xs mt-2 font-lao">
                  ຕິດຕໍ່ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ
                </p>
              </div>
            </div>

            {/* Phone Item (Optional but good for Contact sections) */}
            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Call Us
                </h4>
                <p className="text-[#1A0F0A] font-serif text-lg leading-none">
                  +856 20 59 534 390
                </p>
                <p className="text-gray-400 text-xs mt-2 font-lao">
                  ໂທຫາພວກເຮົາໃນເວລາທຳການ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Map Container - Responsive adjustments */}
        <div className="px-4 md:px-12">
          <div
            className="w-full 
    h-[350px]       /* Mobile height */
    md:h-[450px]    /* Tablet height */
    lg:h-[550px]    /* Desktop height */
    rounded-[2rem]  /* Smaller rounding for mobile */
    md:rounded-[4rem] /* Larger rounding for desktop */
    overflow-hidden shadow-inner bg-[#FDFBF7] ring-1 ring-black/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.667967239025!2d102.6222121!3d17.9778354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312467005004be59%3A0xe243ef149e86238!2sBigTree%20Trading%20Co.%2CLtd!5e1!3m2!1sen!2sla!4v1777607967711!5m2!1sen!2sla"
              className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contract;
