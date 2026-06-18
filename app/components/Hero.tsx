"use client";

import { motion } from "framer-motion";
import { BookOpen, Activity, Target, Flame } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-zinc-800/80 bg-zinc-950/40 text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {t.badge}
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
          {t.heroTitle1}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-orange-400">
            {t.heroTitle2}
          </span>
        </h1>

        <p className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">{t.heroDesc}</p>

        <div className="pt-2">
          <button className="px-8 py-4 rounded-xl bg-emerald-500 text-black font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg">
            {t.heroBtn} <BookOpen className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}