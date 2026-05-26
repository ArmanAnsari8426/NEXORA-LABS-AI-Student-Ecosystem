import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-6">
      
      <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
        <Code2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-wider font-mono">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-200">Ecosystem Page Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The project repository or course module you are looking for has been moved or does not exist.
        </p>
      </div>

      <Link
        to="/"
        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Platform Home
      </Link>

    </div>
  );
};
