import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollActivity } from '../../hooks/useScrollActivity';

export const BackToTopButton: React.FC = () => {
  const { isActive, scrollY } = useScrollActivity({ inactivityDelay: 1500 });
  const [isHovered, setIsHovered] = useState(false);

  // Appears after scrolling down > 200px, hides when at the top or when inactive
  const isScrolledDown = scrollY > 200;
  const isVisible = isScrolledDown && (isActive || isHovered);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed right-4 sm:right-6 z-40 select-none print:hidden pointer-events-none"
      style={{ bottom: 'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Scroll to top"
        className={`w-11 h-11 rounded-full flex items-center justify-center bg-white/95 dark:bg-[#12131A]/90 hover:bg-slate-50 dark:hover:bg-[#181A24] border border-slate-200/90 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/40 text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white shadow-lg dark:shadow-black/50 backdrop-blur-md transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-95 ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-3 pointer-events-none scale-90'
        }`}
      >
        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};
