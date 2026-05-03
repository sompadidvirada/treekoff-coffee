import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Make sure to import these

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navBg =
    !isHomePage || isScrolled || isMenuOpen
      ? "bg-[#1A0F0A]/95 backdrop-blur-md shadow-2xl border-white/5"
      : "bg-transparent py-6 md:py-8";

 
  const navLinks = [
    {
      title: "HOME",
      link: "home",
    },
    {
      title: "BRANCHES",
      link: "branches",
    },
    {
      title: "ABOUT US",
      link: "Aboutus",
    },
    {
      title: "Fanchise",
      link: "fanchise",
    },
    {
      title: "MENU",
      link: "menus",
    },
    {
      title: "JOIN OUR TEAM",
      link: "joinus",
    },
    {
      title: "CONTRACT",
      link: "contract",
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 px-6 flex justify-between items-center ${navBg}`}
    >
      <div className="flex items-center">
        <Link to="/">
          <img
            src={"/tk-image/tk-logo.png"}
            alt="Treekoff Logo"
            className={`transition-all duration-500 object-contain h-18 ${
              isScrolled ? "md:h-18" : "md:h-22"
            }`}
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
        {navLinks.map((item, i) => (
          <Link
            key={i}
            to={item.link === "home" ? "/" : `/${item.link.toLowerCase()}`}
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none transition-transform active:scale-90"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-[72px] left-0 w-full bg-[#1A0F0A] border-t border-white/5 transition-all duration-500 ease-in-out md:hidden overflow-hidden ${
          isMenuOpen
            ? "max-h-screen opacity-100 py-8 shadow-2xl"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-[14px] font-bold uppercase tracking-[0.3em] text-white/90">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link === "home" ? "/" : `/${item.link.toLowerCase()}`}
              className="hover:text-[#D4AF37] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
