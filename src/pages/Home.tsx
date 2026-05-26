import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TRAINING } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { CourseCard } from '../components/CourseCard';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { FAQAccordion } from '../components/FAQAccordion';
import { CustomProjectModal } from '../components/CustomProjectModal';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Code2, GraduationCap, CheckCircle2, FileText, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const { projectsCatalog, coursesCatalog } = useApp();
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');

  const categories = ['All', 'AI/ML', 'MERN Stack', 'Python', 'Cyber Security', 'Android', 'Data Science'];

  const filteredProjects = activeCategoryTab === 'All' 
    ? projectsCatalog.slice(0, 6) 
    : projectsCatalog.filter(p => p.category === activeCategoryTab).slice(0, 6);

  return (
    <div className="space-y-24 pb-24 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-[600px] h-80 md:h-[600px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs sm:text-sm font-medium mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Next-Gen Student Project & Training Marketplace</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight"
        >
          Transform Your College Projects Into <span className="text-gradient-cyan">Industrial AI Masterpieces</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mt-6 leading-relaxed"
        >
          Helping BCA, MCA, B.Tech, and Diploma students build ready-made & custom projects with full live mentoring, source code access, synopsis reports, and certified summer training.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={() => setCustomModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-bold text-base hover:scale-105 transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Request Custom Project</span>
          </button>
          
          <Link
            to="/projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-white font-semibold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16 pt-12 border-t border-slate-900">
          <div className="glass-panel p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-gradient-cyan">500+</div>
            <div className="text-xs text-slate-400 mt-1">Ready-Made Projects</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-gradient-purple">24/7</div>
            <div className="text-xs text-slate-400 mt-1">Live Viva Support</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1">Verifiable Certificates</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-gradient-cyan">4.9★</div>
            <div className="text-xs text-slate-400 mt-1">Student Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Business Service Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Comprehensive Student Ecosystem</h2>
          <p className="text-slate-400 text-sm mt-2">Designed specifically to meet strict university submission standards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-cyan-500/10 transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-500">
              <Cpu className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <Code2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ready-Made & Custom Projects</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Instant source code packages in AI, MERN, Python & Android with complete documentation. Or request custom builds tailored to your syllabus.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-8 pt-4 border-t border-slate-900">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Full Source Code & DB Setup</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 1-on-1 Viva Mentoring</li>
            </ul>
            <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white transition-colors">
              Browse Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-purple-500/10 transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-500">
              <GraduationCap className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Industrial Summer Training</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Mandatory 4-week & 6-week summer internship training with live MAANG instructors, hands-on major projects, and LOR generation.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-8 pt-4 border-t border-slate-900">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Verifiable QR Certificates</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Guaranteed Internship Letters</li>
            </ul>
            <Link to="/training" className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-white transition-colors">
              View Training Batches <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-blue-500/10 transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-500">
              <FileText className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Document & Report Marketplace</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Download standard IEEE format synopsis, animated PPT presentations, PTD preliminary reports, and final research documentation.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-8 pt-4 border-t border-slate-900">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Correct University Guidelines</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Feasibility & DFD Diagrams</li>
            </ul>
            <Link to="/documents" className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white transition-colors">
              Download Documents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Ready-Made Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-800">
              <Zap className="w-3.5 h-3.5" /> Ready-to-Deploy Code
            </div>
            <h2 className="text-3xl font-bold text-white">Ready-Made College Projects</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Plug-and-play source code with pre-configured backend architecture</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategoryTab === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-white font-bold text-sm transition-all shadow-lg"
          >
            <span>View All {projectsCatalog.length}+ Ready-Made Projects</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </section>

      {/* Summer Training Section */}
      <section className="bg-slate-900/60 py-20 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-950 text-purple-400 text-xs font-semibold mb-2 border border-purple-800">
              <ShieldCheck className="w-3.5 h-3.5" /> Accredited Summer Training
            </div>
            <h2 className="text-3xl font-bold text-white">4 & 6 Week Industrial Internship Batches</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">Fulfill your university internship mandate with premium AI & Full Stack practical exposure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TRAINING.map((training) => (
              <div key={training.id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-800 hover:border-purple-500/40 relative group">
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {training.badge}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2 pr-16">{training.title}</h3>
                  <div className="text-xs text-slate-400 mb-4">{training.duration} • <span className="text-purple-400">{training.mode}</span></div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">{training.description}</p>

                  <div className="space-y-2 mb-6">
                    {training.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                  <div>
                    <div className="text-xs line-through text-slate-500">₹{training.originalPrice}</div>
                    <div className="text-xl font-black text-white">₹{training.price}</div>
                  </div>
                  <Link
                    to="/training"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors"
                  >
                    View Schedule
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Video Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Premium Recorded Courses</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">Learn from ex-OpenAI researchers and senior tech leads</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coursesCatalog.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Loved by 10,000+ Students</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Read success stories from top university graduates</p>
        </div>
        <TestimonialSlider />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <FAQAccordion />
      </section>

      <CustomProjectModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />

    </div>
  );
};
