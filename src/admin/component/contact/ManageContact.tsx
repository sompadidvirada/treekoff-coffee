import React, { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Save,
  RefreshCw,
  Building2,
  Eye,
  Edit3,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner"; // Or your preferred toast library
import { GetContactDetail, UpdateContract } from "api/contact";

// Match your Prisma Schema exactly
interface CompanyContact {
  id?: number;
  address: string;
  email: string;
  phone: string;
  location_url: string;
}

const ManageContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CompanyContact>({
    address: "",
    email: "",
    phone: "",
    location_url: "",
  });
  const [originalData, setOriginalData] = useState<CompanyContact | null>(null);

  // Track initial state to detect unsaved changes
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const feacthContactDetail = async () => {
      try {
        const ress = await GetContactDetail();
        setFormData(ress.data);
        setOriginalData(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    feacthContactDetail();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ress = await UpdateContract(formData);

      console.log(ress);

      toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ", { className: "font-lao" });
      setIsDirty(false);
      setOriginalData(formData);
    } catch (error) {
      console.error(error);
      toast.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-10 pb-24 px-4 md:px-10 font-lao">
      <div className="max-w-7xl mx-auto">
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8 mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em]">
                HQ Settings
              </span>
              <div className="h-[1px] w-6 bg-gray-200" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-light text-[#1A0F0A]">
              ການຈັດການຂໍ້ມູນຕິດຕໍ່
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-2">
              ຈັດການທີ່ຢູ່ຫຼັກ, ອີເມວ, ເບີໂທລະສັບ ແລະ ແຜນທີ່
              ສໍາລັບເວັບໄຊທ໌ປະຊາສັມພັນຂອງ Bigtree
            </p>
          </div>

          {isDirty && (
            <span className="text-[11px] text-[#D4AF37] tracking-wider uppercase bg-amber-50 border border-amber-200/50 px-4 py-2 animate-pulse self-start md:self-auto">
              ● ມີຂໍ້ມູນທີ່ຍັງບໍ່ທັນບັນທຶກ
            </span>
          )}
        </div>

        {/* Master Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Input Form Control Matrix (7 Columns Wide) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white border border-gray-100 shadow-sm p-8 md:p-10 space-y-8 relative"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#1A0F0A]" />

            <div className="flex items-center gap-2 text-[#1A0F0A] font-bold text-sm tracking-wide border-b border-gray-50 pb-4">
              <Edit3 size={16} className="text-[#D4AF37]" />
              <h3>ແກ້ໄຂຟອມຂໍ້ມູນ / Update Coordinates</h3>
            </div>

            <div className="space-y-6">
              {/* Input field 1: Address */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 block font-bold">
                  ທີ່ຢູ່ບໍລິສັດ / Corporate Address
                </label>
                <div className="relative">
                  <textarea
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="ລະບຸທີ່ຢູ່ສຳນັກງານໃຫຍ່..."
                    className="w-full bg-gray-50/50 border border-gray-200 p-4 pl-12 text-sm focus:border-[#1A0F0A] focus:bg-white transition-all outline-none resize-none leading-relaxed"
                    required
                  />
                  <Building2
                    size={16}
                    className="absolute left-4 top-4 text-gray-400"
                  />
                </div>
              </div>

              {/* Two-Column Input row (Email & Phone) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 block font-bold">
                    ອີເມວ / Public Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="info@yourcompany.com"
                      className="w-full h-12 bg-gray-50/50 border border-gray-200 px-4 pl-12 text-sm focus:border-[#1A0F0A] focus:bg-white transition-all outline-none"
                      required
                    />
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 block font-bold">
                    ເບີໂທລະສັບ / Telephone
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+856 20..."
                      className="w-full h-12 bg-gray-50/50 border border-gray-200 px-4 pl-12 text-sm focus:border-[#1A0F0A] focus:bg-white transition-all outline-none"
                      required
                    />
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Input field 4: Map URL */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 block font-bold">
                  ລິ້ງແຜນທີ່ / Google Maps URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="location_url"
                    value={formData.location_url}
                    onChange={handleInputChange}
                    placeholder="https://maps.google.com/..."
                    className="w-full h-12 bg-gray-50/50 border border-gray-200 px-4 pl-12 text-sm focus:border-[#1A0F0A] focus:bg-white transition-all outline-none font-mono text-xs tracking-tight text-gray-600"
                    required
                  />
                  <Globe
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer Action Engine */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
              <button
                type="button"
                disabled={!isDirty || isSubmitting}
                onClick={() => {
                  if (originalData) {
                    setFormData(originalData); // Revert to the stored original
                    setIsDirty(false);
                    toast.info("ກັບຄືນສູ່ຄ່າເລີ່ມຕົ້ນ", {
                      className: "font-lao",
                    });
                  }
                }}
                className="px-6 h-12 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
              >
                Reset Fields
              </button>

              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="px-10 h-12 bg-[#1A0F0A] disabled:bg-gray-100 disabled:text-gray-400 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all flex items-center gap-3 shadow-md shadow-[#1A0F0A]/5 active:scale-98"
              >
                {isSubmitting ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Commit Updates
              </button>
            </div>
          </form>

          {/* RIGHT COLUMN: Real-Time Render Preview (5 Columns Wide) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest pl-2">
              <Eye size={12} className="text-[#D4AF37]" />
              <h4>Live Frontend Card Preview</h4>
            </div>

            {/* This block perfectly mimics how it renders on your landing page cards */}
            <div className="bg-white border border-gray-100 p-8 shadow-[0_20px_50px_rgba(26,15,10,0.03)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]" />

              <div className="mb-8 border-b border-gray-50 pb-4">
                <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] block mb-1">
                  Headquarters
                </span>
                <h2 className="text-2xl font-serif text-[#1A0F0A]">
                  Bigtree Coffee Co.
                </h2>
              </div>

              {/* Data Rows Stack */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin
                    size={18}
                    className="text-[#D4AF37] shrink-0 mt-0.5"
                  />
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">
                      Address
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed font-lao break-words">
                      {formData.address || (
                        <span className="text-gray-300 italic">
                          No address provided
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <Mail size={18} className="text-gray-300 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">
                        Email Address
                      </span>
                      <p className="text-xs text-[#1A0F0A] font-medium break-all">
                        {formData.email || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone
                      size={18}
                      className="text-gray-300 shrink-0 mt-0.5"
                    />
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">
                        Phone Number
                      </span>
                      <p className="text-xs text-[#1A0F0A] font-bold">
                        {formData.phone || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Preview Anchor */}
              <div className="mt-8 pt-6 border-t border-gray-50">
                <a
                  href={formData.location_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1A0F0A] hover:text-[#D4AF37] transition-colors"
                >
                  <span>Open Google Maps Context</span>
                  <ArrowUpRight size={14} className="text-[#D4AF37]" />
                </a>
              </div>
            </div>

            {/* System Info Box */}
            <div className="bg-gray-50 border border-gray-200/50 p-6 text-xs text-gray-400 font-lao leading-relaxed space-y-2">
              <p className="font-bold text-[9px] uppercase tracking-wider text-[#1A0F0A]">
                Database Reference Notes:
              </p>
              <p>
                ການປ່ຽນແປງຂໍ້ມູນໃນໜ້ານີ້ຈະສົ່ງຜົນກະທົບຕໍ່ໜ້າເວັບໄຊທ໌ຫຼັກທັນທີ.
                ກະລຸນາກວດສອບຄວາມຖືກຕ້ອງຂອງ ເບີໂທລະສັບ ແລະ ຮູບແບບລິ້ງ Maps
                ກ່ອນການກົດ Commit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContact;
