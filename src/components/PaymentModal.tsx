import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Upload, CheckCircle, ShieldCheck, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
  price: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, itemId, itemTitle, price }) => {
  const { uploadPaymentScreenshot } = useApp();
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshotUrl) return;

    setIsSubmitting(true);
    setTimeout(() => {
      uploadPaymentScreenshot(itemId, screenshotUrl);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setScreenshotUrl('');
        onClose();
      }, 2000);
    }, 1200);
  };

  const sampleScreenshots = [
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md p-6 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-cyan-500/10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Instant QR Checkout</h3>
            <p className="text-xs text-slate-400 mt-1">Scan & Pay to instantly unlock project files & certification</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-center space-y-3">
            <div className="text-xs text-slate-400">Amount Payable:</div>
            <div className="text-3xl font-black text-gradient-cyan">₹{price}</div>
            <div className="text-[11px] text-slate-500">For: <span className="text-slate-300 font-medium">{itemTitle}</span></div>
            
            {/* Mock QR Code */}
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-xl shadow-lg flex items-center justify-center relative group">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi%3A%2F%2Fpay%3Fpa%3Dnexora%40okaxis%26pn%3DNEXORA%20LABS%26cu%3DINR%26am%3D2499"
                alt="UPI QR Code"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-xs text-cyan-400 font-mono">
                Official NEXORA UPI Gateway active
              </div>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Supports Google Pay, PhonePe, Paytm, BHIM UPI
            </div>
          </div>

          {success ? (
            <div className="py-8 text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8" />
              </motion.div>
              <h4 className="text-lg font-bold text-white">Payment Verified!</h4>
              <p className="text-xs text-slate-300">Downloads and Certificates unlocked successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Upload Payment Screenshot URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Upload className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      required
                      placeholder="https://imgur.com/your-screenshot.jpg"
                      value={screenshotUrl}
                      onChange={(e) => setScreenshotUrl(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-500">Quick Test Samples:</span>
                  {sampleScreenshots.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setScreenshotUrl(url)}
                      className="text-[10px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded hover:bg-slate-700 transition-colors"
                    >
                      Sample #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !screenshotUrl}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    Verifying with Payment Gateway...
                  </>
                ) : (
                  <>Submit Screenshot & Unlock Downloads</>
                )}
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
