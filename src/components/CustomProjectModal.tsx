import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, DollarSign, FileText, X, CheckCircle2 } from 'lucide-react';

interface CustomProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTechnology?: string;
}

export const CustomProjectModal: React.FC<CustomProjectModalProps> = ({ isOpen, onClose, presetTechnology }) => {
  const { submitCustomProject } = useApp();
  const [formData, setFormData] = useState({
    studentName: '',
    collegeName: '',
    technology: presetTechnology || 'Python / AI / MERN',
    projectTitle: '',
    deadline: '',
    budget: 2500,
    phone: '',
    email: '',
    requirementDetails: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'budget' ? Number(value) : value }));
  };

  const setQuickDeadline = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setFormData(prev => ({ ...prev, deadline: `${yyyy}-${mm}-${dd}` }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCustomProject(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl p-6 md:p-8 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-cyan-500/10 my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">Custom Project Submitted Successfully!</h3>
              <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-300 max-w-lg mx-auto text-left space-y-2 border border-slate-800 font-mono">
                <p className="font-bold text-emerald-400 border-b border-slate-900 pb-1">⚡ Core Enterprise Systems Triggered:</p>
                <p className="text-slate-200">✓ AppSheet Hook: <span className="text-cyan-400 font-bold">Synced to Table "Nexora Leads"</span></p>
                <p className="text-slate-200">✓ App ID bound: <span className="text-slate-400 text-[10px]">f4e7460b-...-108e91fa28c7</span></p>
                <p className="text-slate-200">✓ Instant Admin Alert: <span className="text-purple-400 font-bold">admin@nexoralabs.com</span> notified instantly with comprehensive specs.</p>
                <p className="text-slate-200">✓ Cloud DB Backup: Stored persistently in Firestore collection <span className="text-slate-400 text-[10px]">custom_project_requests</span>.</p>
              </div>
              <p className="text-xs text-slate-400">Our engineering lead will contact you within 2 hours with the approval and delivery timeline.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Request Custom College Project</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Built precisely to your college syllabus & HOD requirements</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="studentName"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">College / University Name</label>
                    <input
                      type="text"
                      name="collegeName"
                      required
                      placeholder="e.g. SRM University"
                      value={formData.collegeName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Technology Stack Dropdown</label>
                    <select
                      name="technology"
                      required
                      value={formData.technology}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
                    >
                      <option value="AI / Machine Learning (Python, TensorFlow)">🧠 AI / Machine Learning (Python, TensorFlow)</option>
                      <option value="MERN Stack (MongoDB, Express, React, Node)">⚡ MERN Stack (MongoDB, Express, React, Node)</option>
                      <option value="Python Core + OpenCV (Computer Vision)">👁️ Python Core + OpenCV (Computer Vision)</option>
                      <option value="Full Stack React + Node.js Microservices">🌐 Full Stack React + Node.js Microservices</option>
                      <option value="Cyber Security & Ethical Hacking">🛡️ Cyber Security & Ethical Hacking</option>
                      <option value="Java Spring Boot Enterprise ERP">☕ Java Spring Boot Enterprise ERP</option>
                      <option value="Android Mobile (Kotlin, Firebase)">📱 Android Mobile (Kotlin, Firebase)</option>
                      <option value="Data Science & Analytics (Pandas, Streamlit)">📊 Data Science & Analytics (Pandas, Streamlit)</option>
                      <option value="Web3 & Solidity Smart Contracts">🔗 Web3 & Solidity Smart Contracts</option>
                      <option value="PHP / Laravel Full Stack Application">🐘 PHP / Laravel Full Stack Application</option>
                      <option value="Cloud Computing & IoT Systems">☁️ Cloud Computing & IoT Systems</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Desired Project Title</label>
                    <input
                      type="text"
                      name="projectTitle"
                      required
                      placeholder="e.g. Autonomous Drone Surveillance"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300">Target Deadline Date</label>
                      <span className="text-[9px] text-cyan-400 font-mono">⚡ Click Presets below</span>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-cyan-400" />
                      <input
                        type="date"
                        name="deadline"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-cyan-800/80 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 font-bold focus:ring-1 focus:ring-cyan-400 text-cyan-300 transition-all cursor-pointer"
                      />
                    </div>
                    {/* Quick helper picker buttons */}
                    <div className="flex flex-wrap items-center gap-1 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(3)}
                        className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 transition-colors"
                      >
                        🔥 3 Days
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(7)}
                        className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-colors"
                      >
                        ⚡ 1 Week
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(14)}
                        className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-purple-400 border border-slate-800 transition-colors"
                      >
                        📅 2 Weeks
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(30)}
                        className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-colors"
                      >
                        🌟 1 Month
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Budget (INR ₹)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        name="budget"
                        min="1000"
                        step="500"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Standard custom projects range ₹2,000 - ₹5,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Requirement Details & Deliverables</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      name="requirementDetails"
                      rows={3}
                      required
                      placeholder="Describe specific features, viva questions needed, synopsis formatting, or special database requirements..."
                      value={formData.requirementDetails}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center gap-2 text-xs text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0"></span>
                  <span>Every project comes with 100% Viva Mentoring, Synopsis, PPT, PTD Reports, and QR Certificate.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Trigger Google Sheets + Firebase Workflow & Submit
                </button>
              </form>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
