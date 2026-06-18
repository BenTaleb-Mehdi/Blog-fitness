"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import SearchAndFilter from "./components/SearchAndFilter";
import BentoGrid from "./components/BentoGrid";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { featuredPosts } from "../data/posts";
import { useLanguage } from "../context/LanguageContext";

export default function HybridBlogHome() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = featuredPosts.filter((post) => {
    const localized = post.translations[language];
    const matchesTab = activeTab === "All" || localized.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = localized.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          localized.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 overflow-x-hidden selection:bg-emerald-500 selection:text-black relative">
      <LanguageSwitcher />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-emerald-500/5 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <Hero />
      <SearchAndFilter activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BentoGrid posts={filteredPosts} />
    </div>
  );
}