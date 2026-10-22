'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  Baby,
  Scale,
  Copy,
  Check,
  Zap,
  Activity,
  Syringe,
  Sparkles,
  Info,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  BROSELOW_ZONES,
  BroselowZone,
  getBroselowZoneByWeight,
  calculatePediatricDoses,
} from '@/lib/emergencyProtocols';

export default function BroselowTapePicker() {
  const { language, activeCase, setActiveCase } = useAppStore();
  const currentStoreWeight = parseFloat(activeCase.patientWeight) || 12;

  // Selected weight state (defaults to store weight if <= 36, else 12kg)
  const [weightKg, setWeightKg] = useState<number>(
    currentStoreWeight <= 36 && currentStoreWeight >= 3 ? currentStoreWeight : 12
  );
  const [copied, setCopied] = useState(false);

  // Derive active Broselow zone and doses
  const activeZone = getBroselowZoneByWeight(weightKg);
  const doses = calculatePediatricDoses(weightKg);

  // Select zone handler
  const handleSelectZone = (zone: BroselowZone) => {
    setWeightKg(zone.weightDefault);
  };

  // Sync weight to active case
  const handleSyncToCase = () => {
    setActiveCase({ patientWeight: weightKg.toString() });
  };

  // Copy pediatric resuscitation summary
  const handleCopySummary = () => {
    const summary = [
      `PEDIATRIC BROSELOW RESUSCITATION SUMMARY`,
      `Color Zone: ${activeZone.colorName.toUpperCase()} (${activeZone.weightRange})`,
      `Patient Weight: ${weightKg} kg | Approx Age: ${activeZone.approxAge} | Length: ${activeZone.lengthRangeCm}`,
      `----------------------------------------`,
      `AIRWAY & RESUSCITATION EQUIPMENT:`,
      `• ETT Cuffed: ${activeZone.equipment.ettCuffed}`,
      `• ETT Uncuffed: ${activeZone.equipment.ettUncuffed}`,
      `• ETT Depth at Lips: ${activeZone.equipment.ettDepthCm}`,
      `• Laryngoscope Blade: ${activeZone.equipment.bladeTypeAndSize}`,
      `• LMA Size: ${activeZone.equipment.lmaSize}`,
      `• Suction Catheter: ${activeZone.equipment.suctionFr}`,
      `• Foley Catheter: ${activeZone.equipment.foleyFr}`,
      `• Chest Tube: ${activeZone.equipment.chestTubeFr}`,
      `• NG/OG Tube: ${activeZone.equipment.ngOgFr}`,
      `• Vascular Access: ${activeZone.equipment.ivGauge} IV / ${activeZone.equipment.ioNeedle} IO`,
      `• Defibrillator Paddles: ${activeZone.equipment.paddles}`,
      `----------------------------------------`,
      `CALCULATED RESUSCITATION DOSES:`,
      `• Epinephrine (Cardiac Arrest): ${doses.epiArrestMg} mg IV/IO (${doses.epiArrestMl} mL of 1:10,000)`,
      `• Epinephrine (Anaphylaxis/IM): ${doses.epiAnaphylaxisMg} mg IM (${doses.epiAnaphylaxisMl} mL of 1:1,000)`,
      `• Defibrillation Initial (2 J/kg): ${doses.defibrillationInitialJ} Joules`,
      `• Defibrillation Subsequent (4 J/kg): ${doses.defibrillationSubsequentJ} Joules`,
      `• Cardioversion (0.5–1 J/kg): ${doses.cardioversionInitialJ} Joules`,
      `• Amiodarone (Arrest 5 mg/kg): ${doses.amiodaroneArrestMg} mg IV push`,
      `• Atropine (0.02 mg/kg): ${doses.atropineMg} mg IV/IO (${doses.atropineMl} mL)`,
      `• D10W Bolus (5 mL/kg): ${doses.d10wBolusMl} mL IV`,
      `• Crystalloid Fluid Bolus (20 mL/kg): ${doses.crystalloidBolusMl} mL IV/IO`,
      `• Adenosine (0.1 mg/kg): ${doses.adenosineFirstMg} mg (2nd dose: ${doses.adenosineSecondMg} mg)`,
      `• Succinylcholine (2 mg/kg): ${doses.succinylcholineIvMg} mg IV`,
      `• Rocuronium (1 mg/kg): ${doses.rocuroniumIvMg} mg IV`,
    ];
    navigator.clipboard.writeText(summary.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Weight Synchronizer */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-[900] text-slate-100">
                {language === 'en'
                  ? 'Pediatric Broselow Tape & Equipment Sizer'
                  : 'Pita Broselow & Ukuran Alat Pediatrik'}
              </h2>
              <p className="text-[12px] text-slate-400">
                {language === 'en'
                  ? 'Instant weight-calculated resuscitation equipment sizing and emergency drug doses'
                  : 'Ukuran alat resusitasi dan dosis obat darurat anak otomatis berdasarkan berat badan'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopySummary}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[12px] font-[700] flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSyncToCase}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-200 hover:bg-blue-600/30 text-[12px] font-[700] flex items-center gap-1.5"
              title="Set this weight as active patient weight across app"
            >
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Sync to Active Patient ({weightKg} kg)</span>
            </motion.button>
          </div>
        </div>

        {/* Color Zone Selector Bar */}
        <div className="space-y-2 pt-2">
          <label className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
            {language === 'en' ? 'Broselow Color Zones (3 to 36 kg)' : 'Zona Warna Broselow (3 - 36 kg)'}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
            {BROSELOW_ZONES.map((zone) => {
              const isSelected = activeZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => handleSelectZone(zone)}
                  style={{
                    backgroundColor: zone.colorHex,
                    color: zone.textColorHex,
                  }}
                  className={`min-h-[44px] py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center relative font-[800] ${
                    isSelected
                      ? 'ring-2 ring-white scale-[1.03] shadow-lg z-10'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className="text-[11px] font-black uppercase leading-tight tracking-wider">
                    {zone.colorName}
                  </span>
                  <span className="text-[10px] font-mono font-[700] opacity-90">
                    {zone.weightRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Numeric Weight Stepper / Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-[700] text-slate-300">
              {language === 'en' ? 'Fine-Tune Weight:' : 'Atur Berat Teliti:'}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setWeightKg((prev) => Math.max(3, +(prev - 1).toFixed(1)))}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-[14px] flex items-center justify-center"
              >
                -
              </button>
              <div className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-700 font-mono text-[16px] font-[900] text-blue-400 tabular-nums">
                {weightKg} kg
              </div>
              <button
                onClick={() => setWeightKg((prev) => Math.min(36, +(prev + 1).toFixed(1)))}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-[14px] flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-slate-400">
            <div>
              Approx Age: <strong className="text-slate-200">{activeZone.approxAge}</strong>
            </div>
            <div>•</div>
            <div>
              Length: <strong className="text-slate-200">{activeZone.lengthRangeCm}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Sizing Grid */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-[16px] font-[800] text-slate-100">
              {language === 'en' ? 'Airway & Resuscitation Equipment Sizing' : 'Ukuran Alat Jalan Napas & Resusitasi'}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Zone: <strong className="text-slate-200">{activeZone.colorName}</strong> ({weightKg} kg)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Cuffed ETT */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Endotracheal Tube (Cuffed)
            </div>
            <div className="text-[20px] font-[900] font-mono text-blue-400 tabular-nums my-0.5">
              {activeZone.equipment.ettCuffed}
            </div>
            <div className="text-[11px] text-slate-400">
              Formula: (Age / 4) + 3.5 mm ID
            </div>
          </div>

          {/* Uncuffed ETT */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Endotracheal Tube (Uncuffed)
            </div>
            <div className="text-[20px] font-[900] font-mono text-slate-200 tabular-nums my-0.5">
              {activeZone.equipment.ettUncuffed}
            </div>
            <div className="text-[11px] text-slate-400">
              Formula: (Age / 4) + 4.0 mm ID
            </div>
          </div>

          {/* Insertion Depth */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              ETT Insertion Depth
            </div>
            <div className="text-[20px] font-[900] font-mono text-amber-400 tabular-nums my-0.5">
              {activeZone.equipment.ettDepthCm}
            </div>
            <div className="text-[11px] text-slate-400">
              Mark at lips: ETT ID &times; 3
            </div>
          </div>

          {/* Laryngoscope Blade */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Laryngoscope Blade
            </div>
            <div className="text-[17px] font-[900] font-mono text-slate-100 my-0.5">
              {activeZone.equipment.bladeTypeAndSize}
            </div>
            <div className="text-[11px] text-slate-400">
              Straight (Miller) preferred in infants to lift floppy epiglottis
            </div>
          </div>

          {/* LMA Size */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Laryngeal Mask Airway (LMA)
            </div>
            <div className="text-[17px] font-[900] font-mono text-emerald-400 my-0.5">
              {activeZone.equipment.lmaSize}
            </div>
            <div className="text-[11px] text-slate-400">
              Supraglottic rescue airway
            </div>
          </div>

          {/* Suction & NG/OG */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Suction &amp; Gastric Tubes
            </div>
            <div className="text-[17px] font-[900] font-mono text-slate-200 my-0.5">
              Suction {activeZone.equipment.suctionFr} | NG {activeZone.equipment.ngOgFr}
            </div>
            <div className="text-[11px] text-slate-400">
              Decompress stomach during bag-mask ventilation
            </div>
          </div>

          {/* Foley & Chest Tube */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Foley &amp; Chest Tube
            </div>
            <div className="text-[17px] font-[900] font-mono text-slate-200 my-0.5">
              Foley {activeZone.equipment.foleyFr} | Chest {activeZone.equipment.chestTubeFr}
            </div>
            <div className="text-[11px] text-slate-400">
              Tube thoracostomy for hemothorax / pneumothorax
            </div>
          </div>

          {/* Vascular Access */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Vascular &amp; IO Access
            </div>
            <div className="text-[17px] font-[900] font-mono text-cyan-400 my-0.5">
              IV: {activeZone.equipment.ivGauge} | IO: {activeZone.equipment.ioNeedle}
            </div>
            <div className="text-[11px] text-slate-400">
              Proximal tibia or distal femur IO if IV unavailable &gt; 90s
            </div>
          </div>

          {/* Defibrillator Paddles */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Defib Paddles &amp; BP Cuff
            </div>
            <div className="text-[17px] font-[900] font-mono text-rose-300 my-0.5">
              {activeZone.equipment.paddles}
            </div>
            <div className="text-[11px] text-slate-400">
              Cuff: {activeZone.equipment.bpCuff}
            </div>
          </div>
        </div>
      </div>

      {/* Calculated Resuscitation Doses */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Syringe className="w-4 h-4 text-rose-400" />
            <h3 className="text-[16px] font-[800] text-slate-100">
              {language === 'en'
                ? `Emergency Resuscitation Doses for ${weightKg} kg`
                : `Dosis Resusitasi Darurat untuk ${weightKg} kg`}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Epinephrine Arrest */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-rose-400 uppercase tracking-wider">
              <span>Epinephrine (Arrest)</span>
              <span>0.01 mg/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-rose-200 tabular-nums my-1">
              {doses.epiArrestMg} mg <span className="text-[14px] text-slate-400">IV/IO</span>
            </div>
            <div className="text-[12px] font-mono text-slate-300">
              1:10,000 solution = <strong className="text-rose-300">{doses.epiArrestMl} mL</strong>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Give every 3–5 min. Flush with 5–10 mL NS.
            </p>
          </div>

          {/* Epinephrine Anaphylaxis */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-blue-400 uppercase tracking-wider">
              <span>Epi (Anaphylaxis/IM)</span>
              <span>0.01 mg/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-blue-200 tabular-nums my-1">
              {doses.epiAnaphylaxisMg} mg <span className="text-[14px] text-slate-400">IM</span>
            </div>
            <div className="text-[12px] font-mono text-slate-300">
              1:1,000 solution = <strong className="text-blue-300">{doses.epiAnaphylaxisMl} mL</strong>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Inject into anterolateral thigh.
            </p>
          </div>

          {/* Defibrillation */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-amber-400 uppercase tracking-wider">
              <span>Defibrillation (VF/pVT)</span>
              <span>2 &rarr; 4 J/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-amber-200 tabular-nums my-1">
              {doses.defibrillationInitialJ} J <span className="text-[14px] text-slate-400">(Initial)</span>
            </div>
            <div className="text-[12px] font-mono text-slate-300">
              Subsequent shocks: <strong className="text-amber-300">{doses.defibrillationSubsequentJ} J</strong> (4 J/kg)
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Cardioversion for SVT/VT with pulse: {doses.cardioversionInitialJ} J (0.5–1 J/kg).
            </p>
          </div>

          {/* Amiodarone */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-purple-400 uppercase tracking-wider">
              <span>Amiodarone IV</span>
              <span>5 mg/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-purple-200 tabular-nums my-1">
              {doses.amiodaroneArrestMg} mg <span className="text-[14px] text-slate-400">IV/IO</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              For refractory VF / pulseless VT after 3rd shock. Repeat up to 15 mg/kg max.
            </p>
          </div>

          {/* Atropine */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-emerald-400 uppercase tracking-wider">
              <span>Atropine Sulfate</span>
              <span>0.02 mg/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-emerald-200 tabular-nums my-1">
              {doses.atropineMg} mg <span className="text-[14px] text-slate-400">IV/IO</span>
            </div>
            <div className="text-[12px] font-mono text-slate-300">
              0.1 mg/mL = <strong className="text-emerald-300">{doses.atropineMl} mL</strong>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Minimum 0.1 mg (prevents paradoxical bradycardia). Max single dose 0.5 mg.
            </p>
          </div>

          {/* D10W Hypoglycemia */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-cyan-400 uppercase tracking-wider">
              <span>D10W (Hypoglycemia)</span>
              <span>5 mL/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-cyan-200 tabular-nums my-1">
              {doses.d10wBolusMl} mL <span className="text-[14px] text-slate-400">IV bolus</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Dextrose 10% (0.5 g/kg). Avoid hypertonic D50W in pediatrics (risk of hyperosmolality &amp; vein sclerosis).
            </p>
          </div>

          {/* Crystalloid Fluid Bolus */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-blue-400 uppercase tracking-wider">
              <span>Crystalloid Bolus</span>
              <span>20 mL/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-blue-200 tabular-nums my-1">
              {doses.crystalloidBolusMl} mL <span className="text-[14px] text-slate-400">IV push</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Normal Saline or Balanced Salt Solution over 10–20 min for hypovolemic/septic shock.
            </p>
          </div>

          {/* Adenosine */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-indigo-400 uppercase tracking-wider">
              <span>Adenosine (SVT)</span>
              <span>0.1 &rarr; 0.2 mg/kg</span>
            </div>
            <div className="text-[24px] font-[900] font-mono text-indigo-200 tabular-nums my-1">
              {doses.adenosineFirstMg} mg <span className="text-[14px] text-slate-400">1st dose</span>
            </div>
            <div className="text-[12px] font-mono text-slate-300">
              2nd dose: <strong className="text-indigo-300">{doses.adenosineSecondMg} mg</strong>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Rapid push closest to heart followed immediately by 5–10 mL saline flush.
            </p>
          </div>

          {/* RSI Neuromuscular Blockers */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-[700] text-rose-400 uppercase tracking-wider">
              <span>RSI Paralytics</span>
              <span>Sux vs Roc</span>
            </div>
            <div className="text-[18px] font-[900] font-mono text-slate-200 tabular-nums my-1">
              Sux: {doses.succinylcholineIvMg} mg (2mg/kg)
            </div>
            <div className="text-[18px] font-[900] font-mono text-slate-200 tabular-nums">
              Roc: {doses.rocuroniumIvMg} mg (1mg/kg)
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Give Atropine 0.02 mg/kg prior to Succinylcholine in infants &lt; 1 yr to avoid bradycardia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
