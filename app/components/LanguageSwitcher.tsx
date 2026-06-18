"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "../../context/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration matrix for localized labels
const languages = [
  { code: "en", shortLabel: "EN", fullLabel: "English" },
  { code: "fr", shortLabel: "FR", fullLabel: "Français" },
  { code: "es", shortLabel: "ES", fullLabel: "Español" },
  { code: "ar", shortLabel: "AR", fullLabel: "العربية" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🛠️ CLICK OUTSIDE ENGINE: Closes the menu automatically if user clicks anywhere else
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div
      ref={dropdownRef}
      // Adjusted fixed positioning logic based on RTL baseline context
      className={`fixed top-6 z-50 font-mono ${isRTL ? "left-6" : "right-6"}`}
    >
      {/* 👑 THE PREMIUM TRIGGER TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700/80 p-2.5 px-3.5 rounded-xl backdrop-blur-md shadow-2xl transition-all cursor-pointer text-xs font-medium text-zinc-300 hover:text-white select-none active:scale-95"
      >
        <Globe className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400" />
        <span className="tracking-wider">{currentLang.shortLabel}</span>
        <ChevronDown 
          className={`w-3 h-3 text-zinc-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-emerald-400" : ""
          }`} 
        />
      </button>

      {/* 💎 FLOATING CUSTOM MENU (ANIMATED) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute mt-2 w-44 bg-zinc-950/95 border border-zinc-900 rounded-2xl p-1.5 backdrop-blur-xl shadow-3xl space-y-0.5 z-50 ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            {languages.map((lang) => {
              const isActive = lang.code === language;
              const isOptionAr = lang.code === "ar";
              
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as Language);
                    setIsOpen(false);
                  }}
                  dir={isOptionAr ? "rtl" : "ltr"}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-zinc-900/80 text-emerald-400 font-semibold border border-zinc-800/40"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                  } ${isOptionAr ? "font-sans text-right flex-row-reverse" : "text-left"}`}
                >
                  <span className="tracking-wide">{lang.fullLabel}</span>
                  
                  {isActive && (
                    <motion.div layoutId="activeCheck" className="shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}