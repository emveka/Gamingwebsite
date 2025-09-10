// src/types/global.d.ts - Ajoutez ces types pour résoudre les erreurs gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'consent',
      targetId: string,
      config?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      }
    ) => void;
  }
}

export {};