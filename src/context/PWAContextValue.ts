import { createContext } from 'react';

export type ClientPlatform = 'ios' | 'android' | 'desktop';

export interface PWAContextType {
  isOnline: boolean;
  isInstalled: boolean;
  canInstall: boolean;
  platform: ClientPlatform;
  updateAvailable: boolean;
  installModalOpen: boolean;
  setInstallModalOpen: (open: boolean) => void;
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'unsupported'>;
  applyUpdate: () => void;
  dismissUpdate: () => void;
  checkConnection: () => Promise<boolean>;
}

export const PWAContext = createContext<PWAContextType | undefined>(undefined);
