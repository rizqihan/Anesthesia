'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Calculator, Pill, Activity, Syringe, Sparkles, BookOpen, Cpu, WifiOff, Book } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { language } = useAppStore();
  const t = translations[language];

  const tools = [
    {
      title: t.medical_calculators,
      icon: Calculator,
      href: '/calculators',
      description: language === 'en' ? 'BMI, Creatinine Clearance, etc.' : 'IMT, Klirens Kreatinin, dll.',
      color: 'bg-indigo-100 text-indigo-700',
      tags: ['offline']
    },
    {
      title: t.interaction_checker,
      icon: Pill,
      href: '/interactions',
      description: language === 'en' ? 'Check interactions between multiple drugs' : 'Cek interaksi antara beberapa obat',
      color: 'bg-rose-100 text-rose-700',
      tags: ['ai']
    },
    {
      title: t.symptom_checker,
      icon: Activity,
      href: '/symptoms',
      description: language === 'en' ? 'AI-powered symptom analysis' : 'Analisis gejala didukung AI',
      color: 'bg-emerald-100 text-emerald-700',
      tags: ['ai']
    },
    {
      title: t.icd10_search,
      icon: Book,
      href: '/icd10',
      description: language === 'en' ? 'Quick offline dictionary for ICD-10 codes' : 'Kamus offline cepat untuk kode ICD-10',
      color: 'bg-amber-100 text-amber-700',
      tags: ['offline']
    },
    {
      title: t.dosage_calculator,
      icon: Syringe,
      href: '/dosage',
      description: language === 'en' ? 'Weight-based pediatric/adult dosing' : 'Dosis pediatrik/dewasa berbasis berat badan',
      color: 'bg-sky-100 text-sky-700',
      tags: ['offline']
    },
    {
      title: t.drug_formulary,
      icon: Pill,
      href: '/formulary',
      description: language === 'en' ? 'Search drugs, indications, and formulations offline' : 'Cari obat, indikasi, dan formulasi secara offline',
      color: 'bg-indigo-100 text-indigo-700',
      tags: ['offline']
    },
    {
      title: t.clinical_guidelines_title,
      icon: BookOpen,
      href: '/guidelines',
      description: t.clinical_guidelines_desc,
      color: 'bg-teal-100 text-teal-700',
      tags: ['offline']
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-slate-900 mb-1">
          {language === 'en' ? 'Dashboard' : 'Dasbor'}
        </h2>
        <p className="text-slate-500 text-[13px]">
          {language === 'en' ? 'Quick access to clinical tools.' : 'Akses cepat ke alat klinis.'}
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {tools.map((tool) => (
          <motion.div key={tool.href} variants={itemAnim} className="flex h-full">
            <Link href={tool.href} className="flex h-full w-full">
              <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden hover:shadow-sm transition-all group w-full hover:border-sky-300">
                <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 transition-colors group-hover:bg-sky-50/50">
                  <div className={`p-1 rounded ${tool.color}`}>
                    <tool.icon className="w-4 h-4" />
                  </div>
                  <div className="text-[13px] font-bold text-slate-700 uppercase tracking-[0.5px]">
                    {tool.title}
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col">
                  <p className="text-slate-600 text-[13px] leading-relaxed group-hover:text-slate-900 transition-colors mb-3">
                    {tool.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {tool.tags.includes('ai') && (
                      <span className="inline-flex items-center space-x-1 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100">
                        <Cpu className="w-3 h-3" />
                        <span>{t.requires_ai}</span>
                      </span>
                    )}
                    {tool.tags.includes('offline') && (
                      <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                        <WifiOff className="w-3 h-3" />
                        <span>{t.offline_capable}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
