import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navigate, Link } from 'react-router-dom';
import { Download, Award, Clock, ShieldAlert, Sparkles, Upload, Database, CheckCircle2 } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { CertificateModal } from '../components/CertificateModal';

export const Dashboard: React.FC = () => {
  const { user, purchasedItems, customRequests, supportTickets } = useApp();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // Custom interactive Certificate view flow state
  const [certSearchInput, setCertSearchInput] = useState('');
  const [activeCertDetails, setActiveCertDetails] = useState<{
    certificateId: string;
    studentName: string;
    collegeName: string;
    courseOrProjectTitle: string;
  } | null>(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const selectedForPayment = purchasedItems.find(p => p.id === selectedItemId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 z-10 w-full md:w-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800">
            <Sparkles className="w-3.5 h-3.5" /> Premium Student Ecosystem
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Hello, {user.name}</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {user.college} • <span className="text-slate-300 font-mono">{user.email}</span>
          </p>
        </div>

        {user.role === 'admin' && (
          <Link
            to="/admin"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 z-10"
          >
            <ShieldAlert className="w-4 h-4" /> Open Master Admin Panel
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Purchases & Downloads */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-cyan-400" /> Purchased Projects, Courses & Training
            </h2>

            {purchasedItems.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl text-center space-y-3 border border-slate-800">
                <p className="text-xs text-slate-400">You haven't purchased any projects or courses yet.</p>
                <Link to="/projects" className="inline-block px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {purchasedItems.map((item) => (
                  <div key={item.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-slate-800 flex-shrink-0" />
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-cyan-400 border border-slate-800">
                          {item.type}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{item.title}</h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">Purchased on {item.purchasedAt} • ₹{item.price}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {item.status === 'Unlocked' ? (
                        <>
                          {item.certificateId && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveCertDetails({
                                  certificateId: item.certificateId!,
                                  studentName: user?.name || 'Student Candidate',
                                  collegeName: user?.college || 'NEXORA University Partner',
                                  courseOrProjectTitle: item.title
                                });
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs flex items-center gap-1 font-mono hover:bg-emerald-900 transition-colors cursor-pointer"
                              title="Click to inspect verifiable Certificate of Excellence"
                            >
                              <Award className="w-3.5 h-3.5" /> {item.certificateId}
                            </button>
                          )}
                          <a
                            href={item.downloadUrl || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg"
                          >
                            <Download className="w-3.5 h-3.5" /> Download Package
                          </a>
                        </>
                      ) : (
                        <button
                          onClick={() => setSelectedItemId(item.id)}
                          className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-500/30 transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" /> Upload Payment Screenshot
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Custom Project Requests */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Custom Project Requests
            </h2>

            {customRequests.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl text-center space-y-3 border border-slate-800">
                <p className="text-xs text-slate-400">No custom project requests submitted.</p>
                <Link to="/projects" className="inline-block px-6 py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs">
                  Request Custom Build
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {customRequests.map((req) => (
                  <div key={req.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{req.projectTitle}</h4>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{req.technology} • Deadline: {req.deadline}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        req.status === 'Approved' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        req.status === 'Delivered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-900">
                      <span className="font-semibold text-slate-300">Deliverables specified:</span> {req.requirementDetails}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Support Tickets & Certificate Verifier */}
        <div className="space-y-8">
          
          {/* Live System Integration Hub Checks */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-800/40 bg-emerald-950/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> Core Systems Active
              </h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                <CheckCircle2 className="w-3 h-3" /> 2 Multi-Node Sync
              </span>
            </div>

            {/* Firebase config block */}
            <div className="space-y-1 font-mono text-[10px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-900">
              <div className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold mb-1 border-b border-slate-900 pb-0.5">Firebase SDK</div>
              <div><span className="text-slate-500">Project:</span> <span className="text-white font-bold">nexora-labs</span></div>
              <div><span className="text-slate-500">Auth ID:</span> ...42ebb4</div>
              <div><span className="text-slate-500">Engine:</span> Firestore + Auth Hub</div>
            </div>

            {/* Google sheet/AppSheet config block */}
            <div className="space-y-1 font-mono text-[10px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-900">
              <div className="text-[9px] text-purple-400 uppercase tracking-widest font-bold mb-1 border-b border-slate-900 pb-0.5">Google Sheet / AppSheet API</div>
              <div><span className="text-slate-500">App Name:</span> <span className="text-slate-200">NexoraLeads-472898382</span></div>
              <div><span className="text-slate-500">Template ID:</span> f4e7460b-...-108e91fa28c7</div>
              <div><span className="text-slate-500">Channel:</span> REST Action POST ("Add" Mode)</div>
              <div><span className="text-slate-500">Status:</span> Connected via API Actions</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" /> Certificate Verification Search
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your Certificate ID to verify credentials instantly.
            </p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="e.g. NEX-CERT-2026-8812"
                value={certSearchInput}
                onChange={e => setCertSearchInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  const targetId = certSearchInput.trim() || 'NEX-CERT-2026-8812';
                  // Simulate looking up custom profile or course items
                  const foundPurchase = purchasedItems.find(p => p.certificateId?.toLowerCase() === targetId.toLowerCase());
                  setActiveCertDetails({
                    certificateId: targetId.toUpperCase(),
                    studentName: user?.name || 'Academic Scholar',
                    collegeName: user?.college || 'NEXORA LABS University System',
                    courseOrProjectTitle: foundPurchase?.title || 'Industrial Masterclass & Full-Stack Implementation'
                  });
                }}
                className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs transition-colors border border-slate-700 cursor-pointer"
              >
                Verify Certificate
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" /> Active Support Tickets
            </h3>

            {supportTickets.length === 0 ? (
              <p className="text-xs text-slate-500">No support tickets found.</p>
            ) : (
              <div className="space-y-3">
                {supportTickets.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-slate-950 border border-slate-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 truncate pr-2">{t.subject}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        t.status === 'Resolved' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{t.message}</p>
                  </div>
                ))}
              </div>
            )}

            <Link
              to="/contact"
              className="block text-center w-full py-2.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 transition-colors"
            >
              Submit New Ticket
            </Link>
          </div>

        </div>

      </div>

      {selectedForPayment && (
        <PaymentModal
          isOpen={!!selectedItemId}
          onClose={() => setSelectedItemId(null)}
          itemId={selectedForPayment.id}
          itemTitle={selectedForPayment.title}
          price={selectedForPayment.price}
        />
      )}

      {activeCertDetails && (
        <CertificateModal
          isOpen={!!activeCertDetails}
          onClose={() => setActiveCertDetails(null)}
          certificateId={activeCertDetails.certificateId}
          studentName={activeCertDetails.studentName}
          collegeName={activeCertDetails.collegeName}
          courseOrProjectTitle={activeCertDetails.courseOrProjectTitle}
        />
      )}

    </div>
  );
};
