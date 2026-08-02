# Cryptonite — Crypto Analyzer

A single-page React application for tracking cryptocurrency markets in real time.

- **GitHub repository:** https://github.com/RonKadouri/crypto-analyzer
- **Live site:** https://crypto-analyzer-ecru.vercel.app

## Pages

- **Home** — the 100 most popular coins as cards (icon, symbol, name), with live
  search by name or symbol, a **More Info** button showing the current price in
  USD / EUR / ILS, and a **Switch** to mark up to five coins to follow
  (persisted across browser sessions).
- **Reports** — one live report for all marked coins: a single batched API call
  per second returns all their USD prices at once and updates the chart.
- **Recommendations** — for each marked coin, an AI advisor (ChatGPT) receives
  the coin's current market data and answers whether it is worth buying, with an
  explanation.
- **About** — the project and the developer.

## Tech

React 19 · TypeScript · Redux Toolkit · React Router · Material UI · Chart.js · Axios · Vite

APIs: [CoinGecko](https://www.coingecko.com/en/api) (coin list, details, market
data) · [CryptoCompare](https://min-api.cryptocompare.com/) (live prices) ·
[OpenAI](https://platform.openai.com/) (recommendations)

## Running locally

```bash
npm install
npm run dev
```

API keys are **not** committed — copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

```
VITE_CRYPTOCOMPARE_API_KEY=<your key>   # https://developers.coindesk.com/
VITE_OPENAI_API_KEY=<your key>          # https://platform.openai.com/api-keys
```

## Developer

**Ron Kadouri** — Ron@xi-md.com
