import React, { useState } from 'react';
import { DocumentItem } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, Presentation, HardDrive } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface DocumentCardProps {
  document: DocumentItem;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const { buyItem } = useApp();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const getDocIcon = () => {
    switch (document.type) {
      case 'PPT': return Presentation;
      case 'Synopsis': return FileText;
      case 'PTD Report': return FileSpreadsheet;
      default: return FileText;
    }
  };

  const Icon = getDocIcon();

  const handleDownloadOrder = () => {
    buyItem({
      id: document.id,
      title: document.title,
      price: document.price,
      type: 'document'
    });
    setPaymentModalOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-slate-800 hover:border-blue-500/40 transition-all duration-300 group"
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-blue-400 border border-blue-800/40">
                {document.type}
              </span>
              <span className="text-[11px] text-slate-500 mt-1">{document.downloads} downloads</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
              {document.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
              {document.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{document.pages} Pages</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
              <span>{document.fileSize}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-900 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-500">Download Fee</div>
            <div className="text-lg font-black text-white">₹{document.price}</div>
          </div>

          <button
            onClick={handleDownloadOrder}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white text-blue-400 font-bold text-xs transition-all border border-blue-900/50 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        itemId={document.id}
        itemTitle={document.title}
        price={document.price}
      />
    </>
  );
};
