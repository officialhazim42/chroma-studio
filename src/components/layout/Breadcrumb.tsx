import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ActiveTab } from '../../types/color';

export interface BreadcrumbItem {
  label: string;
  tab?: ActiveTab;
  param?: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (tab: ActiveTab, param?: string) => void;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate, className = '' }) => {
  const allItems: BreadcrumbItem[] = [
    { label: 'Home', tab: 'home', href: '/' },
    ...items,
  ];

  return (
    <nav aria-label="Breadcrumb" className={`py-2 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className="font-medium text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.tab) {
                      onNavigate(item.tab, item.param);
                    }
                  }}
                  className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors"
                >
                  {index === 0 && <Home className="w-3 h-3 shrink-0" aria-hidden="true" />}
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
