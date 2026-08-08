# GXT Exchange — Mobile App Prototype

A high-fidelity React Native (Expo + TypeScript) prototype of an official mobile app
for **GXT Exchange**, built to be presented as an investor/CEO-ready concept and to
serve as the real starting codebase once the project is greenlit.

All data in this prototype is **mocked locally** (`src/data/mockData.ts`) — there is
no backend call. Every screen, animation, and interaction is real and functional;
only the data source is fake.

## Stack

- **Expo (SDK 51) + React Native 0.74** — one codebase for iOS & Android
- **TypeScript**, strict mode
- **React Navigation 6** — native-stack + bottom-tabs, fully typed routes
- **react-native-svg** — candlestick chart & sparklines (no chart library lock-in)
- **expo-linear-gradient**, **expo-haptics** — micro-interactions & brand gradients
- Dark mode only, by design (matches the brand and the fintech category norm)

## Getting started

```bash
npm install
npx expo start
```

Then scan the QR code with **Expo Go** (iOS/Android), or press `i` / `a` for a
simulator/emulator. No environment variables or API keys are required to run
the prototype.

## Project structure

```
App.tsx                     Entry point, navigation container, theme wiring
src/
  theme/                    colors.ts, typography.ts — single source of design tokens
  data/mockData.ts          Coins, portfolio, transactions, traders, positions
  components/               Reusable UI: Button, Card, TextField, CoinListItem,
                             CandlestickChart, Sparkline, ChangeBadge, Headers…
  navigation/                RootNavigator → Splash → Onboarding → Auth / Main
                             MainTabNavigator (Home, Markets, Futures, Wallet, Profile)
                             MarketsNavigator (Markets list → Trading detail)
  screens/
    SplashScreen.tsx
    onboarding/OnboardingScreen.tsx
    auth/{LoginScreen,SignUpScreen}.tsx
    home/HomeScreen.tsx
    markets/MarketsScreen.tsx
    trading/TradingScreen.tsx
    futures/FuturesScreen.tsx
    wallet/WalletScreen.tsx
    profile/ProfileScreen.tsx
assets/                     Brand logo (as supplied)
```

## Screens delivered

1. **Splash** — centered logo, dark radial glow, fade/scale-in animation
2. **Onboarding** (3 slides) — Trade anywhere / Secure your assets / Real-time market access
3. **Login / Sign up** — email + password, Google button, Face ID / Fingerprint entry point
4. **Home** — portfolio balance, today's P/L, quick actions, trending coins, market overview
5. **Markets** — search, filter chips (All/Favorites/Gainers/Losers), sparkline list, favorites
6. **Trading** — candlestick chart, timeframe selector, buy/sell toggle, order type, amount, balance
7. **Futures** — open positions with live-style P/L, margin panel, and a Copy Trading tab with a trader leaderboard
8. **Wallet** — total assets, per-coin balances, deposit/withdraw/transfer, recent transactions
9. **Profile** — avatar, KYC status, security settings, Face ID & dark-mode toggles, language, support, logout

## Design system

Tokens live in `src/theme/colors.ts` and `src/theme/typography.ts`. The palette is
built directly from the supplied brand mark: layered near-black surfaces
(`#0A0D12` → `#1C222C`) with a single **signal cyan** accent (`#2FE0F0`) reserved
for actions, focus states, and the brand glow — so it keeps its meaning instead of
being scattered decoratively. Gains/losses use a separate green/red pair so market
color never competes with brand color.

## Turning this into production

This prototype is structured so the path to production is additive, not a rewrite:

1. **Swap mock data for a real API/WebSocket layer.** `src/data/mockData.ts` defines
   the exact shapes (`Coin`, `Transaction`, `FuturesPosition`, `Trader`) the UI expects —
   replace the static arrays with fetch calls / socket subscriptions of the same shape.
2. **Wire real auth.** `LoginScreen` / `SignUpScreen` already isolate the submit
   handlers (`handleLogin`, `handleSignUp`) — point them at your auth provider and
   add token storage (e.g. `expo-secure-store`).
3. **Add real biometrics.** Swap the Face ID/Fingerprint entry point for
   `expo-local-authentication`.
4. **Real-time prices.** Replace `generateCandles()` in `CandlestickChart.tsx`
   with live OHLC data from your market-data feed; the rendering layer is already
   decoupled from the data source.
5. **Push notifications, deep links, KYC provider SDK** can all be added without
   touching the navigation or design-system layers.

## Notes on fidelity

- Icons: `@expo/vector-icons` (Ionicons) — swap for a custom icon set later if desired.
- No third-party UI kit is used — every component is hand-built and owned, so there
  is no licensing or styling lock-in going into a real build.

## Putting this on GitHub

The project is already a git repo with one commit on `main`. To push it to GitHub:

```bash
# 1. Create an empty repo on github.com (no README/license — this project already has one)
# 2. Point this local repo at it and push
git remote add origin https://github.com/<your-username>/gxt-exchange.git
git push -u origin main
```

From then on, work as usual: `git add -A && git commit -m "..." && git push`.

`.gitignore` already excludes `node_modules/`, build output, and native credential
files, so the repo stays small and nothing sensitive gets committed.

## OTA updates (EAS Update) — how the "Check for updates" button works

The Profile screen has a **Check for updates** button that uses `expo-updates` to
pull down any JS/asset changes you've published, without going through App Store /
Play Store review. This only works in a **real build** (dev-client, internal, or
store build published via EAS) — it's intentionally a no-op in Expo Go or the web
preview, where `Updates.isEnabled` is `false`.

**One-time setup (already done in this project):**
- `app.json` has `"runtimeVersion": { "policy": "appVersion" }` and `"updates.url"`
  pointing at this project's EAS Update endpoint (project ID
  `5bc29e53-2b40-4c90-be77-6f1c090a9e4f`, already present from your earlier `eas init`).
- `eas.json` tags each build profile with an update **channel**
  (`development` / `preview` / `production`), so a build only ever pulls updates
  published to its own channel.
- `expo-updates` is installed and added to the `plugins` array.

**Day-to-day: publishing an update**

```bash
npx eas login                      # once per machine
npx eas update --branch production --message "Fix presale banner copy"
```

Anyone running a `production`-channel build (TestFlight/Play internal track, or a
store release) will see the update the next time they open the app and tap
**Check for updates** in Profile — or automatically next launch, if you later wire
`Updates.checkForUpdateAsync()` into `App.tsx` on startup instead of only on demand.

**Rule of thumb for whether an OTA update is enough, or you need a new build:**
- JS logic, styles, mock data, navigation, images → OTA update is fine.
- New native module, permission, icon/splash, or a change to `app.json`'s native
  config (bundle ID, plugins that touch native code) → needs a new `eas build` +
  store submission; OTA can't ship that.

**Bumping the version:** `version` in `app.json`/`package.json` (currently `1.0.0`)
is the *store-facing* version — bump it for actual store releases (App Store/Play
Store review), not for every OTA update. OTA updates are identified by their own
update ID and channel, so you can ship many updates between version bumps.

**Automating it:** `.github/workflows/eas-update.yml` runs `eas update --auto` on
every push to `main`, so merging to `main` publishes an update automatically. It
needs one GitHub secret:
1. Generate a token: `npx eas whoami` (log in first), then create a robot/access
   token at https://expo.dev/accounts/<your-account>/settings/access-tokens.
2. In the GitHub repo: **Settings → Secrets and variables → Actions → New repository
   secret**, name it `EXPO_TOKEN`, paste the token.

After that, every push to `main` publishes automatically — no manual `eas update`
needed for routine changes.
