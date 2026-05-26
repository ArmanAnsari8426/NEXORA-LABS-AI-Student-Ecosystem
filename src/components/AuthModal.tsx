import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, User, ShieldAlert, X } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authRedirectUrl, setAuthRedirectUrl, login, signup } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [role, setRole] = useState<'student' | 'admin'>('student');

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = email || (role === 'admin' ? 'admin@nexoralabs.com' : 'student@college.edu');
    const targetPassword = password || 'password123';
    
    if (isLoginTab) {
      await login(targetEmail, targetPassword, role);
    } else {
      await signup(targetEmail, targetPassword, {
        name: name || targetEmail.split('@')[0].toUpperCase(),
        college: college || 'National Institute of Technology',
        phone: '+91 99999 88888',
        role
      });
    }
    
    setAuthModalOpen(false);
    if (authRedirectUrl) {
      navigate(authRedirectUrl);
      setAuthRedirectUrl(null);
    } else {
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md p-6 overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl shadow-cyan-500/10"
        >
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">Authentication Required</h3>
            <p className="text-xs text-slate-400">Log in or sign up to view premium course details & enroll</p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsLoginTab(true)}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                isLoginTab ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLoginTab(false)}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                !isLoginTab ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                checked={role === 'student'} 
                onChange={() => setRole('student')}
                className="text-cyan-500 focus:ring-cyan-500" 
              />
              <User className="w-3.5 h-3.5 text-cyan-400" /> Student
            </label>
            <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                checked={role === 'admin'} 
                onChange={() => setRole('admin')}
                className="text-purple-500 focus:ring-purple-500" 
              />
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" /> Admin
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginTab && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">College Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DTU Delhi"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder={role === 'admin' ? 'armansari2876@gmail.com' : 'student@college.edu'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 mt-4"
            >
              {isLoginTab ? 'Authenticate & Proceed' : 'Create Account & Unlock'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
