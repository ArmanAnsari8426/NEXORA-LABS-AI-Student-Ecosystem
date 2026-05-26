import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Globe, Share2, MessageSquare, Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-gradient-cyan tracking-wider">NEXORA LABS</span>
            </Link>
            <p className="pr-6 text-slate-400 leading-relaxed text-xs sm:text-sm">
              Helping students build and complete projects according to their college requirements with full live support, source code access, and verifiable industrial certification.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 w-fit">
              <span className="text-[10px] text-slate-400">Founded & Developed by</span>
              <span className="text-white font-bold">ARMAN ANSARI</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 w-fit">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Simulated Google Sheets & Firebase Auto-Backup Active</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://nexoralabs.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://nexoralabs.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://nexoralabs.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Marketplace Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase text-cyan-400">Project Catalog</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/projects?category=AI/ML" className="hover:text-cyan-400 transition-colors flex items-center gap-1">AI/ML Projects <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link to="/projects?category=MERN Stack" className="hover:text-cyan-400 transition-colors flex items-center gap-1">MERN Stack Apps <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link to="/projects?category=Python" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Python & OpenCV <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link to="/projects?category=Cyber Security" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Cyber Security <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link to="/projects?category=Android" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Android & Kotlin <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Academics & Support */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase text-cyan-400">Student Hub</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">Premium Video Courses</Link></li>
              <li><Link to="/training" className="hover:text-cyan-400 transition-colors">4/6 Week Summer Training</Link></li>
              <li><Link to="/documents" className="hover:text-cyan-400 transition-colors">Synopsis & PPT Downloads</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Request Project Mentoring</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Certificate Verifier</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase text-cyan-400">Get in Touch</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>NEXORA LABS Innovation Center, Cyber Park Sec-62, Noida, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>+91 98765 43210 (24/7 Helpline)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>support@nexoralabs.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NEXORA LABS Technologies. All rights reserved. Founded by ARMAN ANSARI. Built for BCA, MCA, B.Tech & Diploma Excellence.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
