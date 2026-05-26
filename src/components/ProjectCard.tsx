import React, { useState } from 'react';
import { Project } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ExternalLink, Lock } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { buyItem, user, setAuthModalOpen, setAuthRedirectUrl } = useApp();
  const navigate = useNavigate();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-950 text-emerald-400 border-emerald-800/50';
      case 'Intermediate': return 'bg-blue-950 text-blue-400 border-blue-800/50';
      case 'Advanced': return 'bg-purple-950 text-purple-400 border-purple-800/50';
      case 'Expert': return 'bg-rose-950 text-rose-400 border-rose-800/50';
      default: return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthRedirectUrl(`/projects/${project.id}`);
      setAuthModalOpen(true);
    } else {
      navigate(`/projects/${project.id}`);
    }
  };

  const handleBuy = () => {
    if (!user) {
      setAuthRedirectUrl(`/projects/${project.id}`);
      setAuthModalOpen(true);
      return;
    }
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
    <>
      <motion.div
        whileHover={{ y: -6 }}
        className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
      >
        <div className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={handleDetailsClick}>
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-cyan-400 backdrop-blur-md border border-cyan-500/30">
              {project.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-md ${getDifficultyColor(project.difficultyLevel)}`}>
              {project.difficultyLevel}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 text-xs text-white bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700 flex items-center gap-1">
            ⭐ {project.rating} <span className="text-[10px] text-slate-400">({project.salesCount} sold)</span>
          </div>

          {!user && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
              <Lock className="w-6 h-6 text-cyan-400" />
              <span className="text-xs font-bold font-mono">🔒 Login to Unlock Details</span>
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div onClick={handleDetailsClick} className="cursor-pointer">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.technology.map((tech, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-800">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 pt-4 border-t border-slate-900">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Key Deliverables</div>
              {project.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] text-slate-400">Complete Package</div>
              <div className="text-xl font-black text-gradient-cyan">₹{project.price}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDetailsClick}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
                title="View Project Details & Architecture"
              >
                {user ? <ExternalLink className="w-4 h-4" /> : <Lock className="w-4 h-4 text-cyan-400" />}
              </button>
              <button
                onClick={handleBuy}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
              >
                <span>Buy Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        itemId={project.id}
        itemTitle={project.title}
        price={project.price}
      />
    </>
  );
};
