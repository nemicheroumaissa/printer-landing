# Xiaomi Mini Printer – COD landing page (React + Node)

## Run
    npm run install:all
    cp server/.env.example server/.env     # fill Telegram / Sheets values
    npm run dev                            # client :5173, API :3001
Production: `npm run build && npm start` (Node serves the built client).

## Edit
- `client/src/data.js`: price, WhatsApp number, delivery fees, texts (AR/FR), baladiya lists.
- Pixels: `client/index.html` (Facebook / TikTok placeholder).
- Images: `client/public/images/` (hero, print, samples, size, lifestyle, front, angle).

## Baladiya data
`COMMUNES` only has Alger, Oran and Constantine as samples. Other wilayas show a text field.
Replace it with a full Algeria communes JSON (search GitHub for "algeria cities json") keyed by wilaya code 1-58.

## Google Sheets (Apps Script)
Sheet → Extensions → Apps Script, paste, Deploy → Web app (access: Anyone), copy URL to `SHEETS_WEBHOOK_URL`:

    function doPost(e){
      const d = JSON.parse(e.postData.contents);
      SpreadsheetApp.getActiveSheet().appendRow([d.date,d.name,d.phone,d.wilaya,d.baladiya,d.delivery,d.qty,d.total]);
      return ContentService.createTextOutput("ok");
    }
Every order is also saved in `server/orders.jsonl`.
