"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "fr" | "es" | "ar";

// Static UI Translations Dictionary
export const uiTranslations = {
  en: {
    navHome: "HOME",
    badge: "NEXT-GEN FITNESS METHODOLOGY",
    heroTitle1: "BUILD MUSCLE.",
    heroTitle2: "RUN MILES.",
    heroDesc: "Stop choosing between strength and endurance. Welcome to the elite world of Hybrid Athleticism. Data-driven frameworks for the modern human machine.",
    heroBtn: "Access Training Vault",
    searchPlaceholder: "Search experiments & guides...",
    readExperiment: "Read Experiment",
    noResults: "No experiments matched your query",
    noResultsSub: "Try checking spelling mistakes or switching tags.",
    shareTitle: "Share Experiment",
    sysShare: "System Share",
    copyLink: "Copy Page Link",
    copied: "COPIED!",
    close: "CLOSE",
    expand: "CLICK TO EXPAND",
    returnHome: "Return Home"
  },
  fr: {
    navHome: "ACCUEIL",
    badge: "MÉTHODOLOGIE DE FITNESS NEXT-GEN",
    heroTitle1: "CONSTRUIRE DU MUSCLE.",
    heroTitle2: "COURIR DES MILES.",
    heroDesc: "Arrêtez de choisir entre force et endurance. Bienvenue dans le monde d'élite de l'Athlétisme Hybride. Des frameworks basés sur les données pour la machine humaine moderne.",
    heroBtn: "Accéder au coffre d'entraînement",
    searchPlaceholder: "Rechercher des expériences...",
    readExperiment: "Lire l'expérience",
    noResults: "Aucune expérience ne correspond à votre recherche",
    noResultsSub: "Vérifiez l'orthographe ou changez de catégorie.",
    shareTitle: "Partager l'expérience",
    sysShare: "Partage Système",
    copyLink: "Copier le lien",
    copied: "COPIÉ !",
    close: "FERMER",
    expand: "CLIQUEZ POUR AGRANDIR",
    returnHome: "Retour à l'accueil"
  },
  es: {
    navHome: "INICIO",
    badge: "METODOLOGÍA DE FITNESS DE ÚLTIMA GENERACIÓN",
    heroTitle1: "CONSTRUIR MÚSCULO.",
    heroTitle2: "CORRER MILLAS.",
    heroDesc: "Deja de elegir entre fuerza y resistencia. Bienvenido al mundo de élite del Atletismo Híbrido. Marcos basados en datos para la máquina humana moderna.",
    heroBtn: "Acceder al cofre de entrenamiento",
    searchPlaceholder: "Buscar experimentos...",
    readExperiment: "Leer experimento",
    noResults: "Ningún experimento coincidió con tu búsqueda",
    noResultsSub: "Prueba a revisar la ortografía o cambiar de etiqueta.",
    shareTitle: "Compartir experimento",
    sysShare: "Compartir Sistema",
    copyLink: "Copiar enlace",
    copied: "¡COPIADO!",
    close: "CERRAR",
    expand: "CLIC PARA AMPLIAR",
    returnHome: "Volver al inicio"
  },
  ar: {
    navHome: "الرئيسية",
    badge: "منهجية اللياقة البدنية من الجيل القادم",
    heroTitle1: "ابنِ العضلات.",
    heroTitle2: "واقطع الأميال.",
    heroDesc: "توقف عن الاختيار بين القوة والتحمل. مرحبًا بك في عالم النخبة للرياضات الهجينة (Hybrid Athleticism). أنظمة قائمة على البيانات للمحرك البشري الحديث.",
    heroBtn: "دخول خزانة التدريب",
    searchPlaceholder: "ابحث عن التجارب والدلائل...",
    readExperiment: "قراءة التجربة",
    noResults: "لم نجد أي تجارب تطابق بحثك",
    noResultsSub: "تأكد من كتابة الكلمات بشكل صحيح أو غير الوسوم.",
    shareTitle: "مشاركة التجربة",
    sysShare: "مشاركة النظام",
    copyLink: "نسخ رابط الصفحة",
    copied: "تم النسخ!",
    close: "إغلاق",
    expand: "اضغط للتكبير",
    returnHome: "العودة للرئيسية"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof uiTranslations["en"];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang) setLanguageState(savedLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
  };

  const isRTL = language === "ar";
  const t = uiTranslations[language];

  // Dynamically update document direction attributes for pure Arabic layout shifting
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? "font-sans tracking-normal" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}