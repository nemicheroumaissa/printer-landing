# Xiaomi Mini Photo Printer: Cash-on-Delivery Landing Page

A mobile-first, single-page sales site for a portable photo printer, built for the Algerian cash-on-delivery (COD) market. Customers fill in a short order form, and the order arrives on Telegram and in Google Sheets.

![Preview](docs/screenshot.png)

## Features

- **Bilingual:** Arabic (RTL) by default, French with one click. Direction and fonts switch automatically.
- **Algerian order form:** full name, phone validation (`05` / `06` / `07` + 8 digits), all **58 wilayas**, baladiya selector, home or stop-desk delivery, quantity selector.
- **Live order summary:** product price + delivery fee (depends on the wilaya and delivery type) = total.
- **Conversion elements:** sticky header, hero with discount badge, trust points, mobile bottom "Buy Now" bar, floating WhatsApp button, daily countdown, FAQ, reviews, swipe gallery.
- **Order handling:** every order is validated on the server, saved locally (`orders.jsonl`), sent to **Telegram**, and optionally appended to **Google Sheets**.
- **Basic protection:** server-side validation and rate limiting (10 requests per minute per IP).
- **Accessible and fast:** lazy-loaded images, visible keyboard focus, reduced-motion support.

## Tech stack

| Part | Tools |
|---|---|
| Front end | React 18, Vite 5, plain CSS |
| Back end | Node.js 20+, Express 4, `cors`, `express-rate-limit` |
| Integrations | Telegram Bot API, Google Apps Script (Sheets) |
| Hosting | Render (or any Node host) |

## Project structure

```
printer-landing/
├── client/                 # React app (Vite)
│   ├── public/images/      # product photos
│   └── src/
│       ├── App.jsx         # page sections + order form
│       ├── data.js         # price, fees, wilayas, communes, AR/FR texts
│       └── styles.css
├── server/
│   ├── index.js            # POST /api/orders, serves the built client
│   └── .env.example        # variables to fill in
└── package.json            # scripts for both parts
```

## Getting started

Requires **Node.js 20 or newer** (`node -v`).

```bash
git clone https://github.com/nemicheroumaissa/printer-landing.git
cd printer-landing
npm run install:all
cp server/.env.example server/.env    # then fill in the values
npm run dev
```

The site opens on `http://localhost:5173` and the API runs on `http://localhost:3001`.

## Environment variables

Set these in `server/.env` locally, or in your host's dashboard in production.

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Recommended | Token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Recommended | Your numeric chat id (send a message to your bot, then open `https://api.telegram.org/bot<TOKEN>/getUpdates`) |
| `SHEETS_WEBHOOK_URL` | Optional | URL of the Google Apps Script web app (see below) |
| `PORT` | Local only | Defaults to `3001`. Do not set it on Render. |

Never commit `server/.env`. It is already listed in `.gitignore`.

## Customize

Everything you will usually change is in `client/src/data.js`:

- `PRICE` and `OLD_PRICE` (in DA)
- `WHATSAPP` number (country code, no `+`)
- `FEE_NORTH` and `FEE_SOUTH` delivery fees, and the list of southern wilayas
- Arabic and French texts, reviews, FAQ and specs
- `COMMUNES`: baladiya lists keyed by wilaya code (1 to 58). Wilayas without an entry show a free-text field.

Other places:

- Facebook / TikTok pixel: placeholder in `client/index.html`
- Product photos: `client/public/images/`
- Colors: CSS variables at the top of `client/src/styles.css`

## Google Sheets (optional)

1. Create a Google Sheet, then **Extensions > Apps Script**.
2. Paste the script below and **Deploy > New deployment > Web app** (access: *Anyone*).
3. Copy the web app URL into `SHEETS_WEBHOOK_URL`.

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow(
    [d.date, d.name, d.phone, d.wilaya, d.baladiya, d.delivery, d.qty, d.total]
  );
  return ContentService.createTextOutput("ok");
}
```

## Deploy on Render

1. Push this repo to GitHub.
2. On [Render](https://render.com): **New > Web Service**, choose the repo.
3. Settings:
   - **Build command:** `npm run install:all && npm run build`
   - **Start command:** `npm start`
4. Environment variables: `NODE_VERSION=20`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (and `SHEETS_WEBHOOK_URL` if used).
5. Deploy. The Node server serves the built React app and the API from the same URL.

On Render's free plan the service sleeps when idle and its disk is not permanent, so rely on Telegram and Google Sheets for your orders and not on `orders.jsonl`.

## API

`POST /api/orders`

```json
{
  "name": "Full Name",
  "phone": "0555123456",
  "wilaya": "31 - Oran",
  "baladiya": "Bir El Djir",
  "delivery": "home",
  "qty": 1,
  "price": 8900,
  "fee": 600,
  "total": 9500
}
```

Returns `{ "ok": true }`, or `400` if validation fails.

## Roadmap

- [ ] Full baladiya list for all 58 wilayas
- [ ] Carrier delivery fees per wilaya (Yalidine, ZR Express...)
- [ ] Order status page and admin view
- [ ] Facebook Conversions API for ad tracking
- [ ] Persistent database (SQLite or PostgreSQL)

## Notes

Xiaomi and Mi are trademarks of their owners. Product photos are included for demonstration. Replace them with images you have the right to use before running ads.