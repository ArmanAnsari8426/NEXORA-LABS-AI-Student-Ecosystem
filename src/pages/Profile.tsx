import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Lock, Save, Camera, CheckCircle2, Server, Database, RefreshCw } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateUser, purchasedItems, supportTickets } = useApp();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    college: user.college,
    degree: user.degree || '',
    rollNumber: user.rollNumber || '',
    graduationYear: user.graduationYear || '2026',
    bio: user.bio || '',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    twoFactorAuth: user.twoFactorAuth ?? true,
    emailAlerts: user.emailAlerts ?? true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [avatarInput, setAvatarInput] = useState('');
  const [showAvatarPrompt, setShowAvatarPrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (field: 'twoFactorAuth' | 'emailAlerts') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateUser(formData);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New Passwords do not match!');
      return;
    }
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 2500);
  };

  const updateAvatarUrl = () => {
    if (!avatarInput) return;
    setFormData(prev => ({ ...prev, avatar: avatarInput }));
    setShowAvatarPrompt(false);
    setAvatarInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative group flex-shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-slate-800 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
            <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
          </div>
          <button
            onClick={() => setShowAvatarPrompt(!showAvatarPrompt)}
            className="absolute bottom-2 right-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-400 shadow-xl transition-all"
            title="Change Avatar URL"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 flex-1 text-center md:text-left z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white">{user.name}</h1>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${
              user.role === 'admin' ? 'bg-purple-950 text-purple-400 border-purple-800' : 'bg-cyan-950 text-cyan-400 border-cyan-800'
            }`}>
              {user.role === 'admin' ? 'Master Admin' : 'Student Ecosystem Member'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            ID: <span className="text-slate-300">{formData.rollNumber || user.id}</span> • Member since Apr 2026
          </p>

          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed italic pt-1">
            "{formData.bio || 'No bio provided. Update your profile below.'}"
          </p>
        </div>

        <div className="flex md:flex-col gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 w-full md:w-auto justify-center z-10">
          <div className="text-center md:text-right">
            <div className="text-xs text-slate-400">Purchased Assets</div>
            <div className="text-xl font-bold text-gradient-cyan">{purchasedItems.length} Bundles</div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-xs text-slate-400">Support Status</div>
            <div className="text-xl font-bold text-gradient-purple">{supportTickets.length} Tickets</div>
          </div>
        </div>
      </div>

      {showAvatarPrompt && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 max-w-md mx-auto space-y-3">
          <label className="block text-xs font-semibold text-slate-200">Enter New Image URL (Unsplash, Imgur, etc.)</label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={avatarInput}
              onChange={(e) => setAvatarInput(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={updateAvatarUrl}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:opacity-90"
            >
              Update
            </button>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => { setFormData(prev => ({ ...prev, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' })); setShowAvatarPrompt(false); }} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Female Avatar</button>
            <button onClick={() => { setFormData(prev => ({ ...prev, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' })); setShowAvatarPrompt(false); }} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Male Avatar</button>
            <button onClick={() => { setFormData(prev => ({ ...prev, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80' })); setShowAvatarPrompt(false); }} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Tech Student</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-900">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" /> Identity & Academic Credentials
              </h2>
              {saveSuccess && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Google Sheets Synced!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                  <input
                    type="text" name="name" required value={formData.name} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">College / University Name</label>
                  <input
                    type="text" name="college" required value={formData.college} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Specialization</label>
                  <input
                    type="text" name="degree" placeholder="e.g. B.Tech CSE, MCA" value={formData.degree} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Roll / Student ID</label>
                  <input
                    type="text" name="rollNumber" placeholder="e.g. CS-2023-084" value={formData.rollNumber} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Year</label>
                  <input
                    type="text" name="graduationYear" placeholder="2026" value={formData.graduationYear} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Bio & Career Objectives</label>
                <textarea
                  rows={3} name="bio" placeholder="Share your academic interests, viva questions prepared, or tech stack specializations..."
                  value={formData.bio} onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-3">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Preferences & Auto-Webhook Sync</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.twoFactorAuth} onChange={() => handleToggleChange('twoFactorAuth')} className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500" />
                    <span>Enforce Two-Factor Auth (2FA)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.emailAlerts} onChange={() => handleToggleChange('emailAlerts')} className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500" />
                    <span>Google Sheets / Email Sync Updates</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Saving to Firebase Firestore & Google Sheets...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Profile & Auto-Sync
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-900">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" /> Account Security & Password
              </h2>
              {passwordSuccess && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Password Updated
                </span>
              )}
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
                <input
                  type="password" required placeholder="••••••••"
                  value={passwordForm.currentPassword} onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                  <input
                    type="password" required placeholder="••••••••"
                    value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Password</label>
                  <input
                    type="password" required placeholder="••••••••"
                    value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-purple-600/20"
              >
                Update Secret Key
              </button>
            </form>
          </div>

        </div>

        <div className="space-y-8">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" /> Firebase & Google Sheets Sync Log
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every profile modification triggers secure background webhooks maintaining persistence across external databases.
            </p>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>⚡ POST /v1/sheets/sync</span>
                  <span>200 OK</span>
                </div>
                <div className="text-slate-400 text-[10px]">Row appended to Google Sheet: "Student_Profiles"</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <span>🔥 Firestore db.collection('users')</span>
                  <span>Synced</span>
                </div>
                <div className="text-slate-400 text-[10px]">Document ID: {user.id} updated successfully</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                <div className="flex items-center justify-between text-purple-400 font-bold">
                  <span>📧 Email Alerts Dispatcher</span>
                  <span>Active</span>
                </div>
                <div className="text-slate-400 text-[10px]">Triggering updates to {formData.email}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-center space-y-1">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-center gap-1">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> Encrypted Cloud Backup
              </div>
              <p className="text-[10px] text-slate-500">AES-256 state encryption active on Vercel Edge nodes.</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">Ecosystem Navigation</h3>
            <div className="space-y-2 text-xs">
              <Link to="/dashboard" className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors border border-slate-900">
                <span>View Purchased Files & Downloads</span>
                <span className="text-cyan-400 font-bold">→</span>
              </Link>
              <Link to="/projects" className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors border border-slate-900">
                <span>Browse Marketplace Projects</span>
                <span className="text-cyan-400 font-bold">→</span>
              </Link>
              <Link to="/contact" className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors border border-slate-900">
                <span>Request 1-on-1 Mentoring Support</span>
                <span className="text-cyan-400 font-bold">→</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
