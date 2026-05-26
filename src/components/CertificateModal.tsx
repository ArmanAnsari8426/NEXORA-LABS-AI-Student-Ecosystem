import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, CheckCircle2, X, ShieldCheck, Code2 } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateId: string;
  studentName: string;
  collegeName: string;
  courseOrProjectTitle: string;
  issueDate?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificateId,
  studentName,
  collegeName,
  courseOrProjectTitle,
  issueDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-slate-950/85 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl p-6 md:p-10 overflow-hidden rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 my-auto"
        >
          {/* Top helper actions */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" /> Cryptographically Verified Credential
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" /> Save / Print PDF
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actual Certificate Document Wrapper */}
          <div className="relative p-8 md:p-14 rounded-2xl bg-slate-950 border-8 border-double border-slate-800 text-center overflow-hidden space-y-6">
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none" />
            <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40 pointer-events-none" />

            {/* Glowing background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/5 via-blue-600/5 to-purple-600/5 rounded-full blur-3xl pointer-events-none" />

            {/* Organization Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-[10px] font-mono tracking-widest uppercase">
                <Code2 className="w-3 h-3" /> NEXORA LABS ACADEMIC COUNCIL
              </div>
              <h2 className="text-xs sm:text-sm tracking-[0.25em] font-bold text-slate-400 uppercase pt-2">
                Certificate of Excellence
              </h2>
            </div>

            {/* Main Title Badge */}
            <div className="py-2">
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide uppercase font-serif">
                INDUSTRIAL TRAINING & PROJECT COMPLETION
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto mt-3 rounded-full" />
            </div>

            {/* Candidate Declaration */}
            <div className="space-y-2 max-w-xl mx-auto pt-2">
              <p className="text-xs sm:text-sm text-slate-400 italic">
                This document proudly verifies and certifies that
              </p>
              <div className="text-xl sm:text-3xl font-black text-gradient-cyan tracking-wider font-mono py-1">
                {studentName.toUpperCase()}
              </div>
              <p className="text-xs text-slate-400">
                a registered candidate from <strong className="text-slate-200">{collegeName}</strong>
              </p>
            </div>

            {/* Scope of Completion */}
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400 leading-relaxed">
                has successfully designed, developed, and deployed the requisite implementation files and completed the standard engineering assessments for the specialized track:
              </p>
              <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                "{courseOrProjectTitle}"
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> Verified 100% compliant with standard university guidelines and external evaluation metrics.
              </div>
            </div>

            {/* Footer Reference Blocks & Signatures */}
            <div className="pt-8 grid grid-cols-3 gap-4 items-end text-left">
              
              {/* Seal & QR Verification Block */}
              <div className="text-center space-y-1">
                <div className="w-20 h-20 mx-auto bg-white p-1.5 rounded-lg shadow-inner flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https%3A%2F%2Fnexoralabs.com%2Fverify%3Fid%3D${certificateId}`}
                    alt="Cryptographic Check QR"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[9px] text-slate-500 font-mono tracking-tighter pt-1">Scan to Authenticate</div>
              </div>

              {/* ID Metadata */}
              <div className="text-center space-y-1">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-[10px] text-slate-400 font-bold tracking-wider pt-1">NEXORA CREDENTIAL</div>
                <div className="text-[10px] text-cyan-400 font-mono font-bold select-all">{certificateId}</div>
                <div className="text-[9px] text-slate-500">Issued: {issueDate}</div>
              </div>

              {/* Signatures Block */}
              <div className="text-center space-y-1">
                <div className="font-mono text-xs italic text-slate-300 border-b border-slate-700 inline-block pb-1 px-4">
                  ARMAN ANSARI
                </div>
                <div className="text-[10px] text-slate-400 font-bold pt-1">Founder & CEO</div>
                <div className="text-[9px] text-slate-500">NEXORA LABS Innovation Center</div>
              </div>

            </div>

          </div>

          <div className="mt-4 text-center">
            <span className="text-[10px] text-slate-500 block">
              Permanent verification logs archived via public blockchain logs & Google Sheets persistent storage sync packets.
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
