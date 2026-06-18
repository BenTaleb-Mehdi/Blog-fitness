"use client";

import { motion, Variants } from "framer-motion"; // 🛠️ Imported 'Variants' type safely
import { BookOpen, Activity, Target, Flame } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  // ⚙️ FIXED: Added explicit strict typing 'Variants' to the containers
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    // 🛠️ THE FIX: Added 'as const' to freeze the cubic-bezier array layout bounds
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    },
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* MATRIX BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f1f23_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-40 pointer-events-none -z-10" />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 max-w-5xl flex flex-col items-center">
        
        {/* DYNAMIC MONO BADGE */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {t.badge}
        </motion.div>

        {/* BRUTALIST CENTER TYPOGRAPHY */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-600 select-none">
          {t.heroTitle1}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-orange-400">
            {t.heroTitle2}
          </span>
        </motion.h1>

        {/* DYNAMIC SYMMETRIC BRIEF CAPTION */}
        <motion.p variants={itemVariants} className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-sans">
          {t.heroDesc}
        </motion.p>

        {/* CENTERED DYNAMIC ACTION BUTTON */}
        <motion.div variants={itemVariants} className="pt-2">
          <motion.button whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(16, 185, 129, 0.25)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-xl bg-emerald-500 text-black font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg">
            {t.heroBtn} <BookOpen className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </motion.div>

        {/* --- THE UNIQUE CENTER VISUAL PORTAL --- */}
        <motion.div variants={itemVariants} className="relative mt-16 w-full max-w-3xl h-[280px] md:h-[380px] rounded-[40px] overflow-hidden border border-zinc-800 bg-zinc-950/20 shadow-3xl group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-10 z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#09090b]/40 to-[#09090b] z-10 pointer-events-none" />
          
          <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: "easeOut" }} src="https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=1200&auto=format&fit=crop&q=80" alt="Hybrid Athlete Performance Portal" className="w-full h-full object-cover object-center opacity-75 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

          {/* HOLOGRAPHIC TELEMETRY TAGS */}
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-4 md:left-8 top-12 z-20 px-3 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md font-mono text-[10px] text-zinc-400 flex items-center gap-2 shadow-xl">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>VO2 MAX: <b className="text-white">64.2</b></span>
          </motion.div>

          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute right-4 md:right-8 bottom-16 z-20 px-3 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md font-mono text-[10px] text-zinc-400 flex items-center gap-2 shadow-xl">
            <Target className="w-3.5 h-3.5 text-orange-400" />
            <span>SQUAT 1RM: <b className="text-white">180KG</b></span>
          </motion.div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/60 backdrop-blur-lg font-mono text-[9px] text-zinc-500 tracking-widest flex items-center gap-4 whitespace-nowrap">
            <span>ENGINE: ACTIVE</span>
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-cyan-400"/> 2,400 KCAL/DAY</span>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}