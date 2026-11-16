import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'filled';
  className?: string;
  onCopySuccess?: (text: string) => void;
  showIconOnly?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Copy',
  size = 'md',
  variant = 'ghost',
  className = '',
  onCopySuccess,
  showIconOnly = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers or non-https
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopied(true);
      if (onCopySuccess) onCopySuccess(textToCopy);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1.5 h-7',
    md: 'text-xs px-2.5 py-1.5 gap-1.5 h-8',
    lg: 'text-sm px-3.5 py-2 gap-2 h-10',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
  };

  const variantClasses = {
    ghost: 'hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300',
    outline: 'border border-slate-300 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/40 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95',
    filled: 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm active:scale-95',
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center justify-center font-mono rounded-lg transition-all duration-150 cursor-pointer select-none ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${copied ? '!text-emerald-400 !border-emerald-500/40' : ''} ${className}`}
      title={copied ? 'Copied to clipboard!' : `Copy ${textToCopy}`}
      aria-label={`Copy ${textToCopy}`}
    >
      {copied ? (
        <Check className={`${iconSizes[size]} text-emerald-400 shrink-0`} />
      ) : (
        <Copy className={`${iconSizes[size]} shrink-0`} />
      )}
      {!showIconOnly && <span>{copied ? 'Copied!' : label}</span>}
    </button>
  );
};
