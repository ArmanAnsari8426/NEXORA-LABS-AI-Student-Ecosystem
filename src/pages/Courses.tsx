import React from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/CourseCard';
import { GraduationCap, Sparkles } from 'lucide-react';

export const Courses: React.FC = () => {
  const { coursesCatalog } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="space-y-2 pb-8 border-b border-slate-900">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800 text-purple-400 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" /> Premium Academy
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Recorded Video Courses</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Master AI, MERN Stack, and Cyber Security with comprehensive video modules, downloadable notes, source code, and premium instructor access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {coursesCatalog.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" /> Need Team / University Batch Enrollment?
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We provide discounted bulk access passes for college clubs and student groups. Get dedicated Slack mentoring and custom examination portals.
          </p>
        </div>
        <a
          href="mailto:support@nexoralabs.com"
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 flex-shrink-0"
        >
          Contact Corporate Team
        </a>
      </div>

    </div>
  );
};
