import { useEffect, useRef, useState } from "react";
import PageTransition from "./PageTransition";
import { getAllCoffeeMenuCleint } from "api/coffee_menu";
import { Separator } from "@/components/ui/separator";

type Menus = {
  category_id: number
  category_name: string
  image: string
  name: string
  price: number
  size: string
  type: string
}

interface GroupedMenu {
  category_id: number;
  title: string;
  items: {
    name: string;
    image: string;
    price: number;
    sub: string;
    type: string;
  }[];
}

const Menus = () => {
  // 1. Create a Ref object to store the HTML elements for each category
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [menus, setMenus] = useState<Menus[]>([]);

  const formattedData = menus.reduce((acc:GroupedMenu[], item) => {
    // check if category already exists
    let category = acc.find((c) => c.category_id === item.category_id);

    // if not exist -> create new category
    if (!category) {
      category = {
        category_id: item.category_id,
        title: item.category_name,
        items: [],
      };

      acc.push(category);
    }

    // push item into category
    category.items.push({
      name: item.name,
      image: item.image,
      price: item.price,
      sub: item.size,
      type: item.type,
    });

    return acc;
  }, []);

  useEffect(() => {
    const fecthMenu = async () => {
      try {
        const ress = await getAllCoffeeMenuCleint();
        setMenus(ress.data);
      } catch (err) {
        console.log(err);
      }
    };

    fecthMenu();
  }, []);

  // 2. The scroll function
  const scrollToCategory = (id: number) => {
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
          <div className="sticky top-24 z-30 mb-16 md:mb-24">
            <div className="bg-[#FDFBF7]/80 backdrop-blur-md border-y border-black/5">
              <div className="flex justify-start md:justify-start gap-4 md:gap-8 overflow-x-auto px-4 md:px-8 py-4 scrollbar-hide whitespace-nowrap">
                {formattedData.map((cat) => (
                  <div key={cat.category_id}>
                    {" "}
                    <button
                      key={cat.category_id}
                      onClick={() => scrollToCategory(cat.category_id)}
                      className="
            flex-shrink-0
            text-[11px] md:text-sm
            font-bold
            tracking-[0.25em] md:tracking-[0.4em]
            text-gray-500
            hover:text-[#D4AF37]
            transition-all
            border-b border-transparent
            hover:border-[#D4AF37]
            pb-2
          "
                    >
                      {cat.title}
                    </button>
                    <Separator orientation="vertical" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Categories Mapping */}
          <div className="space-y-32">
            {formattedData.map((category) => (
              <div
                key={category.category_id}
                // Wrap the assignment in braces so it returns void
                ref={(el) => {
                  sectionRefs.current[category.category_id] = el;
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
                          <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                            {item.type}
                          </p>
                          <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                            ({item.sub})
                          </p>
                        </div>
                        <p className="text-[#D4AF37] font-bold text-sm md:text-base pt-1">
                          {item.price.toLocaleString()}{" "}
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
