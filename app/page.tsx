'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Calculator, Pill, Activity, Syringe, BookOpen, Cpu, WifiOff, Book, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { language } = useAppStore();
  const t = translations[language];

  const tools = [
    {
      title: t.medical_calculators,
      icon: Calculator,
      href: '/calculators',
      description: language === 'en' ? 'BMI, IBW/ABW, Creatinine Clearance, eGFR' : 'IMT, BBI/BBD, Klirens Kreatinin, eGFR',
      iconBg: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
      iconGlow: 'rgba(59,130,246,0.35)',
      accentColor: '#60a5fa',
      tags: ['offline'] as ('offline' | 'ai')[],
    },
    {
      title: t.interaction_checker,
      icon: Pill,
      href: '/interactions',
      description: language === 'en' ? 'AI-powered drug-drug interaction analysis' : 'Analisis interaksi obat didukung AI',
      iconBg: 'linear-gradient(135deg, #be123c, #f43f5e)',
      iconGlow: 'rgba(244,63,94,0.35)',
      accentColor: '#fb7185',
      tags: ['ai'] as ('offline' | 'ai')[],
    },
    {
      title: t.symptom_checker,
      icon: Activity,
      href: '/symptoms',
      description: language === 'en' ? 'Differential diagnosis & red flag detection' : 'Diagnosis banding & deteksi red flag',
      iconBg: 'linear-gradient(135deg, #047857, #10b981)',
      iconGlow: 'rgba(16,185,129,0.35)',
      accentColor: '#34d399',
      tags: ['ai'] as ('offline' | 'ai')[],
    },
    {
      title: t.icd10_search,
      icon: Book,
      href: '/icd10',
      description: language === 'en' ? 'Offline ICD-10 code lookup & classification' : 'Pencarian kode ICD-10 offline',
      iconBg: 'linear-gradient(135deg, #b45309, #f59e0b)',
      iconGlow: 'rgba(245,158,11,0.35)',
      accentColor: '#fbbf24',
      tags: ['offline'] as ('offline' | 'ai')[],
    },
    {
      title: t.dosage_calculator,
      icon: Syringe,
      href: '/dosage',
      description: language === 'en' ? 'Weight-based pediatric & adult dosing' : 'Dosis pediatrik/dewasa berbasis berat badan',
      iconBg: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
      iconGlow: 'rgba(14,165,233,0.35)',
      accentColor: '#38bdf8',
      tags: ['offline'] as ('offline' | 'ai')[],
    },
    {
      title: t.drug_formulary,
      icon: Pill,
      href: '/formulary',
      description: language === 'en' ? 'Drugs, indications, contraindications & formulations' : 'Obat, indikasi, kontraindikasi & formulasi',
      iconBg: 'linear-gradient(135deg, #5b21b6, #8b5cf6)',
      iconGlow: 'rgba(139,92,246,0.35)',
      accentColor: '#a78bfa',
      tags: ['offline'] as ('offline' | 'ai')[],
    },
    {
      title: t.clinical_guidelines_title,
      icon: BookOpen,
      href: '/guidelines',
      description: language === 'en' ? 'Evidence-based clinical practice guidelines' : 'Pedoman praktik klinis berbasis bukti',
      iconBg: 'linear-gradient(135deg, #0f766e, #14b8a6)',
      iconGlow: 'rgba(20,184,166,0.35)',
      accentColor: '#2dd4bf',
      tags: ['offline'] as ('offline' | 'ai')[],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 30 } },
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-[22px] font-[800] tracking-tight gradient-text mb-1">
            {language === 'en' ? 'Clinical Dashboard' : 'Dasbor Klinis'}
          </h1>
          <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            {language === 'en'
              ? '7 tools · AI-powered & offline-capable'
              : '7 alat · Didukung AI & dapat digunakan offline'}
          </p>
        </div>
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-[600]"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.2)',
            color: '#34d399',
          }}
        >
          <span className="status-dot status-dot-green" />
          <span>{language === 'en' ? 'System Nominal' : 'Sistem Normal'}</span>
        </div>
      </motion.div>

      {/* Tool Cards Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {tools.map((tool) => (
          <motion.div key={tool.href} variants={cardAnim}>
            <Link href={tool.href} className="block h-full">
              <div
                className="h-full rounded-xl overflow-hidden flex flex-col transition-all duration-250 group cursor-pointer relative"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  boxShadow: 'var(--shadow-card)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.border = `1px solid ${tool.accentColor}44`;
                  el.style.boxShadow = `0 0 0 1px ${tool.accentColor}22, 0 8px 40px rgba(0,0,0,0.5), 0 0 30px ${tool.iconGlow}`;
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.border = '1px solid var(--border-card)';
                  el.style.boxShadow = 'var(--shadow-card)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Subtle top gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${tool.accentColor}66, transparent)` }}
                />

                <div className="p-4 flex-1 flex flex-col">
                  {/* Icon + Arrow */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="icon-box"
                      style={{ background: tool.iconBg, boxShadow: `0 0 16px ${tool.iconGlow}` }}
                    >
                      <tool.icon className="w-5 h-5 text-white" />
                    </div>
                    <ArrowRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                      style={{ color: tool.accentColor }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[13px] font-[700] mb-1.5 leading-tight tracking-tight group-hover:transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] leading-relaxed mb-3 flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {tool.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {tool.tags.includes('ai') && (
                      <span className="badge-ai">
                        <Cpu className="w-2.5 h-2.5" />
                        <span>{t.requires_ai}</span>
                      </span>
                    )}
                    {tool.tags.includes('offline') && (
                      <span className="badge-offline">
                        <WifiOff className="w-2.5 h-2.5" />
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
