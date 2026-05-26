import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const { submitSupportTicket } = useApp();
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSupportTicket(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ studentName: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" /> 24/7 Student Live Support
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Get in Touch</h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Need project setup assistance, viva guidance, or custom payment verification? Our engineering mentors are standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Info Col */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Direct Phone & WhatsApp</h3>
              <p className="text-xs text-slate-400 mt-1">Available for emergency viva inquiries</p>
              <div className="text-sm font-bold text-gradient-cyan mt-2">+91 98765 43210</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Email Notification Desk</h3>
              <p className="text-xs text-slate-400 mt-1">Admin alerts monitored in real-time by ARMAN ANSARI</p>
              <div className="text-sm font-bold text-gradient-purple mt-2">armansari2876@gmail.com</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">NEXORA Innovation Labs</h3>
              <p className="text-xs text-slate-400 mt-1">Cyber Park Sec-62, Noida, India</p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-2 font-medium">
                <Clock className="w-3.5 h-3.5" /> Normal Response Time: &lt; 15 Mins
              </div>
            </div>
          </div>
        </div>

        {/* Form Col */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-slate-800 relative">
          {submitted ? (
            <div className="py-20 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">Support Request Logged Successfully!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Your message has been appended to our Google Sheets support queue and an admin email notification has been dispatched.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Send a Support Ticket</h3>
                <p className="text-xs text-slate-400">We will reply to your registered email address</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    placeholder="e.g. Ananya Gupta"
                    value={formData.studentName}
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Inquiry Type</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g. Setup assistance for AI Med-Diagnose Project"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Provide any error logs, viva questions needed, or payment reference IDs..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Support Ticket (Google Sheets Sync)</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
