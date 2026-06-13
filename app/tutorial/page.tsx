'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { 
  BookOpen, 
  Cpu, 
  Smartphone, 
  Database, 
  HelpCircle, 
  Github, 
  Key, 
  ChevronDown, 
  Settings, 
  ExternalLink,
  Download,
  Info,
  Layers,
  MessageSquare,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

// Structuring English Content
const contentEn = {
  title: 'Wiki & User Guide',
  subtitle: 'Learn how to configure, install, sync, and get the most out of Anesthesia.',
  toc: {
    title: 'On This Page',
    sections: [
      { id: 'introduction', label: 'Overview' },
      { id: 'pwa', label: 'Offline & PWA' },
      { id: 'ai-provider', label: 'Custom AI Config' },
      { id: 'db-sync', label: 'Database Sync' },
      { id: 'faq', label: 'FAQ' },
      { id: 'feedback', label: 'Feedback & Support' }
    ]
  },
  sections: {
    intro: {
      title: 'Welcome to Anesthesia',
      desc: 'Anesthesia is an advanced, AI-powered clinical assistant and offline medical calculator suite built for healthcare professionals. To provide high availability in low-resource or hospital environments with poor connectivity, it is designed from the ground up as a Progressive Web Application (PWA) with client-side databases.',
      highlight: 'No patient clinical data ever leaves your device. All calculations, ICD-10 searches, and drug dosage lookups are computed 100% locally.'
    },
    pwa: {
      title: 'Run Offline: PWA Installation',
      desc: 'Anesthesia works fully offline. You can install it on your mobile device, tablet, or computer. Once installed, it behaves like a native application—launching instantly from your home screen without requiring an internet connection.',
      installBtn: 'Install Anesthesia App Now',
      installBtnDesc: 'Click to install Anesthesia directly onto your system.',
      installedMsg: '✓ Anesthesia is installed on this device & running standalone.',
      iosSafariMsg: '📱 Using iOS Safari? Tap Share (square with up arrow) then "Add to Home Screen" to install.',
      notSupportedMsg: '⚡ Offline Mode Ready. Install via your browser menu for full native look & feel.',
      steps: {
        ios: {
          title: 'iOS (iPhone / iPad)',
          platform: 'Safari Browser',
          steps: [
            'Open Anesthesia in Safari browser.',
            'Tap the Share button in the bottom menu bar (square with an up arrow).',
            'Scroll down and tap "Add to Home Screen".',
            'Confirm by tapping "Add" at the top right.'
          ]
        },
        android: {
          title: 'Android & Desktop',
          platform: 'Chrome / Edge / Samsung Browser',
          steps: [
            'Open Anesthesia in Chrome or your preferred browser.',
            'Tap the browser menu (three dots icon) or look at the address bar.',
            'Select "Install app" or "Add to Home Screen".',
            'Follow the prompt to complete the installation.'
          ]
        }
      },
      footer: 'Note: To use the calculators, dosage reference, ICD-10 search, and previously-loaded clinical guidelines offline, make sure to sync the database first while you have an active internet connection.'
    },
    ai: {
      title: 'Configure Custom AI Providers',
      desc: 'Anesthesia includes a built-in free Groq AI provider for drug interactions and symptom checkers. However, for more intensive usage or specialized live search-capable reasoning, you can easily plug in your own API key.',
      providers: [
        {
          name: 'Gemini AI',
          badge: 'Live Search Capable',
          glow: 'rgba(59, 130, 246, 0.2)',
          steps: [
            'Navigate to the Settings tab in the sidebar.',
            'Set the AI Provider selection to "Gemini AI (Live Search capable)".',
            'Obtain a Gemini API Key from Google AI Studio (free tiers are highly accessible).',
            'Paste your key into the API Key field and click "Save Configuration".',
            'Gemini allows Anesthesia to perform real-time web searches to generate the latest evidence-based clinical practice guidelines.'
          ],
          linkText: 'Get a Gemini API Key from Google AI Studio',
          linkUrl: 'https://aistudio.google.com/'
        },
        {
          name: 'OpenAI Compatible Endpoint',
          badge: 'High Customizability',
          glow: 'rgba(139, 92, 246, 0.2)',
          steps: [
            'Navigate to the Settings tab in the sidebar.',
            'Set the AI Provider selection to "OpenAI Compatible Endpoint".',
            'Enter the target Endpoint URL (e.g. https://api.openai.com/v1, OpenRouter, or a local LM Studio/Ollama endpoint like http://localhost:11434/v1).',
            'Provide your custom API Key and the exact Model Name you wish to deploy (e.g., gpt-4o, llama-3.3-70b-versatile, etc.).',
            'Click "Save Configuration".'
          ]
        }
      ]
    },
    sync: {
      title: 'Clinical Database Synchronization',
      desc: 'To support offline workflows, Anesthesia caches clinical references in an indexed database directly in your browser.',
      cards: [
        {
          title: 'ICD-10 Codebook',
          info: 'Offline index of standard clinical classifications, symptoms, and coding conventions.'
        },
        {
          title: 'Drug Formulary',
          info: 'Pediatric and adult dosing references, indications, formulations, and contraindications.'
        },
        {
          title: 'Clinical Practice Guidelines (CPG)',
          info: 'Pre-seeded and AI-generated guidelines for emergency, pediatric, and general medicine.'
        },
        {
          title: 'Physical Exam Modules',
          info: 'Visual step-by-step physical exam guides mapped to interactive anatomical structures.'
        }
      ],
      howTo: 'How to Sync: If you see the "Database Not Synced" warning, or wish to update references, click "Sync Database" in the app shell or top menu. The sync agent will securely import official and curated data structures, storing them locally for seamless instant-load offline access.'
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Does my patient data leave my device?',
          a: 'No. Anesthesia is designed around clinical confidentiality and the HIPAA mindset. Calculators, drug dosage computations, and ICD-10 lookups run completely locally inside your browser\'s sandbox. When using the AI modules, only the specific medical query (e.g., "Aspirin and Warfarin interaction" or "symptoms of acute appendicitis") is sent to your selected API provider. No personally identifiable patient details are collected.'
        },
        {
          q: 'Can I use this app in the operating room or wards without internet?',
          a: 'Yes, absolutely. Once installed as a PWA and fully synchronized, Anesthesia behaves like an offline-first desktop or mobile application. You can calculate dosages, verify drug-drug interactions (using historical cache), consult ICD-10 charts, and view clinical guidelines or physical exam procedures offline. Note: Generating brand-new, un-cached CPGs or analyzing new symptoms via AI requires a connection to the API provider.'
        },
        {
          q: 'How can I add new guidelines or exam procedures to my offline database?',
          a: 'When you are online, search for the condition or procedure in the Clinical Practice Guidelines or Physical Exam tab. If the guideline does not exist in the pre-seeded library, click "Generate Guideline" or "Generate Guide". The AI will instantly search and compile the content. Once loaded, it is saved in your local offline database permanently.'
        },
        {
          q: 'What is the difference between Groq, Gemini, and OpenAI compatible configurations?',
          a: 'Groq is provided free out-of-the-box and has excellent inference speeds, making it perfect for symptom checking and fast drug lookups. Gemini allows the AI to perform real-time web searches to aggregate external reference materials when generating CPGs. OpenAI-compatible configurations allow you to use custom models, API proxies (like OpenRouter), or local offline endpoints (Ollama/LM Studio).'
        }
      ]
    },
    feedback: {
      title: 'Community, Feedback & Contributions',
      desc: 'Anesthesia is an open-source clinical project. We believe that clinical references should be highly accessible, customizable, and free for all medical practitioners worldwide.',
      actionTitle: 'Help Us Seed & Improve Anesthesia',
      actionDesc: 'If you want to give feedback, report issues, request features, or request additional clinical content to be pre-seeded into the default offline database, please collaborate directly on our GitHub project page.',
      btnText: 'Go to GitHub Repository'
    }
  }
};

