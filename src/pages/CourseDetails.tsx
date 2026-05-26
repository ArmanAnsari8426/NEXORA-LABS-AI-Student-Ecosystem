import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle2, PlayCircle, BookOpen, Clock, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { coursesCatalog, buyItem, user, purchasedItems, setAuthModalOpen, setAuthRedirectUrl } = useApp();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const course = coursesCatalog.find(c => c.id === id) || coursesCatalog[0];

  if (!user) {
    setAuthRedirectUrl(`/courses/${course.id}`);
    setAuthModalOpen(true);
    return <Navigate to="/courses" />;
  }

  const isPurchased = purchasedItems.some(p => p.id === course.id);

  const handleEnroll = () => {
    buyItem({
      id: course.id,
      title: course.title,
      price: course.price,
      type: 'course',
      thumbnail: course.thumbnail
    });
    setPaymentModalOpen(true);
  };

  const sampleCurriculum = [
    { module: 'Module 1', title: 'Introduction to Architecture & Core Concepts', duration: '45 Mins', free: true },
    { module: 'Module 2', title: 'Setting Up the Development & Production Environment', duration: '1.2 Hrs', free: true },
    { module: 'Module 3', title: 'Deep Dive: Advanced Business Logic & Data Flow', duration: '2.5 Hrs', free: false },
    { module: 'Module 4', title: 'Database Integration, Optimization & Indexing', duration: '3.1 Hrs', free: false },
    { module: 'Module 5', title: 'Security, JWT Auth, and Role-Based Access Control', duration: '2.0 Hrs', free: false },
    { module: 'Module 6', title: 'Cloud Deployment, CI/CD Pipelines & Scaling', duration: '1.8 Hrs', free: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <Link to="/courses" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Premium Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-purple-950 text-purple-400 border border-purple-800">
                Premium Video Masterclass
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{course.title}</h1>
            <p className="text-xs text-purple-400 font-mono mt-2">Instructed by {course.instructor}</p>
            <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-video group">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="p-4 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-600/50">
                <PlayCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Interactive Video Player Ready</h4>
                <p className="text-xs text-slate-300">Enroll in course to unlock full HD playback, playback speed controls, and downloadable transcriptions.</p>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" /> Course Curriculum & Modules
              </h3>
              <span className="text-xs text-slate-400 font-mono">{course.lessonsCount} Modules • {course.duration}</span>
            </div>

            <div className="space-y-3 pt-2">
              {sampleCurriculum.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-purple-400 font-mono text-xs font-bold">
                      {item.module}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-200">{item.title}</h4>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {item.duration}
                      </div>
                    </div>
                  </div>
                  <div>
                    {item.free ? (
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Free Preview
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-slate-900 text-slate-500 border border-slate-800">
                        {isPurchased ? 'Unlocked' : 'Locked'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included Features */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Course Inclusions & Deliverables</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Checkout */}
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 sticky top-24">
            <div className="space-y-1">
              <div className="text-xs text-slate-400">Complete Masterclass Enrollment</div>
              <div className="text-4xl font-black text-gradient-purple">₹{course.price}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Lifetime Access • Verified Certificate
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-900 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>HD Recorded Videos</span>
                <span className="text-purple-400 font-bold">Included</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Downloadable Study Notes</span>
                <span className="text-purple-400 font-bold">PDF Format</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Complete Source Code</span>
                <span className="text-purple-400 font-bold">Included</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verifiable QR Certificate</span>
                <span className="text-emerald-400 font-bold">Instant Issue</span>
              </div>
            </div>

            {isPurchased ? (
              <div className="p-4 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-center font-bold text-xs">
                ✨ You are enrolled! Access videos & notes in your Student Dashboard.
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course Masterclass</span>
              </button>
            )}

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-center space-y-2">
              <div className="text-xs font-semibold text-white flex items-center justify-center gap-1">
                <FileText className="w-3.5 h-3.5 text-purple-400" /> Syllabus & Notes Guarantee
              </div>
              <p className="text-[11px] text-slate-400">
                All course files are formatted for college examination preparation. Get access to our exclusive Discord student mentoring channels.
              </p>
            </div>
          </div>
        </div>

      </div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        itemId={course.id}
        itemTitle={course.title}
        price={course.price}
      />

    </div>
  );
};
