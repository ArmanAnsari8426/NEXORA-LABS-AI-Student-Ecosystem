import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { CustomProjectModal } from '../components/CustomProjectModal';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';

export const Projects: React.FC = () => {
  const { searchQuery, setSearchQuery, projectsCatalog } = useApp();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location.search]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const categories = ['All', 'AI/ML', 'Python', 'MERN Stack', 'React', 'Cyber Security', 'Java', 'Android', 'Networking', 'Data Science'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const filteredProjects = projectsCatalog.filter((proj) => {
    const matchesSearch = searchQuery === '' || 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technology.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || proj.difficultyLevel === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> High-Scoring University Codebases
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Project Catalog</h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Explore premium ready-made projects across AI/ML, Python, MERN Stack, and Cyber Security. Fully functional with DB scripts, synopsis, and viva guide.
          </p>
        </div>

        <button
          onClick={() => setCustomModalOpen(true)}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Can't find your project? Request Custom</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, technology (e.g. OpenCV, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Filter className="w-3.5 h-3.5" /> Category:
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg text-xs text-white py-1.5 px-3 focus:outline-none focus:border-cyan-500"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-2">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Difficulty:
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg text-xs text-white py-1.5 px-3 focus:outline-none focus:border-cyan-500"
            >
              {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-2xl border border-slate-800 space-y-4">
          <p className="text-slate-400 text-sm">No projects matched your criteria.</p>
          <button
            onClick={() => setCustomModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Request Custom Build
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}

      <CustomProjectModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        presetTechnology={selectedCategory !== 'All' ? selectedCategory : undefined}
      />

    </div>
  );
};
