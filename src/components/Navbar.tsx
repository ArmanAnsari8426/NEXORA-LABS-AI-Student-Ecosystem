import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Code2, Search, User, LogOut, Menu, X, ShieldAlert, Sparkles, FileText, GraduationCap, Cpu, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, searchQuery, setSearchQuery, setAuthModalOpen, setAuthRedirectUrl } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects', icon: Cpu },
    { name: 'Courses', path: '/courses', icon: GraduationCap },
    { name: 'Training', path: '/training', icon: Sparkles },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleAuthClick = (path: string) => {
    setAuthRedirectUrl(path);
    setAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-gradient-cyan">NEXORA LABS</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                AI Student Ecosystem
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 relative ${
                    isActive(link.path)
                      ? 'text-cyan-400 bg-slate-800/50 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative w-48 xl:w-60">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-900/80 border border-slate-700/60 rounded-full text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2 text-slate-400 hover:text-white text-xs">✕</button>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-colors text-xs font-medium shadow-md"
                >
                  {user.role === 'admin' ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span className="max-w-[100px] truncate text-slate-200">{user.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/50 uppercase font-bold">
                    {user.role}
                  </span>
                </Link>
                <Link
                  to="/profile"
                  title="Profile Settings"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-cyan-400 transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Profile</span>
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-red-950/30 hover:border-red-800/50 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAuthClick(location.pathname)}
                  className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthClick(location.pathname)}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400"
                >
                  <User className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <button
                onClick={() => handleAuthClick(location.pathname)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Login
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-panel border-t border-slate-800 px-4 pt-4 pb-6 space-y-3"
        >
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  isActive(link.path) ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 font-bold' : 'bg-slate-900/60 text-slate-300'
                }`}
              >
                {link.icon && React.createElement(link.icon, { className: 'w-4 h-4' })}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-800 text-center text-sm font-bold text-white flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                  {user.role === 'admin' ? 'Admin Panel' : 'Student Dashboard'}
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 text-center text-sm font-bold text-cyan-400 flex items-center justify-center gap-2 border border-slate-800"
                >
                  <User className="w-4 h-4" />
                  Profile Settings
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 px-4 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 text-center text-sm font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); handleAuthClick(location.pathname); }}
                  className="py-2.5 px-4 rounded-lg bg-slate-900 text-center text-sm font-bold text-slate-300 border border-slate-800"
                >
                  Login
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleAuthClick(location.pathname); }}
                  className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-center text-sm font-bold"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};
