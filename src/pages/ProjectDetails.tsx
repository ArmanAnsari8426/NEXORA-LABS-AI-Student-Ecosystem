import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle2, Cpu, ShieldCheck, Sparkles, ExternalLink, Play } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projectsCatalog, buyItem, user, purchasedItems, setAuthModalOpen, setAuthRedirectUrl } = useApp();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const project = projectsCatalog.find(p => p.id === id) || projectsCatalog[0];

  if (!user) {
    setAuthRedirectUrl(`/projects/${project.id}`);
    setAuthModalOpen(true);
    return <Navigate to="/projects" />;
  }

  const isPurchased = purchasedItems.some(p => p.id === project.id);

  const handleBuy = () => {
    buyItem({
      id: project.id,
      title: project.title,
      price: project.price,
      type: 'project',
      thumbnail: project.thumbnail
    });
    setPaymentModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Project Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                {project.difficultyLevel} Level
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{project.title}</h1>
            <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Thumbnail */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-video">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {project.demoUrl && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" /> View Live System Demo
                </a>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> Technology Stack & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technology.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-200 text-xs border border-slate-800 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">System Architecture & Workflow</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-950 p-4 rounded-xl border border-slate-900">
              {project.architecture}
            </p>
          </div>

          {/* Deliverables */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Project Features & Deliverables</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Checkout */}
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 sticky top-24">
            <div className="space-y-1">
              <div className="text-xs text-slate-400">Complete University Package</div>
              <div className="text-4xl font-black text-gradient-cyan">₹{project.price}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Instant QR Access • 100% Viva Approved
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-900 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Complete Source Code</span>
                <span className="text-cyan-400 font-bold">Included</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database Scripts</span>
                <span className="text-cyan-400 font-bold">Included</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Synopsis Document</span>
                <span className={project.synopsisAvailable ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {project.synopsisAvailable ? 'Available' : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>PowerPoint Deck (PPT)</span>
                <span className={project.pptAvailable ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {project.pptAvailable ? 'Available' : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>1-on-1 Viva Mentoring</span>
                <span className="text-purple-400 font-bold">30 Mins Free</span>
              </div>
            </div>

            {isPurchased ? (
              <div className="p-4 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-center font-bold text-xs">
                ✨ Bundle Unlocked! Access code, synopsis & certificate in your Student Dashboard.
              </div>
            ) : (
              <button
                onClick={handleBuy}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Unlock Project Package Now</span>
              </button>
            )}

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-center space-y-2">
              <div className="text-xs font-semibold text-white flex items-center justify-center gap-1">
                <span>College Submission Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400">
                All source code is fully documented. If your external examiner requests minor modifications, our support team will guide you.
              </p>
            </div>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs border border-slate-800 hover:text-white flex items-center justify-center gap-2"
              >
                <span>External System Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            )}
          </div>
        </div>

      </div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        itemId={project.id}
        itemTitle={project.title}
        price={project.price}
      />

    </div>
  );
};
