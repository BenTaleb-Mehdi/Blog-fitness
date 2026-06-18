"use client";

import { featuredPosts } from "../../../data/posts"; 
import ReadingProgress from "../../components/ReadingProgress"; 
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useLanguage } from "../../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ChevronRight, Share2, Link2, Check, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = featuredPosts.find((p) => p.slug === slug);

  const { language, t, isRTL } = useLanguage();
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, []);

  if (!post) return <div className="min-h-screen text-center text-zinc-500 pt-40">{t.noResults}</div>;

  const localized = post.translations[language];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 overflow-x-hidden pb-24 relative">
      <ReadingProgress />
      <LanguageSwitcher />

      <main className="max-w-4xl mx-auto px-6 pt-32">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300 transition-colors flex items-center gap-1">
            <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`}/> {t.navHome}
          </Link>
          <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`}/><span className="text-zinc-400">BLOG</span>
          <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`}/><span className="text-emerald-400">{localized.category.toUpperCase()}</span>
        </div>

        {/* HERO TITLE HEADER */}
        <header className="space-y-6 pb-8">
          <span className="px-3 py-1 rounded-md text-xs font-mono font-medium border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 tracking-wider uppercase">
            {localized.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
            {localized.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-sm text-zinc-400">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt="" className="w-10 h-10 rounded-full border border-zinc-700 object-cover" />
              <div>
                <p className="font-medium text-zinc-200 text-xs md:text-sm">Anass DevFit</p>
                <p className="text-[11px] font-mono text-zinc-500">{localized.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</div>
              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {localized.readTime}</div>
            </div>
          </div>
        </header>

        {/* MAIN COVER IMAGE */}
        <div onClick={() => setActiveLightboxImage(post.coverImage)} className="relative w-full h-[250px] md:h-[400px] rounded-3xl overflow-hidden border border-zinc-800 my-8 cursor-zoom-in group shadow-2xl">
          <img src={post.coverImage} alt="" className="w-full h-full object-cover opacity-100 group-hover:scale-102 transition-all duration-700" />
        </div>

        {/* CONTENT SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-4 relative">
          
          <aside className="lg:col-span-1 h-fit lg:sticky lg:top-24 space-y-4 order-last lg:order-first w-full">
            <div className="border border-zinc-900 bg-zinc-950/40 p-5 rounded-2xl flex flex-col gap-4 backdrop-blur-sm w-full">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5"><Share2 className="w-3 h-3"/> {t.shareTitle}</p>
              <button onClick={copyToClipboard} className="w-full py-2.5 rounded-xl border border-dashed border-zinc-800 hover:border-zinc-600 text-zinc-400 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {copied ? <motion.span key="cp" className="text-emerald-400 font-semibold">{t.copied}</motion.span> : <motion.span key="cl" className="flex items-center gap-1"><Link2 className="w-3.5 h-3.5"/> {t.copyLink}</motion.span>}
                </AnimatePresence>
              </button>
            </div>
          </aside>

          <article className="lg:col-span-3 space-y-10 text-zinc-300 leading-relaxed font-light text-base md:text-lg">
            {localized.contentSections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight">{section.heading}</h2>
                {section.paragraphs.map((p, pIdx) => <p key={pIdx} className="text-zinc-300/90 font-light">{p}</p>)}

                {section.image && (
                  <div onClick={() => setActiveLightboxImage(section.image || null)} className="relative w-full h-[200px] md:h-[320px] rounded-2xl overflow-hidden border border-zinc-800 my-6 cursor-zoom-in group shadow-lg">
                    <img src={section.image} alt="" className="w-full h-full object-cover opacity-100" />
                  </div>
                )}

                {section.callout && (
                  <div className="relative my-6 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 font-mono text-sm text-zinc-300 leading-relaxed overflow-hidden">
                    <div className={`absolute top-0 bottom-0 ${isRTL ? "right-0" : "left-0"} w-1 bg-gradient-to-b from-emerald-400 to-teal-500`} />
                    {section.callout}
                  </div>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>

      {/* LIGHTBOX SLIDER OVERLAY */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveLightboxImage(null)} className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out">
            <button className="absolute top-6 right-6 p-2 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 text-xs font-mono"><X className="w-4 h-4"/> {t.close} [ESC]</button>
            <img src={activeLightboxImage} alt="" className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-zinc-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}