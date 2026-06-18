"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { featuredPosts } from "../../data/posts";
import { useLanguage } from "../../context/LanguageContext"; // 🌐 Jbnaha mn l-Context

interface SearchAndFilterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchAndFilter({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: SearchAndFilterProps) {
  
  // 🌐 1. T-njbdou l-logha o l-translations mn l-Engine
  const { language, t, isRTL } = useLanguage();

  // ⚙️ 2. DYNAMIC CATEGORY EXTRACTION B L-LOGHA
  // N-jbdou l-categories dyal l-logha li khtar l-user exact
  const uniqueCategories = Array.from(
    new Set(featuredPosts.map((post) => post.translations[language].category))
  );

  // 3. N-terjmou l-kelma "All" 3la hssab l-logha
  const allTabLabel = 
    language === "ar" ? "الكل" : 
    language === "fr" ? "Tous" : 
    language === "es" ? "Todos" : "All";

  // 4. L-Array final dyal l-tabs b ID (System) o Label (View)
  const tabs = [
    { id: "All", label: allTabLabel },
    ...uniqueCategories.map(cat => ({ id: cat, label: cat }))
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-900/50 py-4 w-full">
      
      {/* SEARCH INPUT BOX (RTL Compatible) */}
      <div className="relative w-full md:w-80 group">
        {/* Khdemna b `start-3` blasst `left-3` bach دور automatique f l-Arabe */}
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder} // 🌐 Placeholder Dynamic
          dir={isRTL ? "rtl" : "ltr"}
          className="w-full ps-10 pe-10 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/50 text-sm font-sans placeholder-zinc-500 text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-inner"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div className="w-full md:w-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1 flex md:justify-end">
        
        {/* THE DYNAMIC CAPSULE PILL CONTAINER */}
        <div className="p-1 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl flex flex-row flex-nowrap items-center gap-1 w-max ps-1 pe-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider whitespace-nowrap shrink-0 transition-colors cursor-pointer select-none"
              style={{ color: activeTab === tab.id ? "#fff" : "#71717a" }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-lg bg-zinc-900 border border-zinc-800/60 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.label.toUpperCase()}
            </button>
          ))}

          {/* BULLETPROOF INLINE SCROLL SPACER */}
          <div className="w-5 h-2 shrink-0 pointer-events-none" />
        </div>

      </div>

    </section>
  );
}