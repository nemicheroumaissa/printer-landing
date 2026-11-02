import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const dir = path.dirname(fileURLToPath(import.meta.url));
const { TELEGRAM_BOT_TOKEN: BOT, TELEGRAM_CHAT_ID: CHAT, SHEETS_WEBHOOK_URL: SHEET } = process.env;

app.use(cors()); app.use(express.json({ limit: "20kb" }));
app.use("/api/orders", rateLimit({ windowMs: 60_000, limit: 10 }));

app.post("/api/orders", async (req, res) => {
  const { name, phone, wilaya, baladiya, delivery, qty, price, fee, total } = req.body || {};
  const ok = typeof name === "string" && name.trim().length >= 3 && /^0[567]\d{8}$/.test(phone)
    && wilaya && baladiya && Number.isInteger(qty) && qty >= 1 && qty <= 10;
  if (!ok) return res.status(400).json({ error: "invalid" });

  const order = { date: new Date().toISOString(), name: name.trim(), phone, wilaya, baladiya,
    delivery: delivery === "desk" ? "Stop desk" : "Home", qty, price, fee, total };

  // 1) local backup so no order is ever lost
  fs.appendFileSync(path.join(dir, "orders.jsonl"), JSON.stringify(order) + "\n");

  // 2) Google Sheets + Telegram (failures are logged, never block the customer)
  const jobs = [];
  if (SHEET) jobs.push(fetch(SHEET, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) }));
  if (BOT && CHAT) {
    const text = `🛒 New order\n${order.name}\n📞 ${order.phone}\n📍 ${order.wilaya} / ${order.baladiya}\n🚚 ${order.delivery}\n📦 x${qty}\n💰 ${total} DA`;
    jobs.push(fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: CHAT, text }) }));
  }
  (await Promise.allSettled(jobs)).forEach((r) => r.status === "rejected" && console.error(r.reason));
  res.json({ ok: true });
});

// serve the built React app in production
const dist = path.join(dir, "../client/dist");
if (fs.existsSync(dist)) { app.use(express.static(dist)); app.get("*", (_, r) => r.sendFile(path.join(dist, "index.html"))); }

app.listen(process.env.PORT || 3001, () => console.log("API on :" + (process.env.PORT || 3001)));
