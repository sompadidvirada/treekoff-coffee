import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-[#1A0F0A] text-white/60 py-24 px-6 border-t border-white/5"
    >
      {/* Added items-center to center the grid items themselves on mobile */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center md:items-start">
        {/* Part 1: Contact Details - Center text on mobile */}
        <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-[0.3em] font-bold">
              Contact
            </h4>
            {/* Adjusted flex to justify-center on mobile */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
              <MapPin className="text-[#D4AF37] shrink-0" size={18} />
              <p className="text-sm leading-relaxed font-lao max-w-[280px] md:max-w-none">
                Bigtree trading company limited, Ban Sibounhueng, Chanthabuly
                District, Vientiane Capital, Laos PDR.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <Mail className="text-[#D4AF37] shrink-0" size={18} />
              <a
                href="mailto:bigtreetrading1@gmail.com"
                className="text-sm hover:text-[#D4AF37] transition-colors"
              >
                bigtreetrading1@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Part 2: Social Media - Always centered is fine, but added md:items-center for clarity */}
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-[0.3em] font-bold">
              Follow Us
            </h4>
            <div className="flex gap-6 justify-center">
              <a
                href="https://www.instagram.com/treekofflaos/"
                className="hover:text-[#D4AF37] transition-all transform hover:-translate-y-1"
              >
                <SiInstagram size={22} />
              </a>
              <a
                href="https://www.facebook.com/Treekofflaos"
                className="hover:text-[#D4AF37] transition-all transform hover:-translate-y-1"
              >
                <SiFacebook size={22} />
              </a>
              <a
                href="https://www.tiktok.com/@treekoff"
                className="hover:text-[#D4AF37] transition-all transform hover:-translate-y-1"
              >
                <SiTiktok size={22} />
              </a>
            </div>
            <p className="text-[10px] uppercase text-white/30 tracking-widest">
              @treekofflaos
            </p>
          </div>
        </div>

        {/* Part 3: Opening Hours - Center on mobile, Right-align on desktop */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-8">
          <div className="space-y-4 w-full md:w-auto flex flex-col items-center md:items-end">
            <h4 className="text-white text-xs uppercase tracking-[0.3em] font-bold">
              Hours
            </h4>
            <div className="space-y-1">
              <p className="text-white text-lg font-serif">Monday - Sunday</p>
              <p className="text-[#D4AF37] text-sm font-bold tracking-tighter">
                6:30 AM — 8:30 PM
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
              <span className="text-[10px] text-[#D4AF37] font-bold uppercase">
                Open Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
