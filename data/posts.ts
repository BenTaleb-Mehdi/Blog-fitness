export interface LocalizedSection {
  heading: string;
  paragraphs: string[];
  callout?: string;
  image?: string;
}

export interface LocalizedContent {
  title: string;
  category: string;
  readTime: string;
  authorRole: string;
  contentSections: LocalizedSection[];
}

export interface Post {
  id: number;
  slug: string;
  size: string;
  iconName: 'activity' | 'zap' | 'flame' | 'dumbbell';
  bgGlow: string;
  date: string;
  coverImage: string;
  author: { name: string; avatar: string };
  // Multi-language data translation slots matrix structure arrays
  translations: {
    en: LocalizedContent;
    fr: LocalizedContent;
    es: LocalizedContent;
    ar: LocalizedContent;
  };
}

export const featuredPosts: Post[] = [
  {
    id: 1,
    slug: "interference-effect-lift-run",
    size: "md:col-span-2 md:row-span-1",
    iconName: "activity",
    bgGlow: "from-emerald-500/10 to-transparent",
    date: "June 18, 2026",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    author: { name: "Anass DevFit", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    translations: {
      en: {
        title: "The Interference Effect: Lift & Run Without Losing Gains",
        category: "Science",
        readTime: "5 min read",
        authorRole: "Hybrid Coach / Full-Stack",
        contentSections: [
          {
            heading: "1. What Exactly is the Interference Effect?",
            paragraphs: ["For decades, fitness dogmas told us that running kills your gains. This is known as the Interference Effect."],
            image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800",
            callout: "🧬 AMPK vs mTOR: Hypertrophy signaling peaks 4 hours post-lifting."
          }
        ]
      },
      fr: {
        title: "L'Effet d'Interférence : Soulever & Courir Sans Perdre de Muscle",
        category: "Science",
        readTime: "5 min de lecture",
        authorRole: "Coach Hybride / Full-Stack",
        contentSections: [
          {
            heading: "1. Qu'est-ce que l'effet d'interférence ?",
            paragraphs: ["Pendant des décennies, le dogme du fitness nous a dit que courir détruisait le muscle."],
            image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800",
            callout: "🧬 AMPK vs mTOR : Les signaux d'hypertrophie culminent 4 heures après l'effort."
          }
        ]
      },
      es: {
        title: "El Efecto de Interferencia: Levantar y Correr Sin Perder Ganancias",
        category: "Ciencia",
        readTime: "5 min de lectura",
        authorRole: "Entrenador Híbrido / Full-Stack",
        contentSections: [
          {
            heading: "1. ¿Qué es exactamente el Efecto de Interferencia?",
            paragraphs: ["Durante décadas, los dogmas del fitness nos dijeron que correr destruye tus músculos."],
            image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800",
            callout: "🧬 AMPK vs mTOR: Las señales de hipertrofia alcanzan su punto máximo 4 horas después."
          }
        ]
      },
      ar: {
        title: "تأثير التداخل العلمي: كيف ترفع الأثقال وتجري دون خسارة عضلاتك",
        category: "علم الرياضة",
        readTime: "5 دقائق قراءة",
        authorRole: "مدرب هجين / مطور برمجيات",
        contentSections: [
          {
            heading: "1. ما هو تأثير التداخل (Interference Effect) بالضبط؟",
            paragraphs: ["لعقود طويلة، كانت خرافات اللياقة البدنية تخبرنا أن الجري يدمر العضلات والمكتسبات الضخمة."],
            image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800",
            callout: "🧬 إشارة البناء العضلي mTOR تصل ذروتها بعد 4 ساعات من التمرين العنيف."
          }
        ]
      }
    }
  }
];