// Structuring Indonesian Content
const contentId = {
  title: 'Wiki & Panduan Pengguna',
  subtitle: 'Pelajari cara mengonfigurasi, menginstal, menyinkronkan, dan memaksimalkan penggunaan Anesthesia.',
  toc: {
    title: 'Pada Halaman Ini',
    sections: [
      { id: 'introduction', label: 'Ringkasan' },
      { id: 'pwa', label: 'Mode Luring (PWA)' },
      { id: 'ai-provider', label: 'Konfigurasi AI' },
      { id: 'db-sync', label: 'Sinkronisasi Database' },
      { id: 'faq', label: 'FAQ' },
      { id: 'feedback', label: 'Umpan Balik & Dukungan' }
    ]
  },
  sections: {
    intro: {
      title: 'Selamat Datang di Anesthesia',
      desc: 'Anesthesia adalah asisten klinis bertenaga AI dan suite kalkulator medis offline canggih yang dirancang khusus untuk tenaga kesehatan. Untuk menjamin ketersediaan tinggi di lingkungan rumah sakit dengan koneksi internet terbatas, aplikasi ini dibangun sebagai Progressive Web Application (PWA) dengan basis data lokal.',
      highlight: 'Data klinis pasien Anda tidak pernah meninggalkan perangkat. Seluruh perhitungan, pencarian ICD-10, dan dosis obat dihitung 100% secara lokal.'
    },
    pwa: {
      title: 'Gunakan Secara Luring: PWA',
      desc: 'Anesthesia dapat beroperasi sepenuhnya tanpa koneksi internet (luring). Anda dapat menginstalnya di ponsel, tablet, atau komputer. Setelah diinstal, aplikasi ini akan berjalan seperti aplikasi bawaan (native)—terbuka secara instan dari layar beranda tanpa membutuhkan browser konvensional.',
      installBtn: 'Instal Aplikasi Anesthesia Sekarang',
      installBtnDesc: 'Klik untuk menginstal Anesthesia langsung di perangkat Anda.',
      installedMsg: '✓ Anesthesia telah terinstal di perangkat ini & berjalan secara mandiri.',
      iosSafariMsg: '📱 Menggunakan iOS Safari? Ketuk ikon Bagikan (kotak dengan panah atas) lalu pilih "Tambah ke Layar Utama" untuk menginstal.',
      notSupportedMsg: '⚡ Mode Luring Siap. Instal via menu peramban Anda untuk pengalaman aplikasi native.',
      steps: {
        ios: {
          title: 'iOS (iPhone / iPad)',
          platform: 'Peramban Safari',
          steps: [
            'Buka Anesthesia melalui browser Safari.',
            'Ketuk tombol Bagikan (Share) di bar menu bawah (ikon kotak dengan panah atas).',
            'Gulir ke bawah dan ketuk opsi "Tambah ke Layar Utama" (Add to Home Screen).',
            'Konfirmasi dengan mengetuk "Tambah" (Add) di pojok kanan atas.'
          ]
        },
        android: {
          title: 'Android & Desktop',
          platform: 'Peramban Chrome / Edge / Samsung',
          steps: [
            'Buka Anesthesia melalui Chrome atau peramban pilihan Anda.',
            'Ketuk menu peramban (ikon tiga titik) atau lihat baris alamat URL.',
            'Pilih opsi "Instal aplikasi" atau "Tambahkan ke Layar Utama".',
            'Ikuti petunjuk di layar untuk menyelesaikan instalasi.'
          ]
        }
      },
      footer: 'Catatan: Untuk menggunakan kalkulator, referensi dosis, pencarian ICD-10, serta Pedoman Praktik Klinis (PPK) yang telah tersimpan secara offline, pastikan Anda melakukan sinkronisasi database terlebih dahulu saat tersambung ke internet.'
    },
    ai: {
      title: 'Konfigurasi Penyedia AI Kustom',
      desc: 'Anesthesia dilengkapi dengan akses Groq AI bawaan secara gratis untuk analisis interaksi obat dan cek gejala. Namun, untuk penggunaan intensif atau kemampuan penalaran berbasis penelusuran web langsung (live search), Anda dapat dengan mudah menggunakan kunci API pribadi Anda.',
      providers: [
        {
          name: 'Gemini AI',
          badge: 'Mendukung Live Search',
          glow: 'rgba(59, 130, 246, 0.2)',
          steps: [
            'Buka menu Pengaturan (Settings) di sidebar.',
            'Ubah pilihan Penyedia AI menjadi "Gemini AI (Live Search)".',
            'Dapatkan Kunci API Gemini dari Google AI Studio (layanan gratis tersedia luas).',
            'Tempelkan kunci API Anda ke kolom Kunci API lalu klik "Simpan Konfigurasi".',
            'Gemini memungkinkan asisten AI melakukan penelusuran web real-time untuk menyusun pedoman praktik klinis berbasis bukti terbaru.'
          ],
          linkText: 'Dapatkan Kunci API Gemini di Google AI Studio',
          linkUrl: 'https://aistudio.google.com/'
        },
        {
          name: 'Endpoint Kompatibel OpenAI',
          badge: 'Fleksibilitas Tinggi',
          glow: 'rgba(139, 92, 246, 0.2)',
          steps: [
            'Buka menu Pengaturan (Settings) di sidebar.',
            'Ubah pilihan Penyedia AI menjadi "Endpoint Kompatibel OpenAI".',
            'Masukkan URL Endpoint tujuan Anda (misalnya https://api.openai.com/v1, OpenRouter, atau server lokal seperti Ollama/LM Studio dengan format http://localhost:11434/v1).',
            'Masukkan Kunci API Anda dan Nama Model spesifik yang ingin digunakan (seperti gpt-4o, llama-3.3-70b-versatile, dll.).',
            'Klik "Simpan Konfigurasi".'
          ]
        }
      ]
    },
    sync: {
      title: 'Sinkronisasi Database Klinis',
      desc: 'Untuk mendukung alur kerja luring penuh, Anesthesia menyimpan referensi klinis di basis data indeks (IndexedDB) langsung di dalam peramban Anda.',
      cards: [
        {
          title: 'Katalog ICD-10',
          info: 'Daftar kode klasifikasi klinis standar, deskripsi gejala, dan aturan pengodean medis luring.'
        },
        {
          title: 'Formularium Obat',
          info: 'Referensi dosis pediatrik dan dewasa berbasis berat badan, indikasi, kontraindikasi, serta bentuk sediaan.'
        },
        {
          title: 'Pedoman Praktik Klinis (PPK)',
          info: 'Koleksi PPK bawaan maupun hasil kreasi AI untuk kedaruratan medis, pediatri, dan penyakit umum.'
        },
        {
          title: 'Panduan Pemeriksaan Fisik',
          info: 'Panduan visual langkah-demi-langkah pemeriksaan fisik yang terintegrasi dengan peta anatomi tubuh.'
        }
      ],
      howTo: 'Cara Sinkronisasi: Jika Anda melihat peringatan "Database Belum Disinkronkan" atau ingin memperbarui data referensi, ketuk tombol "Sinkronkan Database" pada app shell atau menu utama. Agen sinkronisasi akan mengunduh dan menyusun data secara lokal di perangkat Anda.'
    },
    faq: {
      title: 'Pertanyaan yang Sering Diajukan (FAQ)',
      items: [
        {
          q: 'Apakah data pasien saya dikirim ke internet?',
          a: 'Tidak. Anesthesia dirancang untuk menjaga kerahasiaan medis pasien dan mematuhi prinsip HIPAA. Semua kalkulator, formula dosis, dan pencarian ICD-10 diproses secara lokal di dalam sandbox browser Anda. Ketika menggunakan fitur AI, hanya kueri medis umum (misal: "Interaksi Aspirin dan Warfarin" atau "gejala apendisitis akut") yang dikirimkan ke penyedia API pilihan Anda. Tidak ada data identitas pribadi pasien yang dikumpulkan.'
        },
        {
          q: 'Apakah aplikasi ini bisa saya gunakan di kamar operasi tanpa internet?',
          a: 'Ya, tentu saja. Begitu aplikasi terpasang sebagai PWA dan tersinkronisasi, Anesthesia beroperasi penuh secara luring. Anda dapat menghitung dosis, melihat kecocokan obat, membaca kode ICD-10, serta membuka PPK atau panduan pemeriksaan fisik yang telah tersimpan. Catatan: Pembuatan PPK baru atau analisis gejala baru lewat AI tetap memerlukan jaringan internet untuk menghubungi penyedia API.'
        },
        {
          q: 'Bagaimana cara menambahkan panduan klinis baru ke database offline saya?',
          a: 'Saat terhubung ke internet, cari diagnosis atau tindakan di tab Pedoman Praktik Klinis atau Pemeriksaan Fisik. Jika panduan belum tersedia di pustaka bawaan, klik tombol "Buat PPK" atau "Buat Panduan". AI akan mencarinya secara online dan menyusun panduan lengkap. Setelah termuat di layar, panduan tersebut secara otomatis disimpan di database lokal untuk diakses luring kapan saja.'
        },
        {
          q: 'Apa perbedaan antara konfigurasi Groq, Gemini, dan OpenAI?',
          a: 'Groq disediakan gratis secara langsung dari server kami dengan kecepatan respon yang sangat tinggi, cocok untuk cek gejala cepat. Gemini memungkinkan model melakukan penelusuran internet real-time (live search) untuk merangkum literatur medis eksternal saat membuat PPK baru. Pilihan OpenAI kompatibel memungkinkan Anda menghubungkan model kustom, proxy API (seperti OpenRouter), atau model lokal secara luring (Ollama/LM Studio).'
        }
      ]
    },
    feedback: {
      title: 'Komunitas, Masukan & Kontribusi',
      desc: 'Anesthesia adalah proyek klinis sumber terbuka (open-source). Kami percaya bahwa referensi klinis berkualitas harus mudah diakses, mudah dikonfigurasi, dan gratis bagi seluruh praktisi medis di seluruh dunia.',
      actionTitle: 'Bantu Kami Mengembangkan Database Anesthesia',
      actionDesc: 'Jika Anda ingin memberikan umpan balik, melaporkan kendala teknis, meminta fitur baru, atau mengajukan usulan data referensi obat/penyakit baru untuk dimasukkan ke dalam database bawaan default, silakan berkolaborasi di laman proyek GitHub kami.',
      btnText: 'Buka Repositori GitHub'
    }
  }
};

