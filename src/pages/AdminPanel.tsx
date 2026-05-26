import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, XCircle, BarChart3, Database, Users, HelpCircle, Plus, Upload, Lock, Key, Trash2, Sparkles } from 'lucide-react';
import { superAdminConfig } from '../services/firebaseConfig';

export const AdminPanel: React.FC = () => {
  const { 
    user, customRequests, purchasedItems, verifyPayment, adminUpdateProjectStatus,
    supportTickets, resolveTicket,
    addProjectToCatalog, addCourseToCatalog, addDocumentToCatalog, addTrainingToCatalog,
    removeProjectFromCatalog, removeCourseFromCatalog, removeDocumentFromCatalog, removeTrainingFromCatalog,
    projectsCatalog, coursesCatalog, documentsCatalog, trainingCatalog
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'payments' | 'tickets' | 'upload' | 'manage' | 'analytics'>('requests');
  const [uploadType, setUploadType] = useState<'project' | 'course' | 'document' | 'training'>('project');

  // Forms
  const [projForm, setProjForm] = useState({ title: '', category: 'AI/ML' as any, description: '', longDescription: '', technology: '', difficultyLevel: 'Intermediate' as any, features: '', price: 2499, thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', synopsisAvailable: true, pptAvailable: true, demoUrl: '', architecture: '' });
  const [courseForm, setCourseForm] = useState({ title: '', instructor: '', instructorRole: 'Lead Architect', duration: '40 Hours', lessonsCount: 50, level: 'All Levels', price: 1999, description: '', tags: '', features: '', thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80' });
  const [docForm, setDocForm] = useState({ title: '', type: 'Synopsis' as any, category: 'AI/ML', pages: 25, fileSize: '4.5 MB', price: 299, description: '', fileName: '' });
  const [trainForm, setTrainForm] = useState({ title: '', duration: '4 Weeks (40 Hrs Live)', startDate: '2026-06-01', mode: 'Live Online' as any, technologies: '', price: 2999, originalPrice: 5999, features: '', seatsLeft: 25, description: '', badge: 'New Batch' });

  // Super Admin
  const [isSuperAdminUnlocked, setIsSuperAdminUnlocked] = useState(() => sessionStorage.getItem(superAdminConfig.sessionStorageKey) === 'true');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => { if (isSuperAdminUnlocked) sessionStorage.setItem(superAdminConfig.sessionStorageKey, 'true'); }, [isSuperAdminUnlocked]);

  const handleSuperAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === superAdminConfig.masterSecretPasscode) { setIsSuperAdminUnlocked(true); setPasscodeError(false); }
    else { setPasscodeError(true); setTimeout(() => setPasscodeError(false), 2500); }
  };

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  if (!isSuperAdminUnlocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-purple-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/20"><Lock className="w-7 h-7" /></div>
            <h2 className="text-xl font-black text-white">Super Admin Access Protected</h2>
            <p className="text-xs text-slate-400">Restricted solely to ARMAN ANSARI</p>
          </div>
          <form onSubmit={handleSuperAdminUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Master Super-Admin Passcode</label>
              <input type="password" required autoFocus placeholder="Enter encrypted master passcode..." value={passcodeInput} onChange={(e) => setPasscodeInput(e.target.value)} className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-xs text-white focus:outline-none font-mono tracking-widest ${passcodeError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-purple-400'}`} />
              {passcodeError && <span className="text-[10px] text-red-400 mt-1 block">❌ Access Denied.</span>}
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs hover:opacity-95 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1.5"><Key className="w-4 h-4" /> Verify & Enter</button>
          </form>
          <div className="mt-4 pt-4 border-t border-slate-900 text-center">
            <span className="text-[10px] text-slate-500 block">Owner: <span className="text-white font-bold">{superAdminConfig.ownerName}</span></span>
            <span className="text-[10px] text-cyan-400 font-mono font-bold select-all block mt-0.5">{superAdminConfig.masterSecretPasscode}</span>
          </div>
        </div>
      </div>
    );
  }

  const pendingPayments = purchasedItems.filter(p => p.status === 'Pending Verification');

  const handleProjectUpload = (e: React.FormEvent) => {
    e.preventDefault();
    addProjectToCatalog({ id: `proj-${Date.now()}`, title: projForm.title, category: projForm.category, description: projForm.description, longDescription: projForm.longDescription || projForm.description, technology: projForm.technology.split(',').map(s => s.trim()), difficultyLevel: projForm.difficultyLevel, features: projForm.features.split('\n').map(s => s.trim()).filter(Boolean), price: Number(projForm.price), rating: 5.0, salesCount: 1, thumbnail: projForm.thumbnail, synopsisAvailable: projForm.synopsisAvailable, pptAvailable: projForm.pptAvailable, demoUrl: projForm.demoUrl, architecture: projForm.architecture || 'Microservices architecture.', createdAt: new Date().toISOString() });
    setProjForm({ title: '', category: 'AI/ML', description: '', longDescription: '', technology: '', difficultyLevel: 'Intermediate', features: '', price: 2499, thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', synopsisAvailable: true, pptAvailable: true, demoUrl: '', architecture: '' });
  };

  const handleCourseUpload = (e: React.FormEvent) => {
    e.preventDefault();
    addCourseToCatalog({ id: `course-${Date.now()}`, title: courseForm.title, instructor: courseForm.instructor, instructorRole: courseForm.instructorRole, duration: courseForm.duration, lessonsCount: Number(courseForm.lessonsCount), level: courseForm.level, price: Number(courseForm.price), rating: 5.0, thumbnail: courseForm.thumbnail, features: courseForm.features.split('\n').map(s => s.trim()).filter(Boolean), description: courseForm.description, tags: courseForm.tags.split(',').map(s => s.trim()), curriculum: [{ module: 'Module 1', title: 'Introduction & Architecture', duration: '45 Mins', freePreview: true }], createdAt: new Date().toISOString() });
    setCourseForm({ title: '', instructor: '', instructorRole: 'Lead Architect', duration: '40 Hours', lessonsCount: 50, level: 'All Levels', price: 1999, description: '', tags: '', features: '', thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80' });
  };

  const handleDocUpload = (e: React.FormEvent) => {
    e.preventDefault();
    addDocumentToCatalog({ id: `doc-${Date.now()}`, title: docForm.title, type: docForm.type, category: docForm.category, pages: Number(docForm.pages), fileSize: docForm.fileSize, price: Number(docForm.price), downloads: 1, description: docForm.fileName ? `${docForm.description}\n\n📂 File: ${docForm.fileName}` : docForm.description, fileName: docForm.fileName, createdAt: new Date().toISOString() });
    setDocForm({ title: '', type: 'Synopsis', category: 'AI/ML', pages: 25, fileSize: '4.5 MB', price: 299, description: '', fileName: '' });
  };

  const handleTrainingUpload = (e: React.FormEvent) => {
    e.preventDefault();
    addTrainingToCatalog({ id: `train-${Date.now()}`, title: trainForm.title, duration: trainForm.duration, startDate: trainForm.startDate, mode: trainForm.mode, technologies: trainForm.technologies.split(',').map(s => s.trim()), price: Number(trainForm.price), originalPrice: Number(trainForm.originalPrice), features: trainForm.features.split('\n').map(s => s.trim()).filter(Boolean), seatsLeft: Number(trainForm.seatsLeft), description: trainForm.description, badge: trainForm.badge, createdAt: new Date().toISOString() });
    setTrainForm({ title: '', duration: '4 Weeks (40 Hrs Live)', startDate: '2026-06-01', mode: 'Live Online', technologies: '', price: 2999, originalPrice: 5999, features: '', seatsLeft: 25, description: '', badge: 'New Batch' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-800/60 bg-purple-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-purple-400 text-xs font-semibold border border-purple-800">
            <ShieldAlert className="w-3.5 h-3.5" /> Admin Command Center — {superAdminConfig.ownerName}
          </div>
          <h1 className="text-3xl font-black text-white">NEXORA System Administration</h1>
          <p className="text-slate-400 text-xs">Owner: <span className="text-white font-bold">{superAdminConfig.ownerName}</span> • All Syncs Active</p>
        </div>
        <div className="flex flex-wrap gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['requests', 'payments', 'tickets', 'upload', 'manage', 'analytics'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 rounded-lg transition-all ${activeTab === tab ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}>
              {tab === 'upload' && <Plus className="w-3 h-3 inline mr-1" />}
              {tab === 'manage' && <Trash2 className="w-3 h-3 inline mr-1" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{tab === 'requests' ? ` (${customRequests.length})` : tab === 'payments' ? ` (${pendingPayments.length})` : tab === 'tickets' ? ` (${supportTickets.filter(t => t.status !== 'Resolved').length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Projects', value: projectsCatalog.length, color: 'cyan' },
          { label: 'Courses', value: coursesCatalog.length, color: 'purple' },
          { label: 'Documents', value: documentsCatalog.length, color: 'emerald' },
          { label: 'Training', value: trainingCatalog.length, color: 'amber' },
          { label: 'Pending', value: pendingPayments.length, color: 'pink' }
        ].map(s => (
          <div key={s.label} className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">{s.label}</div>
            <div className="text-2xl font-black text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* ========== UPLOAD TAB ========== */}
      {activeTab === 'upload' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-900">
            <div><h2 className="text-xl font-bold text-white">Marketplace Item Uploader</h2><p className="text-xs text-slate-400">Deploy items to Firebase & Google Sheets</p></div>
            <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              {(['project', 'course', 'document', 'training'] as const).map(t => (
                <button key={t} type="button" onClick={() => setUploadType(t)} className={`px-3 py-2 rounded-lg ${uploadType === t ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
              ))}
            </div>
          </div>

          {/* Project Upload */}
          {uploadType === 'project' && (
            <form onSubmit={handleProjectUpload} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label><input type="text" required placeholder="e.g. AI Drone Surveillance" value={projForm.title} onChange={e => setProjForm({...projForm, title: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Category</label><select value={projForm.category} onChange={e => setProjForm({...projForm, category: e.target.value as any})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500">{['AI/ML','Python','MERN Stack','React','Cyber Security','Java','Android','Networking','Data Science'].map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Price (₹)</label><input type="number" required min="500" step="100" value={projForm.price} onChange={e => setProjForm({...projForm, price: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label><select value={projForm.difficultyLevel} onChange={e => setProjForm({...projForm, difficultyLevel: e.target.value as any})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500">{['Beginner','Intermediate','Advanced','Expert'].map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Technology Stack (comma separated)</label><input type="text" required placeholder="Python, TensorFlow, React" value={projForm.technology} onChange={e => setProjForm({...projForm, technology: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label><input type="text" required placeholder="Brief summary..." value={projForm.description} onChange={e => setProjForm({...projForm, description: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Long Description</label><textarea rows={3} required placeholder="Detailed overview..." value={projForm.longDescription} onChange={e => setProjForm({...projForm, longDescription: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Features (one per line)</label><textarea rows={3} required placeholder="Complete Source code&#10;Database Scripts" value={projForm.features} onChange={e => setProjForm({...projForm, features: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Thumbnail URL</label><input type="url" required value={projForm.thumbnail} onChange={e => setProjForm({...projForm, thumbnail: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer"><input type="checkbox" checked={projForm.synopsisAvailable} onChange={e => setProjForm({...projForm, synopsisAvailable: e.target.checked})} className="rounded bg-slate-900 border-slate-700 text-cyan-500" /> Synopsis Available</label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer"><input type="checkbox" checked={projForm.pptAvailable} onChange={e => setProjForm({...projForm, pptAvailable: e.target.checked})} className="rounded bg-slate-900 border-slate-700 text-cyan-500" /> PPT Available</label>
              </div>
              <button type="submit" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20"><Upload className="w-4 h-4" /> Deploy Project to Database</button>
            </form>
          )}

          {/* Course Upload */}
          {uploadType === 'course' && (
            <form onSubmit={handleCourseUpload} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Course Title</label><input type="text" required placeholder="e.g. Master MERN Stack" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Instructor Name</label><input type="text" required placeholder="e.g. Dr. Siddharth Varma" value={courseForm.instructor} onChange={e => setCourseForm({...courseForm, instructor: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Price (₹)</label><input type="number" required min="500" step="100" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Duration</label><input type="text" required placeholder="42 Hours" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Lessons</label><input type="number" required min="5" value={courseForm.lessonsCount} onChange={e => setCourseForm({...courseForm, lessonsCount: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma separated)</label><input type="text" required placeholder="React, Node.js" value={courseForm.tags} onChange={e => setCourseForm({...courseForm, tags: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Description</label><textarea rows={3} required placeholder="Course overview..." value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Features (one per line)</label><textarea rows={3} required placeholder="HD Videos&#10;Notes&#10;Source Code" value={courseForm.features} onChange={e => setCourseForm({...courseForm, features: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Thumbnail URL</label><input type="url" required value={courseForm.thumbnail} onChange={e => setCourseForm({...courseForm, thumbnail: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <button type="submit" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20"><Upload className="w-4 h-4" /> Publish Course to Academy</button>
            </form>
          )}

          {/* Document Upload */}
          {uploadType === 'document' && (
            <form onSubmit={handleDocUpload} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Document Title</label><input type="text" required placeholder="e.g. AI Med-Diagnose Synopsis" value={docForm.title} onChange={e => setDocForm({...docForm, title: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Document Type</label><select value={docForm.type} onChange={e => setDocForm({...docForm, type: e.target.value as any})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500">{['Synopsis','PPT','PTD Report','Research Document','Final Report'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Price (₹)</label><input type="number" required min="99" step="50" value={docForm.price} onChange={e => setDocForm({...docForm, price: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Pages</label><input type="number" required min="5" value={docForm.pages} onChange={e => setDocForm({...docForm, pages: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div>
                  <div className="flex justify-between items-center mb-1"><label className="block text-xs font-semibold text-slate-300">Upload File</label>{docForm.fileName && <span className="text-[9px] text-emerald-400 font-bold truncate max-w-[80px]" title={docForm.fileName}>✓ {docForm.fileName}</span>}</div>
                  <input type="file" required onChange={e => { const file = e.target.files?.[0]; if (file) { const sz = file.size > 1048576 ? (file.size / 1048576).toFixed(1) + ' MB' : (file.size / 1024).toFixed(0) + ' KB'; setDocForm({...docForm, fileSize: sz, fileName: file.name}); }}} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cyan-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-purple-950 file:text-purple-400 hover:file:bg-purple-900 cursor-pointer" />
                </div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Description</label><textarea rows={3} required placeholder="Document details..." value={docForm.description} onChange={e => setDocForm({...docForm, description: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <button type="submit" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20"><Upload className="w-4 h-4" /> Add File to Document Marketplace</button>
            </form>
          )}

          {/* Training Upload */}
          {uploadType === 'training' && (
            <form onSubmit={handleTrainingUpload} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Training Title</label><input type="text" required placeholder="e.g. 4-Week AI Summer Training" value={trainForm.title} onChange={e => setTrainForm({...trainForm, title: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label><input type="date" required value={trainForm.startDate} onChange={e => setTrainForm({...trainForm, startDate: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Duration</label><input type="text" required placeholder="4 Weeks (40 Hrs)" value={trainForm.duration} onChange={e => setTrainForm({...trainForm, duration: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Mode</label><select value={trainForm.mode} onChange={e => setTrainForm({...trainForm, mode: e.target.value as any})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500">{['Live Online','Hybrid','In-Person'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Seats Left</label><input type="number" required min="1" value={trainForm.seatsLeft} onChange={e => setTrainForm({...trainForm, seatsLeft: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Price (₹)</label><input type="number" required min="500" step="100" value={trainForm.price} onChange={e => setTrainForm({...trainForm, price: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Original Price (₹)</label><input type="number" required min="500" step="100" value={trainForm.originalPrice} onChange={e => setTrainForm({...trainForm, originalPrice: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Technologies (comma separated)</label><input type="text" required placeholder="Python, TensorFlow, FastAPI" value={trainForm.technologies} onChange={e => setTrainForm({...trainForm, technologies: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Description</label><textarea rows={3} required placeholder="Training overview..." value={trainForm.description} onChange={e => setTrainForm({...trainForm, description: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Features (one per line)</label><textarea rows={3} required placeholder="Certificate&#10;Live Sessions&#10;Projects" value={trainForm.features} onChange={e => setTrainForm({...trainForm, features: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" /></div>
              <div><label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label><select value={trainForm.badge} onChange={e => setTrainForm({...trainForm, badge: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500">{['New Batch','Most Popular','Elite Batch','Fast Track','Limited Seats'].map(b => <option key={b} value={b}>{b}</option>)}</select></div>
              <button type="submit" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20"><Sparkles className="w-4 h-4" /> Publish Training Program</button>
            </form>
          )}
        </div>
      )}

      {/* ========== MANAGE ITEMS TAB (DELETE) ========== */}
      {activeTab === 'manage' && (
        <div className="space-y-8">
          {/* Manage Projects */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Database className="w-5 h-5 text-cyan-400" /> Manage Projects ({projectsCatalog.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {projectsCatalog.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-900">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={p.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{p.title}</div>
                      <div className="text-[10px] text-slate-500">{p.category} • ₹{p.price}</div>
                    </div>
                  </div>
                  <button onClick={() => removeProjectFromCatalog(p.id)} className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900 border border-red-800/50 text-xs flex-shrink-0" title="Delete Project"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Manage Courses */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" /> Manage Courses ({coursesCatalog.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {coursesCatalog.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-900">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={c.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{c.title}</div>
                      <div className="text-[10px] text-slate-500">{c.duration} • ₹{c.price}</div>
                    </div>
                  </div>
                  <button onClick={() => removeCourseFromCatalog(c.id)} className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900 border border-red-800/50 text-xs flex-shrink-0" title="Delete Course"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Manage Documents */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-400" /> Manage Documents ({documentsCatalog.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {documentsCatalog.map(d => (
                <div key={d.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-900">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{d.title}</div>
                    <div className="text-[10px] text-slate-500">{d.type} • {d.pages} pages • ₹{d.price}</div>
                  </div>
                  <button onClick={() => removeDocumentFromCatalog(d.id)} className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900 border border-red-800/50 text-xs flex-shrink-0" title="Delete Document"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Manage Training */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-400" /> Manage Training ({trainingCatalog.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {trainingCatalog.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-900">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{t.title}</div>
                    <div className="text-[10px] text-slate-500">{t.duration} • ₹{t.price} • {t.seatsLeft} seats</div>
                  </div>
                  <button onClick={() => removeTrainingFromCatalog(t.id)} className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900 border border-red-800/50 text-xs flex-shrink-0" title="Delete Training"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== REQUESTS TAB ========== */}
      {activeTab === 'requests' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-900">
            <div><h2 className="text-lg font-bold text-white">Custom Project Requests</h2><p className="text-xs text-slate-400">Synced to Google Sheets & Firebase</p></div>
          </div>
          <div className="space-y-4">
            {customRequests.map(r => (
              <div key={r.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><span className="text-sm font-bold text-white">{r.projectTitle}</span><span className="text-xs text-cyan-400 font-mono">({r.technology})</span></div>
                  <div className="text-xs text-slate-400">Student: <span className="text-slate-200">{r.studentName}</span> ({r.collegeName}) • Ph: {r.phone}</div>
                  <div className="text-xs text-slate-500">Submitted: {r.submittedAt} • Budget: <span className="text-emerald-400 font-bold">₹{r.budget}</span></div>
                  <div className="text-xs text-slate-300 mt-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800"><span className="font-semibold text-slate-400">Requirements:</span> {r.requirementDetails}</div>
                </div>
                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                  <div className="text-xs text-slate-400">Status: <span className="font-bold text-purple-400">{r.status}</span></div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => adminUpdateProjectStatus(r.id, 'Approved')} className="px-3 py-1.5 rounded-lg bg-blue-950 text-blue-400 hover:bg-blue-900 text-xs font-bold border border-blue-800">Approve</button>
                    <button onClick={() => adminUpdateProjectStatus(r.id, 'Delivered')} className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 text-xs font-bold border border-emerald-800">Delivered</button>
                    <button onClick={() => adminUpdateProjectStatus(r.id, 'Rejected')} className="px-3 py-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-900 text-xs font-bold border border-red-800">Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== PAYMENTS TAB ========== */}
      {activeTab === 'payments' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div><h2 className="text-lg font-bold text-white">Payment Verification Queue</h2><p className="text-xs text-slate-400">Verify screenshots to unlock downloads</p></div>
          {pendingPayments.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">No pending payments.</p>
          ) : (
            <div className="space-y-4">
              {pendingPayments.map(p => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={p.thumbnail} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-800">{p.status}</span>
                      <h4 className="text-sm font-bold text-white mt-1">{p.title}</h4>
                      <div className="text-xs text-slate-400">₹{p.price} • {p.purchasedAt}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => verifyPayment(p.id)} className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Verify & Unlock</button>
                    <button onClick={() => alert(`Rejected for #${p.id}`)} className="p-2.5 rounded-xl bg-red-950 text-red-400 hover:bg-red-900 border border-red-800 text-xs"><XCircle className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========== TICKETS TAB ========== */}
      {activeTab === 'tickets' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div><h2 className="text-lg font-bold text-white">Support Tickets</h2><p className="text-xs text-slate-400">Resolve student queries</p></div>
          <div className="space-y-4">
            {supportTickets.map(t => (
              <div key={t.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-cyan-400" /><span className="text-sm font-bold text-white">{t.subject}</span></div>
                  <div className="text-xs text-slate-400">From: {t.studentName} ({t.email}) • {t.createdAt}</div>
                  <p className="text-xs text-slate-300 mt-1 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-2xl">{t.message}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${t.status === 'Resolved' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>{t.status}</span>
                  {t.status !== 'Resolved' && <button onClick={() => resolveTicket(t.id)} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs border border-slate-700">Resolve</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== ANALYTICS TAB ========== */}
      {activeTab === 'analytics' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-8">
          <div><h2 className="text-lg font-bold text-white">Platform Analytics</h2><p className="text-xs text-slate-400">Real-time conversion & enrollment statistics</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Top Converting Categories</h3>
              {[{label:'AI / Machine Learning',pct:42,color:'cyan'},{label:'MERN Stack',pct:28,color:'purple'},{label:'Python / OpenCV',pct:18,color:'blue'},{label:'Cyber Security',pct:12,color:'emerald'}].map(c => (
                <div key={c.label}><div className="flex justify-between mb-1"><span>{c.label}</span><span className="font-bold">{c.pct}%</span></div><div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden"><div className={`h-full bg-${c.color}-500`} style={{width:`${c.pct}%`}}></div></div></div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Student Demographics</h3>
              {[{label:'B.Tech CSE / IT',pct:48},{label:'MCA',pct:25},{label:'BCA',pct:17},{label:'Diploma',pct:10}].map(d => (
                <div key={d.label}><div className="flex justify-between mb-1"><span>{d.label}</span><span className="font-bold">{d.pct}%</span></div><div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden"><div className="h-full bg-cyan-500" style={{width:`${d.pct}%`}}></div></div></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
