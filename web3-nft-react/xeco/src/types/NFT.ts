// src/types/NFT.ts
export interface NFT {
    handling_fee_percentage: string;
    weekly_earning_rate: string;
    category: string;
    id: number;
    name: string;
    price_usdt: string;        // or number if your API returns numeric
    image: string;             // e.g. "nfts/NFT-1.webp" or "/media/nfts/NFT-1.webp"
    contract_address: string;
    level: number;
  }
  