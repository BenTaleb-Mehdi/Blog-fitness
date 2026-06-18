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

  if (!post) return <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono">{t.noResults}</div>;

  const localized = post.translations[language];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: localized.title,
          text: `Check out this hybrid fitness experiment: ${localized.title}`,
          url: currentUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

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
              <img src={post.author.avatar} alt="Author" className="w-10 h-10 rounded-full border border-zinc-700 object-cover" />
              <div>
                <p className="font-medium text-zinc-200 text-xs md:text-sm">{post.author.name}</p>
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10 pointer-events-none" />
          <img src={post.coverImage} alt="" className="w-full h-full object-cover opacity-100 group-hover:scale-102 transition-all duration-700" />
        </div>

        {/* CONTENT SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-4 relative">
          
          {/* THE RESTORED RESPONSIVE SHARING PANEL */}
          <aside className="lg:col-span-1 h-fit lg:sticky lg:top-24 space-y-4 order-last lg:order-first w-full">
            <div className="border border-zinc-900 bg-zinc-950/40 p-5 rounded-2xl flex flex-col gap-4 backdrop-blur-sm w-full">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Share2 className="w-3 h-3 text-zinc-400"/> {t.shareTitle}
              </p>
              
              {/* Grid matrix restored for full sharing suite */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 w-full">
                <button onClick={handleNativeShare} className="w-full px-3 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" /> 
                  <span className="text-[11px] font-sans">{t.sysShare}</span>
                </button>

                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(localized.title)}&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-full px-3 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-mono text-xs flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-3.5 h-3.5 text-sky-400 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="text-[11px] font-sans">X (Twitter)</span>
                </a>

                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-full px-3 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-mono text-xs flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-[11px] font-sans">LinkedIn</span>
                </a>
              </div>

              <button onClick={copyToClipboard} className="w-full mt-2 py-2.5 rounded-xl border border-dashed border-zinc-800 hover:border-zinc-600 bg-transparent text-zinc-400 font-mono text-xs flex items-center justify-center gap-2 relative overflow-hidden cursor-pointer">
                <AnimatePresence mode="wait">
                  {copied ? <motion.span key="cp" className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> {t.copied}</motion.span> : <motion.span key="cl" className="flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5" /> {t.copyLink}</motion.span>}
                </AnimatePresence>
              </button>
            </div>
          </aside>

          {/* MAIN ARTICLE READING LANE */}
          <article className="lg:col-span-3 space-y-10 text-zinc-300 leading-relaxed font-light text-base md:text-lg">
            {localized.contentSections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight">{section.heading}</h2>
                {section.paragraphs.map((p, pIdx) => <p key={pIdx} className="text-zinc-300/90 font-light">{p}</p>)}

                {section.image && (
                  <div onClick={() => setActiveLightboxImage(section.image || null)} className="relative w-full h-[200px] md:h-[320px] rounded-2xl overflow-hidden border border-zinc-800 my-6 cursor-zoom-in group shadow-lg">
                    <img src={section.image} alt="" className="w-full h-full object-cover opacity-100 group-hover:scale-[1.01] transition-all duration-500" />
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
            <img src={activeLightboxImage} alt="" className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-zinc-800 pointer-events-auto" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}