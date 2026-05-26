import React, { useState } from 'react';
import { Course } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, BookOpen, Check, ArrowRight, Lock } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { buyItem, user, setAuthModalOpen, setAuthRedirectUrl } = useApp();
  const navigate = useNavigate();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthRedirectUrl(`/courses/${course.id}`);
      setAuthModalOpen(true);
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  const handleBuy = () => {
    if (!user) {
      setAuthRedirectUrl(`/courses/${course.id}`);
      setAuthModalOpen(true);
      return;
    }
    buyItem({
      id: course.id,
      title: course.title,
      price: course.price,
      type: 'course',
      thumbnail: course.thumbnail
    });
    setPaymentModalOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group"
      >
        <div className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={handleDetailsClick}>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-sm">
            <div className="p-3 rounded-full bg-purple-500 text-white shadow-lg shadow-purple-500/50 flex items-center gap-2 px-4">
              {user ? (
                <>
                  <PlayCircle className="w-5 h-5" />
                  <span className="text-xs font-bold">Preview Lessons</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span className="text-xs font-bold">🔒 Login to Access Details</span>
                </>
              )}
            </div>
          </div>
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-purple-400 backdrop-blur-md border border-purple-500/30">
              Premium Course
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>{course.lessonsCount} lessons</span>
            </div>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div onClick={handleDetailsClick} className="cursor-pointer">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                {course.title}
              </h3>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
              <span>By {course.instructor}</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {course.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-purple-950/30 text-purple-300 border border-purple-800/40">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 pt-4 border-t border-slate-900">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Includes Access To</div>
              {course.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] text-slate-400">Enrollment Fee</div>
              <div className="text-xl font-black text-gradient-purple">₹{course.price}</div>
            </div>

            <button
              onClick={handleBuy}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 flex items-center gap-1.5"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        itemId={course.id}
        itemTitle={course.title}
        price={course.price}
      />
    </>
  );
};
