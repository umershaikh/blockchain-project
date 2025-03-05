// src/tron.d.ts
interface TronLink {
    ready: boolean;
    request: (args: { method: string }) => Promise<{ code: number }>;
    tronWeb: {
      defaultAddress: {
        base58: string;
        hex: string;
      };
    };
  }
  
  interface Window {
    tronLink?: TronLink;
  }