import { useContext } from 'react';
import { PWAContext, PWAContextType } from '../context/PWAContextValue';

export const usePWA = (): PWAContextType => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
};
