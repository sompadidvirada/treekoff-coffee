import { useRef } from "react";
import PageTransition from "./PageTransition";

const Menus = () => {
  // 1. Create a Ref object to store the HTML elements for each category
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const menuCategories = [
    {
      id: "Coffee",
      title: "Coffee",
      items: [
        {
          name: "HOT ESPRESSO",
          image: "https://www.treekoff.coffee/img/menu/coffee/hot_es.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "hot",
        },
        {
          name: "HOT AMERICANO",
          image:
            "https://www.treekoff.coffee/img/menu/coffee/hot_americano.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "hot",
        },
        {
          name: "HOT LATTE",
          image:
            "https://www.treekoff.coffee/img/menu/chocolate/hot_choco.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "hot",
        },
        {
          name: "ICED CHOCOLATE",
          image:
            "https://www.treekoff.coffee/img/menu/chocolate/iced_choco.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "iced",
        },
        {
          name: "ICED AMERICANO",
          image:
            "https://www.treekoff.coffee/img/menu/coffee/iced_americano.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "iced",
        },
        {
          name: "ICED CHOCOLATE",
          image:
            "https://www.treekoff.coffee/img/menu/chocolate/iced_choco.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "iced",
        },
        {
          name: "CHOCOLATE SMOOTHIE",
          image:
            "https://www.treekoff.coffee/img/menu/chocolate/chocolate_smothie.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "smootie",
        },
        {
          name: "JAVA CHIP FRAPPE",
          image:
            "https://www.treekoff.coffee/img/menu/chocolate/java_chip.jpeg",
          price: "35,000",
          sub: "(Tall)",
          type: "smootie",
        },
        {
          name: "ICED CAPPUCCINO",
          image: "https://www.treekoff.coffee/img/menu/coffee/iced_capu.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "iced",
        },
        {
          name: "ICED ORANGE COFEE",
          image: "https://www.treekoff.coffee/img/menu/coffee/iced_orange.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "iced",
        },
        {
          name: "ICED COCONUT COFEE",
          image:
            "https://www.treekoff.coffee/img/menu/coffee/iced_coconut.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "iced",
        },
        {
          name: "MATCHAKOFF LATTE",
          image:
            "https://www.treekoff.coffee/img/menu/coffee/matchakoff_lattee.jpeg",
          price: "35,000",
          sub: "(Short)",
          type: "iced",
        },
      ],
    },
    {
      id: "TEA",
      title: "TEA",
      items: [
        {
          name: "HOT TEA",
          image: "https://www.treekoff.coffee/img/menu/tea/hot_tea.jpeg",
          price: "28,000",
          sub: "(short)",
          type: "hot",
        },
        {
          name: "HOT GREEN TEA",
          image: "https://www.treekoff.coffee/img/menu/tea/hot_green_tea.jpeg",
          price: "28,000",
          sub: "(short)",
          type: "hot",
        },
        {
          name: "ICED GREEN TEA",
          image: "https://www.treekoff.coffee/img/menu/tea/iced_green_tea.jpeg",
          price: "28,000",
          sub: "(short)",
          type: "iced",
        },
        {
          name: "ICED MILK TEA",
          image: "https://www.treekoff.coffee/img/menu/tea/iced_milk_tea.jpeg",
          price: "28,000",
          sub: "(short)",
          type: "iced",
        },
        {
          name: "ICED HONEY LEMON TEA",
          image:
            "https://www.treekoff.coffee/img/menu/tea/iced_honey_lemon.jpeg",
          price: "28,000",
          sub: "(short)",
          type: "iced",
        },
        {
          name: "ICED GREEN TEA HONEY LEMON",
          image:
            "https://www.treekoff.coffee/img/menu/tea/iced_green_tea_lemon.jpeg",
          price: "28,000",
          sub: "(short)",
          type: "iced",
        },
        {
          name: "GREEN TEA SMOOTHIE",
          image:
            "https://www.treekoff.coffee/img/menu/tea/green_tea_smoothie.jpeg",
          price: "28,000",
          sub: "(short)",
          type: "smootie",
        },
      ],
    },
    {
      id: "SMOOTIE",
      title: "SMOOTIE",
      items: [
        {
          name: "STRAWBERRY YOGURT",
          image:
            "https://www.treekoff.coffee/img/menu/smoothies/strawberry_yogurt.jpeg",
          type: "smootie",
          price: "35,000",
          sub: "(Sweet)",
        },
        {
          name: "OREO SMOOTHIE",
          image:
            "https://www.treekoff.coffee/img/menu/smoothies/oreo_yogurt.jpeg",
          type: "smootie",
          price: "35,000",
          sub: "(Sweet)",
        },
        {
          name: "MIXBERRY YOGURT",
          image: "https://www.treekoff.coffee/img/menu/smoothies/mixberry.jpeg",
          type: "smootie",
          price: "35,000",
          sub: "(Sweet)",
        },
        {
          name: "CLASSIC YOGURT",
          image: "https://www.treekoff.coffee/img/menu/smoothies/classic.jpeg",
          type: "smootie",
          price: "35,000",
          sub: "(Sweet)",
        },
      ],
    },
    {
      id: "COCOA",
      title: "COCOA",
      items: [
        {
          name: "ICED COCOA",
          image: "https://www.treekoff.coffee/img/menu/cocoa/iced_cocoa.jpeg",
          type: "iced",
          price: "34,000",
          sub: "(Short)",
        },
        {
          name: "HOT COCOA",
          image: "https://www.treekoff.coffee/img/menu/cocoa/hot_cocoa.jpeg",
          type: "hot",
          price: "34,000",
          sub: "(Short)",
        },
        {
          name: "COCOA SMOOTHIE",
          image:
            "https://www.treekoff.coffee/img/menu/cocoa/cocoa_smoothie.jpeg",
          type: "smootie",
          price: "34,000",
          sub: "(Tall)",
        },
        {
          name: "ICED COCOA LAVA",
          image:
            "https://www.treekoff.coffee/img/menu/cocoa/iced_cocoa_lava.jpeg",
          type: "iced",
          price: "34,000",
          sub: "(Tall)",
        },
        {
          name: "ICED COCOA MINT",
          image:
            "https://www.treekoff.coffee/img/menu/cocoa/iced_cocoa_mint.jpeg",
          type: "iced",
          price: "34,000",
          sub: "(Tall)",
        },
      ],
    },
  ];

  // 2. The scroll function
  const scrollToCategory = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <PageTransition>
      <section className="bg-[#FDFBF7] pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Navigation */}
          <div className="sticky top-24 z-30 bg-[#FDFBF7]/80 backdrop-blur-md flex justify-center gap-6 md:gap-10 mb-24 overflow-x-auto py-4 scrollbar-hide">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)} // 3. Add Click Handler
                className="text-[10px] font-bold tracking-[0.4em] text-gray-400 hover:text-[#D4AF37] transition-all border-b border-transparent hover:border-[#D4AF37] pb-2 whitespace-nowrap"
              >
                {cat.id}
              </button>
            ))}
          </div>

          {/* Dynamic Categories Mapping */}
          <div className="space-y-32">
            {menuCategories.map((category) => (
              <div
                key={category.id}
                // Wrap the assignment in braces so it returns void
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="space-y-12 scroll-mt-40"
              >
                {/* Category Header */}
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-3xl md:text-4xl font-serif text-[#1A0F0A]">
                    {category.title}
                  </h2>
                  <div className="w-8 h-px bg-[#D4AF37] mt-4"></div>
                </div>

                {/* Smaller Menu Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-white shadow-sm ring-1 ring-black/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-col">
                          <h3 className="text-sm md:text-base font-serif text-[#1A0F0A] leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                            {item.sub}
                          </p>
                        </div>
                        <p className="text-[#D4AF37] font-bold text-sm md:text-base pt-1">
                          {item.price}{" "}
                          <span className="text-[10px] opacity-70">LAK</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Menus;
