import React, { useState } from 'react';
import { MOCK_TESTIMONIALS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
  };

  const current = MOCK_TESTIMONIALS[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      <div className="absolute top-0 left-8 text-slate-800/40 transform -translate-y-6 -translate-x-6 z-0 pointer-events-none">
        <Quote className="w-32 h-32" />
      </div>

      <div className="relative z-10 glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-slate-800 border-2 border-cyan-500/30 flex-shrink-0 shadow-lg shadow-cyan-500/10">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-base md:text-lg text-slate-200 leading-relaxed italic font-light">
                "{current.content}"
              </p>

              <div>
                <h4 className="text-base font-bold text-white">{current.name}</h4>
                <div className="text-xs text-cyan-400 font-medium">{current.role}</div>
                <div className="text-[11px] text-slate-500">{current.college}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-900/80">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-cyan-400 text-slate-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {MOCK_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-cyan-400 w-8' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-cyan-400 text-slate-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
