import React, { useState } from 'react';
import { MOCK_TRAINING } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { PaymentModal } from '../components/PaymentModal';
import { Sparkles, Calendar, Award, CheckCircle2, Users, Laptop } from 'lucide-react';

export const Training: React.FC = () => {
  const { buyItem } = useApp();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<{ id: string; title: string; price: number } | null>(null);

  const handleEnroll = (training: { id: string; title: string; price: number }) => {
    setSelectedTraining(training);
    buyItem({
      id: training.id,
      title: training.title,
      price: training.price,
      type: 'training'
    });
    setPaymentModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-slate-900 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800 text-purple-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Mandatory College Credits Fulfill
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Summer Industrial Training</h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Intensive 4-week & 6-week live online internship-style training. Build major industrial projects, clear viva exams, and get verifiable certification.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {MOCK_TRAINING.map((t) => (
          <div key={t.id} className="glass-panel p-8 rounded-3xl flex flex-col justify-between border border-slate-800 hover:border-purple-500/40 transition-all duration-300 relative group space-y-6">
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              {t.badge}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white pr-20">{t.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> {t.startDate}</span>
                  <span className="flex items-center gap-1"><Laptop className="w-3.5 h-3.5 text-purple-400" /> {t.mode}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-900">
                {t.description}
              </p>

              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Covered Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {t.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-xs bg-slate-900 text-purple-300 border border-purple-800/40 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Key Training Deliverables</div>
                {t.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs line-through text-slate-500">₹{t.originalPrice}</div>
                  <div className="text-2xl font-black text-gradient-purple">₹{t.price}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                  <Users className="w-3.5 h-3.5" /> {t.seatsLeft} seats left
                </div>
              </div>

              <button
                onClick={() => handleEnroll(t)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Reserve Seat & Claim Pass</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certification info */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center max-w-4xl mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Verifiable Industrial Training Certificates</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every certificate issued by NEXORA LABS includes a cryptographic verification QR code. College placement coordinators and external examiners can verify your completion online 24/7.
          </p>
        </div>
      </div>

      {selectedTraining && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          itemId={selectedTraining.id}
          itemTitle={selectedTraining.title}
          price={selectedTraining.price}
        />
      )}

    </div>
  );
};
