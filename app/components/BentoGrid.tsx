"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Activity, Flame, Zap, ArrowUpRight, SearchX } from "lucide-react";
import { Post } from "../../data/posts";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";

const iconComponents = {
  activity: <Activity className="w-5 h-5 text-emerald-400" />,
  zap: <Zap className="w-5 h-5 text-orange-400" />,
  flame: <Flame className="w-5 h-5 text-cyan-400" />,
  dumbbell: <Dumbbell className="w-5 h-5 text-purple-400" />,
};

export default function BentoGrid({ posts }: { posts: Post[] }) {
  const { language, t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 min-h-[400px]">
      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
        <AnimatePresence mode="popLayout">
          {posts.map((post) => {
            const localized = post.translations[language];
            return (
              <motion.div key={post.id} layout className={`group relative rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8 flex flex-col justify-between overflow-hidden cursor-pointer ${post.size}`}>
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-20" />
                <img src={post.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none grayscale" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">{iconComponents[post.iconName]}</div>
                  <span className="text-[10px] font-mono text-zinc-500 tracking-widest bg-zinc-950/80 px-2.5 py-1 rounded-md border border-zinc-800/80 uppercase">
                    {localized.category}
                  </span>
                </div>

                <div className="space-y-3 relative z-10">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-200 line-clamp-2">{localized.title}</h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-zinc-500 font-mono">{localized.readTime}</span>
                    <div className="flex items-center gap-1 text-xs text-zinc-400 font-medium group-hover:text-emerald-400 transition-colors">
                      {t.readExperiment} <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}