export default function TutorialPage() {
  const { language } = useAppStore();
  const content = language === 'en' ? contentEn : contentId;

  // Track state of expanded FAQ items
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // PWA Installation states
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsInstalled(!!isStandalone);

    // Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Handle standard PWA installation prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const handleAnchorScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2 border-b border-white/5 pb-6"
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ 
              background: 'linear-gradient(135deg, #0f766e, #14b8a6)', 
              boxShadow: '0 0 20px rgba(20,184,166,0.3)' 
            }}
          >
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[24px] font-[800] tracking-tight gradient-text">
              {content.title}
            </h1>
            <p className="text-[13px] text-slate-400">
              {content.subtitle}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sticky Sidebar Outline (Desktop only) */}
        <aside className="hidden lg:block w-[240px] shrink-0 sticky top-6 space-y-4">
          <div className="glass-card-static p-4 space-y-3">
            <h3 className="text-[11px] font-[700] uppercase tracking-[1.5px] text-slate-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              {content.toc.title}
            </h3>
            <nav className="flex flex-col gap-1.5">
              {content.toc.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleAnchorScroll(e, section.id)}
                  className="text-[12px] font-[500] py-1.5 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-200"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Wiki Body Content Area */}
        <div className="flex-1 w-full space-y-8">
          
          {/* Section 1: Introduction */}
          <section id="introduction" className="glass-card-static p-6 scroll-mt-20">
            <h2 className="text-[18px] font-[800] tracking-tight flex items-center gap-2 mb-4 text-slate-100">
              <Info className="w-5 h-5 text-teal-400" />
              {content.sections.intro.title}
            </h2>
            <div className="space-y-4 text-[13px] leading-relaxed text-slate-300">
              <p>{content.sections.intro.desc}</p>
              <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 text-teal-300 flex gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-teal-400 mt-0.5" />
                <p className="font-[500]">{content.sections.intro.highlight}</p>
              </div>
            </div>
          </section>

          {/* Section 2: PWA Installation */}
          <section id="pwa" className="glass-card-static p-6 scroll-mt-20 space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-[18px] font-[800] tracking-tight flex items-center gap-2 text-slate-100">
                <Smartphone className="w-5 h-5 text-sky-400" />
                {content.sections.pwa.title}
              </h2>
              <p className="text-[12px] text-slate-400">
                {content.sections.pwa.desc}
              </p>
            </div>

            {/* Smart PWA Action Button based on Device & State */}
            <div className="p-5 rounded-xl border border-sky-500/10 bg-slate-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-[13px] font-[750] text-slate-200">
                  {isInstalled 
                    ? (language === 'en' ? 'App Installed' : 'Aplikasi Terinstal') 
                    : (language === 'en' ? 'Instant Access' : 'Akses Instan')}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal max-w-md">
                  {isInstalled 
                    ? content.sections.pwa.installedMsg 
                    : deferredPrompt 
                      ? content.sections.pwa.installBtnDesc 
                      : isIOS 
                        ? content.sections.pwa.iosSafariMsg 
                        : content.sections.pwa.notSupportedMsg}
                </p>
              </div>

              {isInstalled ? (
                <span className="badge-offline flex items-center gap-1.5 px-3 py-1.5 shrink-0">
                  <span className="status-dot status-dot-green" />
                  <span>STANDALONE</span>
                </span>
              ) : deferredPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="btn-primary flex items-center justify-center gap-2 text-[12px] py-2.5 px-4 shadow-lg shrink-0 w-full sm:w-auto"
                  style={{ 
                    background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                    border: '1px solid rgba(14,165,233,0.3)',
                    boxShadow: '0 4px 14px rgba(14,165,233,0.25)'
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = '0 6px 20px rgba(14,165,233,0.35)';
                    el.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = '0 4px 14px rgba(14,165,233,0.25)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <Download className="w-4 h-4 text-white animate-bounce" />
                  <span>{content.sections.pwa.installBtn}</span>
                </button>
              ) : isIOS ? (
                <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/25 px-3 py-1.5 rounded-lg font-[600] text-center w-full sm:w-auto shrink-0">
                  Safari iOS Only
                </span>
              ) : (
                <span className="text-[11px] bg-slate-800 text-slate-300 border border-white/5 px-3 py-1.5 rounded-lg font-[600] text-center w-full sm:w-auto shrink-0">
                  {language === 'en' ? 'PWA Ready' : 'PWA Siap'}
                </span>
              )}
            </div>

            {/* Platform Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* iOS Guide */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <h3 className="text-[13px] font-[700] text-slate-100">{content.sections.pwa.steps.ios.title}</h3>
                    <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/25 px-2 py-0.5 rounded-full font-[600]">
                      {content.sections.pwa.steps.ios.platform}
                    </span>
                  </div>
                  <ol className="list-decimal list-inside text-[12px] space-y-2 text-slate-300 leading-relaxed pl-1">
                    {content.sections.pwa.steps.ios.steps.map((step, i) => (
                      <li key={i} className="pl-1"><span className="text-slate-400">{step}</span></li>
                    ))}
                  </ol>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-400">
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>No App Store account required</span>
                </div>
              </div>

              {/* Android/Desktop Guide */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <h3 className="text-[13px] font-[700] text-slate-100">{content.sections.pwa.steps.android.title}</h3>
                    <span className="text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/25 px-2 py-0.5 rounded-full font-[600]">
                      {content.sections.pwa.steps.android.platform}
                    </span>
                  </div>
                  <ol className="list-decimal list-inside text-[12px] space-y-2 text-slate-300 leading-relaxed pl-1">
                    {content.sections.pwa.steps.android.steps.map((step, i) => (
                      <li key={i} className="pl-1"><span className="text-slate-400">{step}</span></li>
                    ))}
                  </ol>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-400">
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  <span>Launches in borderless native window</span>
                </div>
              </div>

            </div>

            <div className="p-3.5 bg-sky-500/5 border border-sky-500/15 text-sky-300 rounded-xl text-[12px] leading-relaxed flex gap-2">
              <Info className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <span>{content.sections.pwa.footer}</span>
            </div>
          </section>

          {/* Section 3: Custom AI Providers */}
          <section id="ai-provider" className="glass-card-static p-6 scroll-mt-20 space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-[18px] font-[800] tracking-tight flex items-center gap-2 text-slate-100">
                <Cpu className="w-5 h-5 text-indigo-400" />
                {content.sections.ai.title}
              </h2>
              <p className="text-[12px] text-slate-400">
                {content.sections.ai.desc}
              </p>
            </div>

            {/* Provider Cards */}
            <div className="space-y-4">
              {content.sections.ai.providers.map((p, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 transition-all duration-300 hover:border-slate-700/80"
                  style={{ boxShadow: `0 4px 20px rgba(0, 0, 0, 0.25), inset 0 0 20px ${p.glow}` }}
                >
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h3 className="text-[14px] font-[850] text-slate-100 flex items-center gap-2">
                      <Key className="w-4 h-4 text-indigo-400" />
                      {p.name}
                    </h3>
                    <span className="text-[9px] uppercase tracking-[1px] font-[700] px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                      {p.badge}
                    </span>
                  </div>

                  <ul className="space-y-2 text-[12px] text-slate-300 leading-relaxed mb-4">
                    {p.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  {p.linkUrl && (
                    <a 
                      href={p.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-[700] text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                    >
                      <span>{p.linkText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Database Syncing */}
          <section id="db-sync" className="glass-card-static p-6 scroll-mt-20 space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-[18px] font-[800] tracking-tight flex items-center gap-2 text-slate-100">
                <Database className="w-5 h-5 text-amber-400" />
                {content.sections.sync.title}
              </h2>
              <p className="text-[12px] text-slate-400">
                {content.sections.sync.desc}
              </p>
            </div>

            {/* Sync Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.sections.sync.cards.map((c, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-1">
                  <h4 className="text-[12px] font-[750] text-slate-200">{c.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{c.info}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-300 text-[12px] leading-relaxed flex gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{content.sections.sync.howTo}</p>
            </div>
          </section>

          {/* Section 5: FAQ Accordion */}
          <section id="faq" className="glass-card-static p-6 scroll-mt-20 space-y-4">
            <h2 className="text-[18px] font-[800] tracking-tight flex items-center gap-2 text-slate-100 mb-4">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              {content.sections.faq.title}
            </h2>

            <div className="space-y-3">
              {content.sections.faq.items.map((item, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="rounded-xl border border-white/5 overflow-hidden transition-all duration-200"
                    style={{ background: isExpanded ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="text-[13px] font-[700] text-slate-200 pr-4">{item.q}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 shrink-0"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-4 pb-4 pt-1 text-[12px] leading-relaxed text-slate-400 border-t border-white/[0.03]">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 6: Feedback & Support (GitHub) */}
          <section id="feedback" className="glass-card-static p-6 scroll-mt-20 overflow-hidden relative">
            
            {/* Ambient Background Gradient for WOW factor */}
            <div 
              className="absolute right-[-40px] bottom-[-40px] w-64 h-64 rounded-full blur-[100px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 80%)' }}
            />
            <div 
              className="absolute left-[-40px] top-[-40px] w-64 h-64 rounded-full blur-[100px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 80%)' }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2">
                  <Github className="w-6 h-6 text-slate-100" />
                  <h2 className="text-[18px] font-[800] tracking-tight text-slate-100">
                    {content.sections.feedback.actionTitle}
                  </h2>
                </div>
                <p className="text-[13px] text-slate-300 leading-relaxed">
                  {content.sections.feedback.actionDesc}
                </p>
                <p className="text-[11px] text-slate-400 leading-normal italic">
                  {content.sections.feedback.desc}
                </p>
              </div>

              <a 
                href="https://github.com/rizqihan/Anesthesia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 text-[13px] py-3 px-5 shadow-lg shrink-0 whitespace-nowrap"
                style={{ 
                  background: 'linear-gradient(135deg, #1f2937, #111827)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.border = '1px solid rgba(255,255,255,0.2)';
                  el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6), 0 0 25px rgba(255,255,255,0.05)';
                  el.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.border = '1px solid rgba(255,255,255,0.1)';
                  el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <Github className="w-4 h-4 text-white" />
                <span>{content.sections.feedback.btnText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}
