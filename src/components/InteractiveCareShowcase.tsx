import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useMediVault } from '../context/MediVaultContext';

import homeSampleImg from '../assets/images/home_sample_pickup_1793209760555.jpg';
import labTestingImg from '../assets/images/lab_blood_testing_1793209760590.jpg';
import pharmacyImg from '../assets/images/pharmacy_medicine_box_1793209761740.jpg';
import teleconsultImg from '../assets/images/doctor_teleconsult_1793209761263.jpg';
import cardioImg from '../assets/images/doctor_sharma_cardio_1793207660756.jpg';

interface ShowcaseCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  badgeColor: string;
  image: string;
  action: () => void;
  ctaText: string;
}

export const InteractiveCareShowcase: React.FC = () => {
  const { setActiveTab, setAddAptModalOpen, setUploadModalOpen, showToast } = useMediVault();
  const [isHoveredStack, setIsHoveredStack] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const cards: ShowcaseCard[] = [
    {
      id: 'sample-collection',
      title: 'Doorstep Sample Collection',
      subtitle: 'Certified phlebotomists with temperature-regulated cold bags',
      category: 'Home Diagnostic',
      badge: 'Free Home Pickup',
      badgeColor: 'bg-[#ff6f61] text-white',
      image: homeSampleImg,
      ctaText: 'Schedule Pickup',
      action: () => {
        setAddAptModalOpen(true);
        showToast('Booking sterile doorstep blood collection...', 'info');
      },
    },
    {
      id: 'lab-diagnostics',
      title: 'NABL Lab Diagnostics',
      subtitle: 'Comprehensive 70+ biomarker screening with 24-hr report',
      category: 'Pathology Lab',
      badge: 'NABL Accredited',
      badgeColor: 'bg-emerald-600 text-white',
      image: labTestingImg,
      ctaText: 'Explore Tests',
      action: () => {
        setActiveTab('medical-records');
        showToast('Viewing NABL accredited lab diagnostic panels', 'info');
      },
    },
    {
      id: 'prescription-delivery',
      title: 'Doorstep Prescription Delivery',
      subtitle: 'Express medication refills directly from verified pharmacies',
      category: 'Pharmacy Sync',
      badge: 'Express Refill',
      badgeColor: 'bg-amber-600 text-white',
      image: pharmacyImg,
      ctaText: 'Refill Regimen',
      action: () => {
        setActiveTab('medicines');
        showToast('Opening active medication regimen & refill center', 'info');
      },
    },
    {
      id: 'teleconsult',
      title: 'Verified Teleconsultation',
      subtitle: 'Instant encrypted video consults with board-certified physicians',
      category: 'Telehealth',
      badge: 'Instant MD Connect',
      badgeColor: 'bg-teal-600 text-white',
      image: teleconsultImg,
      ctaText: 'Consult Online',
      action: () => {
        setAddAptModalOpen(true);
        showToast('Connecting to verified digital teleconsultation...', 'info');
      },
    },
    {
      id: 'specialist-cardio',
      title: 'Specialist Cardiology Review',
      subtitle: 'Senior DM cardiologists reviewing ECG, lipid profiles & risk',
      category: 'Clinical OPD',
      badge: 'Specialist OPD',
      badgeColor: 'bg-rose-600 text-white',
      image: cardioImg,
      ctaText: 'Book Appointment',
      action: () => {
        setActiveTab('appointments');
        showToast('Scheduling consultation with Senior Cardiologist', 'info');
      },
    },
  ];

  // Calculated fan transforms for the 5 cards
  const getFanTransform = (index: number, total: number) => {
    const center = (total - 1) / 2;
    const offset = index - center; // -2, -1, 0, 1, 2

    if (isHoveredStack) {
      // Expanded fan when user hovers over card stack area
      return {
        rotate: offset * 11, // -22, -11, 0, 11, 22 deg
        x: offset * 48,      // -96, -48, 0, 48, 96 px
        y: Math.abs(offset) * 10 - 15,
        scale: 1.03,
      };
    }

    // Default resting fanned stack (matching user's screenshot)
    return {
      rotate: offset * 6,  // -12, -6, 0, 6, 12 deg
      x: offset * 28,      // -56, -28, 0, 28, 56 px
      y: Math.abs(offset) * 6,
      scale: 1,
    };
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ff6f61]/20 shadow-sm relative overflow-hidden transition-all">
      {/* Background glow accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#fff2ef]/80 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Side: Copy and Service Badges */}
        <div className="w-full lg:max-w-xl flex flex-col">
          {/* Header pill badge */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#fff2ef] text-[#ff6f61] border border-[#ff6f61]/20 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#ff6f61] animate-pulse" />
              Interactive Care Services Showcase
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              · Hover or click any card
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Complete At-Home Diagnostics &amp; Integrated Clinical Care
          </h2>

          <p className="text-sm text-neutral-600 mt-2.5 leading-relaxed">
            Hover over the animated card stack to explore services. Click on any card or badge below to instantly schedule sample collection, review verified lab test results, refill prescriptions, or consult with doctors online.
          </p>

          {/* 6 Interactive Service Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            {/* 1. Home Phlebotomy */}
            <button
              type="button"
              onClick={() => {
                setAddAptModalOpen(true);
                showToast('Scheduling doorstep phlebotomist collection...', 'info');
              }}
              className="p-3 bg-white hover:bg-[#fff2ef]/40 border border-neutral-200/90 hover:border-[#ff6f61] rounded-xl text-left transition-all cursor-pointer group shadow-2xs flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-[#ff6f61]">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                  home_health
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-[#ff6f61] leading-tight">
                  Home Phlebotomy
                </span>
              </div>
              <span className="text-[11px] text-neutral-500 leading-tight">
                Sterile doorstep blood pickup
              </span>
            </button>

            {/* 2. NABL Lab Testing */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('medical-records');
                showToast('Viewing 70+ parameter NABL smart diagnostic reports', 'info');
              }}
              className="p-3 bg-white hover:bg-emerald-50/50 border border-neutral-200/90 hover:border-emerald-500 rounded-xl text-left transition-all cursor-pointer group shadow-2xs flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                  biotechnology
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-emerald-700 leading-tight">
                  NABL Lab Testing
                </span>
              </div>
              <span className="text-[11px] text-neutral-500 leading-tight">
                70+ parameter smart reports
              </span>
            </button>

            {/* 3. Medicine Delivery */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('medicines');
                showToast('Opening prescription pharmacy refill system', 'info');
              }}
              className="p-3 bg-white hover:bg-amber-50/50 border border-neutral-200/90 hover:border-amber-500 rounded-xl text-left transition-all cursor-pointer group shadow-2xs flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-amber-600">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                  local_shipping
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-800 leading-tight">
                  Medicine Delivery
                </span>
              </div>
              <span className="text-[11px] text-neutral-500 leading-tight">
                Doorstep prescription fulfillment
              </span>
            </button>

            {/* 4. Teleconsultation */}
            <button
              type="button"
              onClick={() => {
                setAddAptModalOpen(true);
                showToast('Initiating teleconsultation session...', 'info');
              }}
              className="p-3 bg-white hover:bg-teal-50/50 border border-neutral-200/90 hover:border-teal-500 rounded-xl text-left transition-all cursor-pointer group shadow-2xs flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-teal-600">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                  video_camera_front
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-teal-700 leading-tight">
                  Teleconsultation
                </span>
              </div>
              <span className="text-[11px] text-neutral-500 leading-tight">
                Instant video consult with MD
              </span>
            </button>

            {/* 5. Specialist OPD */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('appointments');
                showToast('Reviewing senior specialist doctors & OPD clinics', 'info');
              }}
              className="p-3 bg-white hover:bg-purple-50/50 border border-neutral-200/90 hover:border-purple-500 rounded-xl text-left transition-all cursor-pointer group shadow-2xs flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-purple-600">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                  stethoscope
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-purple-700 leading-tight">
                  Specialist OPD
                </span>
              </div>
              <span className="text-[11px] text-neutral-500 leading-tight">
                Cardiology &amp; internal medicine
              </span>
            </button>

            {/* 6. React Bits Animated Badge */}
            <div className="p-3 bg-gradient-to-r from-[#fff2ef] to-rose-50 border border-[#ff6f61]/30 rounded-xl flex items-center justify-center gap-2 shadow-2xs">
              <span className="material-symbols-outlined text-[20px] text-[#ff6f61] animate-spin" style={{ animationDuration: '6s' }}>
                animation
              </span>
              <span className="text-xs font-bold text-[#ff6f61]">
                React Bits Animated
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Card Fan / Stack */}
        <div className="w-full lg:w-[480px] flex flex-col items-center">
          <div
            className="relative w-full h-[290px] flex items-center justify-center cursor-pointer select-none py-4"
            onMouseEnter={() => setIsHoveredStack(true)}
            onMouseLeave={() => {
              setIsHoveredStack(false);
              setActiveCardId(null);
            }}
          >
            {cards.map((card, index) => {
              const fan = getFanTransform(index, cards.length);
              const isCardHovered = activeCardId === card.id;

              return (
                <motion.div
                  key={card.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    card.action();
                  }}
                  onMouseEnter={() => setActiveCardId(card.id)}
                  animate={{
                    rotate: isCardHovered ? 0 : fan.rotate,
                    x: isCardHovered ? 0 : fan.x,
                    y: isCardHovered ? -26 : fan.y,
                    scale: isCardHovered ? 1.08 : fan.scale,
                    zIndex: isCardHovered ? 40 : index + 10,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 24,
                  }}
                  className={`absolute top-2 w-52 sm:w-56 h-64 bg-white rounded-2xl shadow-lg border ${
                    isCardHovered
                      ? 'border-[#ff6f61] shadow-2xl ring-2 ring-[#ff6f61]/25'
                      : 'border-neutral-200/90 hover:border-neutral-300'
                  } overflow-hidden flex flex-col transition-shadow duration-200 cursor-pointer`}
                >
                  {/* Card Image Banner */}
                  <div className="relative h-32 w-full overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span
                      className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff6f61] block">
                        {card.category}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2 mt-0.5">
                        {card.title}
                      </h4>
                      <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1 leading-tight">
                        {card.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-[#ff6f61]">
                      <span>{card.ctaText}</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom hint caption */}
          <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
            <span className="material-symbols-outlined text-[18px] text-[#ff6f61] animate-pulse">
              touch_app
            </span>
            <span>Hover cards to fan out · Click any card to take action</span>
          </div>
        </div>
      </div>
    </section>
  );
};
