import { Coffee, Receipt, Users } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import PageTransition from "./PageTransition";
import { useEffect, useState } from "react";
import { GetAllJobRequireClient, JoRequireInterest } from "api/job_require";

const JoinOurTeam = () => {
  const getIcon = (pos: string) => {
    switch (pos.toLowerCase()) {
      case "ຜູ້ຊ່ວຍບັນຊິ":
        return <Receipt size={24} />;
      case "ບາເລສຕ້າ":
        return <Coffee size={24} />;
      default:
        return <Users size={24} />;
    }
  };

  const [jobss, setJobss] = useState([]);

  useEffect(() => {
    const fecthJobRequire = async () => {
      try {
        const ress = await GetAllJobRequireClient();
        setJobss(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthJobRequire();
  }, []);

  console.log(jobss)

  const handleJobRequireInterst = async(id:number)=> {
    try{
     await JoRequireInterest({job_id: id})
    }catch(err) {
      console.log(err)
    }
  }

  const handleOpenWhatsApp = (phone: string, message: string, id: number) => {

    handleJobRequireInterst(id)
    // remove spaces or dashes
    const cleanPhone = phone.replace(/\D/g, "");

    const url = message
      ? `https://wa.me/+85620${cleanPhone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/${cleanPhone}`;

    window.open(url, "_blank");
  };

  return (
    <PageTransition>
      <section className="bg-[#F8F8F8] pb-24 pt-20 md:pt-30 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header - Fixed for Mobile */}
          <div className="text-center mb-12 md:mb-16">
            <div className="w-48 md:w-64 mx-auto mb-[-20px] md:mb-[-40px] py-0 md:pb-10">
              {/* Reduced negative margin so it doesn't overlap text on small screens */}
              <img
                src={"/tk-image/tk-logo.png"}
                alt="Treekoff Logo"
                className="w-full h-auto object-contain"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1A0F0A] relative z-10">
              Join Our Journey
            </h2>
            <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
            <p className="text-gray-500 font-lao text-base md:text-lg px-4">
              ມາເປັນສ່ວນໜຶ່ງຂອງຄອບຄົວ Treekoff
            </p>
          </div>

          {/* Job List */}
          <div className="grid gap-4 md:gap-6">
            {jobss.map((job, idx) => (
              <div
                key={idx}
                className="group bg-white p-1 rounded-[2rem] md:rounded-[2.5rem] font-lao shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="bg-[#FDFBF7] rounded-[1.8rem] md:rounded-[2.2rem] p-5 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {/* Left Side: Icon + Title */}
                  <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                    <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-white rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-inner border border-gray-100 group-hover:scale-110 transition-transform">
                      {getIcon(job.job_description_name)}
                    </div>

                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-[#1A0F0A] uppercase tracking-tight leading-tight">
                        {job.job_description_name}{" "}
                        {job?.job_level ? `(${job.job_level})` : ""}
                      </h4>
                      <p className="text-[#baa258] text-[14px] md:text-[16px] font-bold tracking-[0.2em] mt-1 uppercase">
                        {job.branch_name}
                      </p>
                      <p className="text-[#baa258] text-[12px] md:text-[14px] opacity-80 font-bold tracking-[0.2em] mt-1 uppercase">
                        {job.province_name}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Stats + Button */}
                  <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8 border-t md:border-t-0 border-gray-100 pt-5 md:pt-0">
                    <div className="bg-white px-5 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-gray-100 text-center min-w-[90px] md:min-w-[100px]">
                      <p className="text-[#D4AF37] font-serif text-2xl md:text-2xl font-bold leading-none">
                        {job.require_number}
                      </p>
                      <p className="text-[13px] md:text-[8px] text-gray-400 uppercase font-bold mt-1 tracking-widest">
                        ຕຳແໜ່ງ
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleOpenWhatsApp(
                          String(job.contact_number),
                          `ສະບາຍດີ ສົນໃຈສອບຖາມເພີ່ມເຕີມກ່ຽວກັບຕຳແໜ່ງ ${job.job_description_name} ປະຈຳສາຂາ ${job.branch_name}`, job.job_description_id
                        )
                      }
                      className="w-10 cursor-pointer h-10 md:w-12 md:h-12 rounded-2xl bg-[#00980c] flex items-center justify-center text-[#ffff] hover:bg-[#D4AF37] hover:text-[#1A0F0A] transition-all shadow-md active:scale-95"
                    >
                      <SiWhatsapp size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 md:mt-20 text-center px-6">
            <p className="font-lao text-gray-400 text-xs md:text-sm max-w-sm mx-auto leading-relaxed">
              ພວກເຮົາກໍາລັງຊອກຫາຄົນທີ່ມີໄຟຝັນ ແລະ ມັກສິ່ງໃໝ່ໆ.
              ຖ້າເຈົ້າຄືຄົນນັ້ນ, ຢ່າລໍຊ້າທີ່ຈະກ້າວເຂົ້າມາຫາພວກເຮົາ.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default JoinOurTeam;
