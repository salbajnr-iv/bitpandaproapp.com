# Implementation Plan: Add Crypto Logos to Dashboard and Markets

## Overview
Add actual cryptocurrency logos to the portfolio dashboard and markets page instead of colored circles with text.

## Available Logo Files in /public/
- `btc-logo.png`
- `eth-logo.png`
- `bnb-logo.png`
- `sol-logo.png`
- `xrp-logo.png`
- `ada-logo.png`

## Missing Logo Files (need to source/download)
- `doge-logo.png` (Dogecoin)
- `dot-logo.png` (Polkadot)

---

## Tasks

### Task 1: Download Missing Crypto Logos
**File:** Dogecoin and Polkadot logos
**Action:** Download from CoinGecko API or similar source
- Dogecoin: https://assets.coingecko.com/coins/images/5/large/dogecoin.png
- Polkadot: https://assets.coingecko.com/coins/images/12171/large/polkadot.png

### Task 2: Update `hooks/usePriceSimulation.ts`
**Add:**
- `getCoinLogo` function that returns logo path for each symbol
- Update `getCoinColor` to include DOGE and DOT colors

### Task 3: Update `app/dashboard/page.tsx`
**Changes:**
1. Create `cryptoLogos` mapping object
2. Update `currencies` array: replace `iconColor` with `iconSrc`
3. Update `watchlist` array: replace `iconColor` with `iconSrc`
4. Update `topPositions` array: change icon strings to logo paths

### Task 4: Update `app/markets/page.tsx`
**Changes:**
1. Add `iconSrc` to `initialMarketData` objects
2. Update market rows to use `Image` component with logo path
3. Update coin detail modal to show logo

---

## Detailed Changes

### 1. hooks/usePriceSimulation.ts - Add getCoinLogo
```typescript
export function getCoinLogo(symbol: string): string {
  const logos: Record<string, string> = {
    BTC: "/btc-logo.png",
    ETH: "/eth-logo.png",
    BNB: "/bnb-logo.png",
    SOL: "/sol-logo.png",
    XRP: "/xrp-logo.png",
    ADA: "/ada-logo.png",
    DOGE: "/doge-logo.png",
    DOT: "/dot-logo.png",
  };
  return logos[symbol] || "";
}
```

### 2. app/dashboard/page.tsx - Update currencies
```typescript
const currencies = [
  { name: "Bitcoin", symbol: "BTC", price: "66.234,50 €", change: "2,34%", changeValue: "+1.512 €", marketCap: "1,3 B€", iconSrc: "/btc-logo.png", isPositive: true },
  { name: "Ethereum", symbol: "ETH", price: "3.261,80 €", change: "1,87%", changeValue: "+59,80 €", marketCap: "392 B€", iconSrc: "/eth-logo.png", isPositive: true },
  // ... rest with iconSrc
];
```

### 3. app/markets/page.tsx - Update data and rendering
Add `iconSrc` to market data objects and use Image component in JSX.

---

## Files to Modify
1. `/workspaces/broker/hooks/usePriceSimulation.ts`
2. `/workspaces/broker/app/dashboard/page.tsx`
3. `/workspaces/broker/app/markets/page.tsx`

## New Files to Create
1. `/workspaces/broker/public/doge-logo.png`
2. `/workspaces/broker/public/dot-logo.png`

---

## Testing
- Verify all crypto logos display correctly
- Check markets page list and modal
- Verify watchlist and top positions sections
- Ensure logos are properly sized and aligned

