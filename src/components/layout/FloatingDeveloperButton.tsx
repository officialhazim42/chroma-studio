import React, { useState } from 'react';
import { useScrollActivity } from '../../hooks/useScrollActivity';
import { DEVELOPER_LOGO_SRC, DEVELOPER_LOGO_ALT } from '../../utils/developerAssets';

interface FloatingDeveloperButtonProps {
  onClick: () => void;
  isModalOpen?: boolean;
}

export const FloatingDeveloperButton: React.FC<FloatingDeveloperButtonProps> = ({
  onClick,
  isModalOpen = false,
}) => {
  const { isActive } = useScrollActivity({ inactivityDelay: 1500 });
  const [isHovered, setIsHovered] = useState(false);

  // Remains visible while scrolling, while hovered, or while the modal is open
  const isVisible = isActive || isHovered || isModalOpen;

  return (
    <div
      className="fixed left-4 sm:left-6 z-40 select-none print:hidden pointer-events-none"
      style={{ bottom: 'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label="About Developer - Hazim Bashir Faqeer"
        title="About Developer"
        className={`group relative flex items-center gap-2.5 h-11 px-3.5 rounded-full bg-white/95 dark:bg-[#12131A]/90 hover:bg-slate-50 dark:hover:bg-[#181A24] border border-slate-200/90 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/40 shadow-lg dark:shadow-black/50 backdrop-blur-md transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-95 ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        {/* Official Developer Logo Badge */}
        <div className="w-7 h-7 rounded-full overflow-hidden bg-black p-0.5 border border-indigo-500/40 shadow-xs shrink-0 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
          <img
            src={DEVELOPER_LOGO_SRC}
            alt={DEVELOPER_LOGO_ALT}
            className="w-full h-full object-contain rounded-full"
            loading="eager"
          />
        </div>

        {/* Short Label */}
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
          About Developer
        </span>
      </button>
    </div>
  );
};
