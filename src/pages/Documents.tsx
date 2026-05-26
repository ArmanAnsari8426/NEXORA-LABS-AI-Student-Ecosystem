import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentCard } from '../components/DocumentCard';
import { FileText, Sparkles, Filter } from 'lucide-react';

export const Documents: React.FC = () => {
  const { documentsCatalog } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'Synopsis', 'PPT', 'PTD Report', 'Research Document', 'Final Report'];

  const filteredDocs = selectedType === 'All' 
    ? documentsCatalog 
    : documentsCatalog.filter(d => d.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800 text-blue-400 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" /> IEEE & University Formatting Guidelines
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Document Marketplace</h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Download professional, ready-to-submit Synopsis documents, PowerPoint presentations (PPT), Preliminary Project Reports (PTD), and Final Reports.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" /> Document Type:
          </div>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocs.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" /> Need a Custom Plagiarism-Free Research Paper?
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our academic writers can format your custom project into a pristine research article suitable for IEEE / Springer conference proceedings.
          </p>
        </div>
        <a
          href="mailto:support@nexoralabs.com"
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 font-bold text-xs transition-colors border border-blue-900 flex-shrink-0"
        >
          Request Custom Report Writing
        </a>
      </div>

    </div>
  );
};
