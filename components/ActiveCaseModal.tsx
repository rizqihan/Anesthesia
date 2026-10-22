'use client';

import React from 'react';
import { useAppStore } from '@/store/appStore';
import { X, User, Scale, Ruler, Calendar, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface ActiveCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActiveCaseModal({ isOpen, onClose }: ActiveCaseModalProps) {
  const { activeCase, setActiveCase, language } = useAppStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="glass-card-static w-full max-w-lg p-6 relative bg-[#0e1424] border border-white/10 shadow-2xl rounded-2xl"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-[800] text-slate-100">
                {language === 'en' ? 'Active Case Session' : 'Sesi Pasien Aktif'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {language === 'en'
                  ? 'Parameters pre-fill all clinical calculators and dosing tools'
                  : 'Parameter otomatis mengisi semua kalkulator dan dosis'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-blue-400" />
                {language === 'en' ? 'Weight (kg)' : 'Berat Badan (kg)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="300"
                value={activeCase.patientWeight}
                onChange={(e) => setActiveCase({ patientWeight: e.target.value })}
                placeholder="70"
                className="glass-input w-full px-3.5 py-2.5 text-[14px] font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="form-label flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-blue-400" />
                {language === 'en' ? 'Height (cm)' : 'Tinggi Badan (cm)'}
              </label>
              <input
                type="number"
                step="1"
                min="30"
                max="250"
                value={activeCase.patientHeight}
                onChange={(e) => setActiveCase({ patientHeight: e.target.value })}
                placeholder="170"
                className="glass-input w-full px-3.5 py-2.5 text-[14px] font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                {language === 'en' ? 'Age (years)' : 'Usia (tahun)'}
              </label>
              <input
                type="number"
                step="1"
                min="0"
                max="120"
                value={activeCase.patientAge}
                onChange={(e) => setActiveCase({ patientAge: e.target.value })}
                placeholder="45"
                className="glass-input w-full px-3.5 py-2.5 text-[14px] font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="form-label">{language === 'en' ? 'Biological Sex' : 'Jenis Kelamin'}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCase({ patientSex: 'M' })}
                  className={`py-2 px-3 rounded-lg text-[12px] font-[700] border transition-all ${
                    activeCase.patientSex === 'M'
                      ? 'bg-blue-600/25 border-blue-500/50 text-blue-300'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {language === 'en' ? 'Male (M)' : 'Laki-laki (L)'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCase({ patientSex: 'F' })}
                  className={`py-2 px-3 rounded-lg text-[12px] font-[700] border transition-all ${
                    activeCase.patientSex === 'F'
                      ? 'bg-rose-600/25 border-rose-500/50 text-rose-300'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {language === 'en' ? 'Female (F)' : 'Perempuan (P)'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <label className="form-label flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                ASA Classification
              </label>
              <select
                value={activeCase.asaClass}
                onChange={(e) => setActiveCase({ asaClass: e.target.value as any })}
                className="glass-input w-full px-3 py-2 text-[13px] font-[600]"
              >
                <option value="I">ASA I — Normal healthy patient</option>
                <option value="II">ASA II — Mild systemic disease</option>
                <option value="III">ASA III — Severe systemic disease</option>
                <option value="IV">ASA IV — Severe disease threat to life</option>
                <option value="V">ASA V — Moribund patient</option>
                <option value="E">ASA E — Emergency procedure</option>
              </select>
            </div>

            <div>
              <label className="form-label">Mallampati Airway Score</label>
              <select
                value={activeCase.mallampati}
                onChange={(e) => setActiveCase({ mallampati: e.target.value as any })}
                className="glass-input w-full px-3 py-2 text-[13px] font-[600]"
              >
                <option value="I">Class I — Soft palate, fauces, uvula, pillars</option>
                <option value="II">Class II — Soft palate, fauces, portion uvula</option>
                <option value="III">Class III — Soft palate, base of uvula</option>
                <option value="IV">Class IV — Hard palate only (Difficult Airway)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary px-5 py-2 text-[13px] font-[700] rounded-xl"
          >
            {language === 'en' ? 'Apply to Active Session' : 'Terapkan ke Sesi'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
