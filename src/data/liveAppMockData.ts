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

// ---------------------------------------------------------------------------
// Launchpad / Airdrop / Mining / Invite / Rewards — mock data matching the
// live app's growth-loop screens (accessible from the Home action grid).
// ---------------------------------------------------------------------------

export type PresaleStage = {
  stage: number;
  price: number;
  status: 'done' | 'live' | 'upcoming';
  sold: number;
  total: number;
};

export const presaleStages: PresaleStage[] = [
  { stage: 1, price: 0.12, status: 'done', sold: 4999993.899, total: 5000000 },
  { stage: 2, price: 0.15, status: 'done', sold: 2999995.552, total: 3000000 },
  { stage: 3, price: 0.2, status: 'live', sold: 1281191.493, total: 2000000 },
];

export const launchpadOffer = {
  description:
    'GXT Presale Stage 3 - final presale round at $0.20 USDT before public listing. 60% unlocks at TGE, remaining 40% releases after a 3-month lock.',
  bonusThresholdUsd: 100,
  bonusPercent: 20,
  minTokens: 25,
  maxTokens: 2000000,
  usdtBalance: 0.5,
};

export type AirdropTask = {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  reward: string;
  bonusLine?: string;
  minLine?: string;
  progressLine?: string;
  ctaKind: 'start' | 'depositGate';
};

export const airdropTasks: AirdropTask[] = [
  {
    id: 't1',
    icon: 'repeat-outline',
    iconColor: '#1FD98A',
    title: 'Like Retweet Redeem code Post',
    subtitle: 'Like Retweet Tag 3 friends',
    reward: '+2 GXT',
    ctaKind: 'start',
  },
  {
    id: 't2',
    icon: 'wallet-outline',
    iconColor: '#F5B94A',
    title: 'First Deposit bonus',
    subtitle: 'Complete Your First Deposit Claim Bonus',
    reward: '+25 GXT',
    bonusLine: '+3 USDT bonus',
    minLine: 'Min deposit $12',
    progressLine: 'No deposits yet — $0.00/$12',
    ctaKind: 'depositGate',
  },
  {
    id: 't3',
    icon: 'timer-outline',
    iconColor: '#3BD5FE',
    title: 'Deposit Hold Bonus',
    subtitle: 'Deposit $100 and hold 48h to Eligible',
    reward: '+200 GXT',
    bonusLine: '+10 USDT bonus',
    minLine: 'Min deposit $100 · Hold 48h',
    progressLine: 'No deposits yet — $0.00/$100',
    ctaKind: 'depositGate',
  },
  {
    id: 't4',
    icon: 'timer-outline',
    iconColor: '#3BD5FE',
    title: 'Deposit Hold Bonus',
    subtitle: 'Deposit $500 and hold 24h to Eligible',
    reward: '+800 GXT',
    bonusLine: '+50 USDT bonus',
    minLine: 'Min deposit $500 · Hold 24h',
    progressLine: 'No deposits yet — $0.00/$500',
    ctaKind: 'depositGate',
  },
];

export const miningData = {
  totalMined: 91.069055,
  endedNotice: 'GXT Mining has ended · all mined rewards are credited to your balance',
  balance: 247.441368,
  referrals: 2,
  commissionCredited: 16.1223,
};

export const miningClaimHistory: { date: string; time: string; amount: number }[] = [
  { date: '1 août 2026', time: '08:06 AM', amount: 8.005928 },
  { date: '31 juil. 2026', time: '04:05 PM', amount: 3.53052 },
  { date: '30 juil. 2026', time: '09:41 AM', amount: 5.219004 },
  { date: '29 juil. 2026', time: '07:58 PM', amount: 2.881193 },
];

export const inviteData = {
  code: '2558DB3B',
  link: 'https://gxtexchange.com/auth?ref=2558DB3B',
  totalInvited: 2,
  qualified: 2,
  claims: 26,
  creditedGxt: 16.1223,
};

export const rewardsLastRedeem = 'Last redeem credited 16 GXT to your balance.';

export const rewardsRedeemHistory: { code: string; date: string; time: string; amount: string }[] = [
  { code: 'BUY-GXT-BEFORE-SOLD-OUT', date: '06/08/2026', time: '14:24:03', amount: '+16 GXT' },
  { code: 'BUY-GXT-AND-HOLD', date: '05/08/2026', time: '17:26:12', amount: '+0.25 USDT' },
  { code: 'BUY-GXT-NOW', date: '05/08/2026', time: '06:01:17', amount: '+15 GXT' },
  { code: 'BUY-GXT-AND-HOLD', date: '04/08/2026', time: '20:03:32', amount: '+10 GXT' },
  { code: 'HOLD-GXT-TOKENS', date: '04/08/2026', time: '07:46:17', amount: '+0.25 USDT' },
  { code: 'GXT-LISTING-28TH-AUGUST', date: '03/08/2026', time: '22:33:46', amount: '+50 GXT' },
  { code: 'GXT-MAINNET-28TH-AUGUST', date: '03/08/2026', time: '07:51:59', amount: '+15 GXT' },
  { code: 'GXT-TGE-28TH-AUGUST', date: '02/08/2026', time: '19:12:04', amount: '+20 GXT' },
];
