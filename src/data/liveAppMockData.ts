// Additional mock data to mirror the live gxtexchange.com app content
// (presale banner, quick-action grid, GXT token, funding info).

export const gxtToken = {
  symbol: 'GXT',
  name: 'GXT Token',
  price: 0.2,
  change24h: 0,
  color: '#3BD5FE',
  balance: 247.44136835,
};

export const presale = {
  stage: 'Final Stage 3',
  status: 'Live',
  price: 0.2,
  listingPrice: 0.6,
  bonusThresholdUsd: 100,
  bonusPercent: 20,
};

export const homeActionGrid: {
  key: string;
  label: string;
  icon: string;
  tag?: string;
}[] = [
  { key: 'launchpad', label: 'Launchpad', icon: 'rocket-outline', tag: 'NEW' },
  { key: 'mining', label: 'GXT Mining', icon: 'hardware-chip-outline', tag: 'GXT' },
  { key: 'invite', label: 'Invite', icon: 'person-add-outline' },
  { key: 'p2p', label: 'P2P', icon: 'people-outline' },
  { key: 'rewards', label: 'Rewards', icon: 'gift-outline', tag: 'NEW' },
  { key: 'paycard', label: 'Pay Card', icon: 'card-outline', tag: 'NEW' },
  { key: 'macbook', label: 'MacBook', icon: 'laptop-outline', tag: 'NEW' },
  { key: 'more', label: 'More', icon: 'grid-outline' },
];

export const assetActions: { key: string; label: string; icon: string }[] = [
  { key: 'deposit', label: 'Deposit', icon: 'arrow-down-outline' },
  { key: 'send', label: 'Send', icon: 'arrow-up-outline' },
  { key: 'withdraw', label: 'Withdraw', icon: 'arrow-up-circle-outline' },
  { key: 'transfer', label: 'Transfer', icon: 'swap-horizontal-outline' },
  { key: 'history', label: 'History', icon: 'time-outline' },
];

export type OrderBookRow = { price: number; amount: number };

export function generateOrderBook(midPrice: number) {
  let seed = Math.floor(midPrice * 977) % 7919;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const tick = midPrice > 1000 ? 0.01 : midPrice > 10 ? 0.01 : 0.0001;
  const asks: OrderBookRow[] = [];
  const bids: OrderBookRow[] = [];
  for (let i = 6; i >= 1; i--) {
    asks.push({ price: midPrice + tick * i * (1 + rand()), amount: +(rand() * 5).toFixed(4) });
  }
  for (let i = 1; i <= 7; i++) {
    bids.push({ price: midPrice - tick * i * (1 + rand()), amount: +(rand() * 5).toFixed(4) });
  }
  return { asks, bids };
}
