import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LoadingSpinner({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <Loader2 className={`animate-spin text-brand-blue ${className}`} />
  );
}

export function FullPageLoader({ message = 'Loading workspace...' }: { message?: string }) {
  const letters = Array.from("Nemvol");

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    initial: { y: 0, opacity: 0.3, scale: 0.9 },
    animate: {
      y: [0, -10, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.9, 1.05, 0.9],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/75 backdrop-blur-sm select-none"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Creative animated text */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex items-center gap-0.5 text-3xl font-extrabold tracking-tight"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={index < 3 ? 'text-slate-800' : 'text-brand-blue'}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Fading secondary message */}
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
          {message}
        </p>
      </div>
    </motion.div>
  );
}

export function ProgressBar({ isAnimating }: { isAnimating: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
      setProgress(100);
      return;
    }

    setProgress(10);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        // Slow down as it gets closer to 90
        const diff = (90 - prev) * 0.15;
        return prev + diff;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-slate-100 z-[9999]"
        >
          <motion.div
            className="h-full bg-brand-blue shadow-[0_0_8px_rgba(2,132,199,0.5)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{
              width: { type: 'spring', stiffness: 80, damping: 15 },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ShoppingBagLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 select-none">
      <motion.div
        animate={{
          scale: [0.96, 1.04, 0.96],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-10 h-10 text-brand-blue flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Main Bag Body */}
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
          {/* Seam/Top Line */}
          <line x1="3" y1="6" x2="21" y2="6" />
          {/* Inner handle shape */}
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </motion.div>
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
        Loading...
      </span>
    </div>
  );
}
