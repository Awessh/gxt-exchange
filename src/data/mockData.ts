export type Coin = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number; // percent
  color: string;
  sparkline: number[];
  balance?: number;
};

export const coins: Coin[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 64230.12,
    change24h: 2.34,
    color: '#F7931A',
    sparkline: [30, 34, 32, 40, 38, 44, 48, 46, 52],
    balance: 0.4821,
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3182.55,
    change24h: -1.18,
    color: '#8C9EFF',
    sparkline: [40, 38, 41, 36, 35, 33, 34, 30, 29],
    balance: 3.104,
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 178.92,
    change24h: 5.67,
    color: '#14F195',
    sparkline: [20, 22, 25, 24, 29, 31, 34, 38, 42],
    balance: 12.5,
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    price: 592.4,
    change24h: 0.42,
    color: '#F3BA2F',
    sparkline: [30, 31, 30, 32, 31, 33, 32, 34, 33],
    balance: 1.2,
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.612,
    change24h: -3.21,
    color: '#00AAE4',
    sparkline: [35, 34, 32, 30, 28, 27, 25, 24, 22],
    balance: 820,
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.451,
    change24h: 1.05,
    color: '#0033AD',
    sparkline: [25, 26, 24, 27, 28, 27, 29, 30, 31],
    balance: 0,
  },
  {
    id: 'doge',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.1523,
    change24h: 8.92,
    color: '#C2A633',
    sparkline: [15, 17, 16, 20, 24, 26, 30, 33, 38],
    balance: 0,
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 36.18,
    change24h: -0.85,
    color: '#E84142',
    sparkline: [30, 29, 31, 30, 28, 29, 27, 26, 25],
    balance: 0,
  },
];

export type Transaction = {
  id: string;
  type: 'deposit' | 'withdraw' | 'buy' | 'sell' | 'transfer';
  coinSymbol: string;
  amount: number;
  usdValue: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

export const transactions: Transaction[] = [
  { id: 't1', type: 'buy', coinSymbol: 'BTC', amount: 0.021, usdValue: 1348.83, date: '2026-08-06T09:12:00Z', status: 'completed' },
  { id: 't2', type: 'deposit', coinSymbol: 'USDT', amount: 500, usdValue: 500, date: '2026-08-05T18:40:00Z', status: 'completed' },
  { id: 't3', type: 'sell', coinSymbol: 'ETH', amount: 0.5, usdValue: 1591.28, date: '2026-08-04T14:02:00Z', status: 'completed' },
  { id: 't4', type: 'withdraw', coinSymbol: 'SOL', amount: 4, usdValue: 715.68, date: '2026-08-02T11:20:00Z', status: 'pending' },
  { id: 't5', type: 'transfer', coinSymbol: 'BNB', amount: 0.3, usdValue: 177.72, date: '2026-07-30T08:05:00Z', status: 'completed' },
];

export const portfolio = {
  totalBalanceUsd: 48213.62,
  todayChangeUsd: 1284.91,
  todayChangePercent: 2.74,
};

export type Trader = {
  id: string;
  name: string;
  avatarColor: string;
  roi30d: number;
  winRate: number;
  copiers: number;
  aum: number;
};

export const topTraders: Trader[] = [
  { id: 'tr1', name: 'NovaTrades', avatarColor: '#2FE0F0', roi30d: 84.2, winRate: 76, copiers: 3421, aum: 2_140_000 },
  { id: 'tr2', name: 'K.Osei_FX', avatarColor: '#F3BA2F', roi30d: 61.5, winRate: 68, copiers: 1988, aum: 980_000 },
  { id: 'tr3', name: 'QuantEdge', avatarColor: '#14F195', roi30d: 47.9, winRate: 71, copiers: 1204, aum: 640_000 },
  { id: 'tr4', name: 'DeltaWave', avatarColor: '#8C9EFF', roi30d: 38.1, winRate: 63, copiers: 902, aum: 410_000 },
];

export type FuturesPosition = {
  id: string;
  pair: string;
  side: 'long' | 'short';
  leverage: number;
  size: number;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  pnlPercent: number;
};

export const futuresPositions: FuturesPosition[] = [
  { id: 'f1', pair: 'BTC/USDT', side: 'long', leverage: 10, size: 2400, entryPrice: 63180, markPrice: 64230, pnl: 39.86, pnlPercent: 16.6 },
  { id: 'f2', pair: 'SOL/USDT', side: 'short', leverage: 5, size: 900, entryPrice: 184.1, markPrice: 178.92, pnl: 25.36, pnlPercent: 2.8 },
];
