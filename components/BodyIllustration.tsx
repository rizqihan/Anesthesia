'use client';

import React from 'react';
import { motion } from 'motion/react';

interface BodyIllustrationProps {
  activePartId: string | null;
  onPartClick?: (partId: string) => void;
}

export default function BodyIllustration({ activePartId, onPartClick }: BodyIllustrationProps) {
  // SVG part styles
  const getPartStyles = (partId: string) => {
    const isActive = activePartId === partId;
    return {
      fill: isActive ? 'rgba(129, 140, 248, 0.25)' : 'rgba(255, 255, 255, 0.02)',
      stroke: isActive ? '#818cf8' : 'rgba(255, 255, 255, 0.15)',
      strokeWidth: isActive ? 2.5 : 1.5,
      filter: isActive ? 'url(#neon-glow)' : 'none',
      transition: 'all 0.3s ease',
    };
  };

  const bodyParts = [
    {
      id: 'head',
      name: { en: 'Head & Face', id: 'Kepala & Wajah' },
      path: 'M 100,25 C 85,25 75,37 75,55 C 75,73 85,85 100,85 C 115,85 125,73 125,55 C 125,37 115,25 100,25 Z',
    },
    {
      id: 'neck',
      name: { en: 'Neck', id: 'Leher' },
      path: 'M 92,85 L 108,85 L 108,105 L 92,105 Z',
    },
    {
      id: 'chest',
      name: { en: 'Chest & Thorax', id: 'Dada & Toraks' },
      path: 'M 68,105 L 132,105 C 132,105 138,130 135,160 C 132,190 120,195 120,195 L 80,195 C 80,195 68,190 65,160 C 62,130 68,105 68,105 Z',
    },
    {
      id: 'abdomen',
      name: { en: 'Abdomen', id: 'Perut' },
      path: 'M 80,195 L 120,195 L 115,260 C 115,260 110,280 100,280 C 90,280 85,260 85,260 Z',
    },
  ];

  // Symmetric elements grouped together
  const arms = [
    // Left Arm
    'M 68,105 C 60,105 50,115 48,130 L 32,230 C 30,240 35,250 42,250 C 49,250 53,240 55,230 L 65,155 L 68,125 Z',
    // Right Arm
    'M 132,105 C 140,105 150,115 152,130 L 168,230 C 170,240 165,250 158,250 C 151,250 147,240 145,230 L 135,155 L 132,125 Z',
  ];

  const legs = [
    // Left Leg
    'M 85,260 C 85,260 82,290 80,330 L 70,470 C 69,480 75,485 82,485 C 89,485 92,480 93,470 L 98,330 L 97,272 Z',
    // Right Leg
    'M 115,260 C 115,260 118,290 120,330 L 130,470 C 131,480 125,485 118,485 C 111,485 108,480 107,470 L 102,330 L 103,272 Z',
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[380px] p-4 glass-card relative overflow-hidden">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

      <svg
        viewBox="0 0 200 500"
        className="w-full max-w-[200px] h-auto cursor-pointer filter drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Neon Glow Filter */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          {/* Render individual single parts */}
          {bodyParts.map((part) => (
            <path
              key={part.id}
              d={part.path}
              className="transition-all duration-300 hover:fill-indigo-500/10"
              style={getPartStyles(part.id)}
              onClick={() => onPartClick && onPartClick(part.id)}
            />
          ))}

          {/* Render symmetric Arms */}
          <g 
            onClick={() => onPartClick && onPartClick('arms')}
            className="group cursor-pointer"
          >
            {arms.map((path, idx) => (
              <path
                key={`arm-${idx}`}
                d={path}
                className="transition-all duration-300 group-hover:fill-indigo-500/10"
                style={getPartStyles('arms')}
              />
            ))}
          </g>

          {/* Render symmetric Legs */}
          <g 
            onClick={() => onPartClick && onPartClick('legs')}
            className="group cursor-pointer"
          >
            {legs.map((path, idx) => (
              <path
                key={`leg-${idx}`}
                d={path}
                className="transition-all duration-300 group-hover:fill-indigo-500/10"
                style={getPartStyles('legs')}
              />
            ))}
          </g>
        </g>
      </svg>

      {/* active label */}
      <div className="mt-4 text-center shrink-0">
        <span className="text-[10px] uppercase tracking-widest font-[700]" style={{ color: 'var(--text-muted)' }}>
          Active Target Region
        </span>
        <h4 className="text-[14px] font-[800] mt-1 transition-all" style={{ color: activePartId ? '#a5b4fc' : 'var(--text-primary)' }}>
          {activePartId
            ? activePartId.toUpperCase()
            : 'Select a step to view target area'}
        </h4>
      </div>
    </div>
  );
}
