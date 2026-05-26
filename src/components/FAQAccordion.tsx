import React, { useState } from 'react';
import { MOCK_FAQS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs mb-3">
          <HelpCircle className="w-3.5 h-3.5" /> Got Questions? We have Answers
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white">Frequently Asked Questions</h3>
        <p className="text-xs md:text-sm text-slate-400 mt-2">Everything you need to know about project deliveries, viva preparation, and certifications.</p>
      </div>

      <div className="space-y-3">
        {MOCK_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen ? 'border-cyan-500/40 bg-slate-900/90' : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left focus:outline-none"
              >
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                    {faq.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-white">{faq.question}</h4>
                </div>
                <div className={`p-2 rounded-lg bg-slate-900/80 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-cyan-400 bg-cyan-950' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
