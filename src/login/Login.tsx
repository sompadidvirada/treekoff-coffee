import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { sendLogin } from "api/authentication";
import { toast } from "sonner";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ress = await sendLogin({ phone: phone, password: password });
      localStorage.setItem("user_detail", JSON.stringify(ress.data));
      navigate("/admin");
    } catch (err) {
      toast.error("ລອງໄໝ່ພາຍຫຼັງ");
      console.error("Login failed", err);
      // You can add a toast notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 antialiased overflow-hidden">
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('/tk-image/bg-image.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-[400px] bg-white/95 backdrop-blur-md shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border border-white/20 p-10 md:p-12">
        {/* BRANDING */}
        <div className="mb-12 text-center space-y-4">
          {/* LOGO IMAGE */}
          <div className="inline-flex items-center justify-center mb-2">
            <img
              src="/tk-image/tk-logo.png"
              alt="Treekoff Logo"
              className="w-20 h-20 object-contain transition-transform duration-500 scale-300"
            />
          </div>

          {/* TEXT SECTION */}
          <div className="space-y-1">
            <h1 className="text-2xl font-light italic font-serif tracking-tight text-zinc-900">
              Admin Portal
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Operations & Management
            </p>
          </div>
        </div>
        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-zinc-950 transition-colors"
                  size={14}
                />
                <Input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="5177..."
                  className="rounded-none border-zinc-200 pl-10 h-12 bg-white/50 focus-visible:ring-0 focus-visible:border-zinc-950 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-zinc-950 transition-colors"
                  size={14}
                />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-none border-zinc-200 pl-10 h-12 bg-white/50 focus-visible:ring-0 focus-visible:border-zinc-950 transition-all"
                />
              </div>
            </div>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full rounded-none bg-zinc-950 hover:bg-zinc-800 text-white h-14 uppercase text-[10px] tracking-[0.3em] font-bold transition-all shadow-xl shadow-zinc-200"
          >
            {loading ? "Authenticating..." : "Authorize Entry"}
            {!loading && <ArrowRight size={14} className="ml-2" />}
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-zinc-300">
          <ShieldCheck size={12} />
          <span className="text-[9px] uppercase tracking-widest font-medium">
            Encrypted Session
          </span>
        </div>
      </div>

      {/* FOOTER CREDIT */}
      <footer className="relative z-10 mt-12 text-center space-y-2">
        <p className="text-[10px] text-white/60 tracking-widest uppercase font-medium">
          Copyright © 2026 www.treekoff.coffee. All Rights Reserved.
        </p>
        <p className="text-[9px] text-white/40 italic font-serif">
          Designed by BigTree IT Department
        </p>
      </footer>
    </div>
  );
};

export default Login;
