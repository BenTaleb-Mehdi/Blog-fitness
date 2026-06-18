"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function CategoryFilter({ activeTab, setActiveTab }: CategoryFilterProps) {
  const tabs = ["Heavy Lifting", "Hybrid", "Extreme Mileage"];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 flex justify-center sticky top-4 z-50">
      <div className="p-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl flex items-center gap-1 shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            style={{ color: activeTab === tab ? "#fff" : "#a1a1aa" }}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700/50 -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>
    </section>
  );
}