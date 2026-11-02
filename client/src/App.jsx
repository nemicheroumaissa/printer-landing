import { useEffect, useState } from "react";
import { T, WILAYAS, COMMUNES, PRICE, OLD_PRICE, WHATSAPP, feeFor } from "./data";

const API = import.meta.env.VITE_API_URL || "";
const img = (n) => `/images/${n}.jpg`;
const fmt = (n) => n.toLocaleString("fr-DZ");
const toForm = () => document.getElementById("order").scrollIntoView({ behavior: "smooth" });

function useCountdown() {
  const left = () => { const n = new Date(), e = new Date(n); e.setHours(24, 0, 0, 0); return Math.floor((e - n) / 1000); };
  const [s, setS] = useState(left());
  useEffect(() => { const t = setInterval(() => setS(left()), 1000); return () => clearInterval(t); }, []);
  const p = (x) => String(x).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

function OrderForm({ t, lang }) {
  const [f, setF] = useState({ name: "", phone: "", wilaya: "", baladiya: "", delivery: "home", qty: 1 });
  const [err, setErr] = useState(""), [busy, setBusy] = useState(false), [done, setDone] = useState(false);
  const set = (k, v) => setF((o) => ({ ...o, [k]: v }));
  const w = WILAYAS.find((x) => x.code === +f.wilaya);
  const communes = COMMUNES[f.wilaya];
  const fee = w ? feeFor(w.code, f.delivery) : 0;
  const total = PRICE * f.qty + fee;

  async function submit(e) {
    e.preventDefault();
    if (f.name.trim().length < 3) return setErr(t.errName);
    if (!/^0[567]\d{8}$/.test(f.phone)) return setErr(t.errPhone);
    if (!w || !f.baladiya.trim()) return setErr(t.errSel);
    setErr(""); setBusy(true);
    try {
      const r = await fetch(`${API}/api/orders`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, wilaya: `${w.code} - ${w.fr}`, price: PRICE, fee, total }),
      });
      if (!r.ok) throw new Error();
      setDone(true);
    } catch { setErr(t.errSrv); } finally { setBusy(false); }
  }

  if (done) return <div className="card ok" role="status">{t.ok}</div>;
  return (
    <form className="card form" onSubmit={submit} noValidate>
      <input placeholder={t.name} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
      <input placeholder={t.phone} value={f.phone} inputMode="numeric" maxLength={10} dir="ltr"
        onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))} autoComplete="tel" />
      <select value={f.wilaya} onChange={(e) => setF({ ...f, wilaya: e.target.value, baladiya: "" })}>
        <option value="">{t.wilaya}: {t.choose}</option>
        {WILAYAS.map((x) => <option key={x.code} value={x.code}>{String(x.code).padStart(2, "0")} - {x[lang]}</option>)}
      </select>
      {communes ? (
        <select value={f.baladiya} onChange={(e) => set("baladiya", e.target.value)}>
          <option value="">{t.baladiya}: {t.choose}</option>
          {communes.map((c) => <option key={c}>{c}</option>)}
        </select>
      ) : <input placeholder={t.baladiya} value={f.baladiya} onChange={(e) => set("baladiya", e.target.value)} />}
      <div className="seg">
        {["home", "desk"].map((d) => (
          <label key={d} className={f.delivery === d ? "on" : ""}>
            <input type="radio" name="d" checked={f.delivery === d} onChange={() => set("delivery", d)} />{t[d]}
          </label>
        ))}
      </div>
      <div className="qty">
        <span>{t.qty}</span>
        <button type="button" aria-label="-" onClick={() => set("qty", Math.max(1, f.qty - 1))}>−</button>
        <b>{f.qty}</b>
        <button type="button" aria-label="+" onClick={() => set("qty", Math.min(10, f.qty + 1))}>+</button>
      </div>
      <dl className="sum">
        <div><dt>{t.product}</dt><dd>{fmt(PRICE * f.qty)} {t.da}</dd></div>
        <div><dt>{t.delivery}</dt><dd>{w ? `${fmt(fee)} ${t.da}` : "—"}</dd></div>
        <div className="tot"><dt>{t.total}</dt><dd>{fmt(total)} {t.da}</dd></div>
      </dl>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="buy pulse" disabled={busy}>{busy ? t.sending : t.buy}</button>
      <small>{t.pay}</small>
    </form>
  );
}

export default function App() {
  const [lang, setLang] = useState("ar");
  const [bar, setBar] = useState(false);
  const t = T[lang], timer = useCountdown();
  const off = Math.round((1 - PRICE / OLD_PRICE) * 100);
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = t.dir; }, [lang]);
  useEffect(() => { const on = () => setBar(scrollY > 700); addEventListener("scroll", on); return () => removeEventListener("scroll", on); }, []);
  const gallery = ["print", "samples", "size", "lifestyle", "front", "angle"];

  return (
    <>
      <header className="top">
        <b className="logo">Mini Printer</b>
        <div>
          <button className="lang" onClick={() => setLang(lang === "ar" ? "fr" : "ar")}>{t.lang}</button>
          <button className="buy sm" onClick={toForm}>{t.order}</button>
        </div>
      </header>

      <section className="hero">
        <img src={img("hero")} alt="Xiaomi Mini Photo Printer" fetchpriority="high" />
        <div>
          <h1>{t.h1}</h1>
          <p className="sub">{t.sub}</p>
          <p className="price"><b>{fmt(PRICE)} {t.da}</b> <s>{fmt(OLD_PRICE)} {t.da}</s> <span className="badge">-{off}% {t.off}</span></p>
          <button className="buy pulse" onClick={toForm}>{t.buy}</button>
          <ul className="trust">{t.trust.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </section>

      <section className="sec">
        <h2>{t.bTitle}</h2>
        <div className="grid4">{t.ben.map(([h, p]) => <div className="card" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
      </section>

      <section className="sec">
        <h2>{t.hTitle}</h2>
        <ol className="steps">
          {[["print", 0], ["samples", 1], ["lifestyle", 2]].map(([n, i]) => (
            <li key={n}><img loading="lazy" src={img(n)} alt="" /><span>{i + 1}</span><p>{t.steps[i]}</p></li>
          ))}
        </ol>
      </section>

      <section className="sec">
        <h2>{t.gTitle}</h2>
        <div className="slider">{gallery.map((n) => <img key={n} loading="lazy" src={img(n)} alt="Xiaomi Mini Photo Printer" />)}</div>
      </section>

      <section className="sec narrow">
        <h2>{t.sTitle}</h2>
        <table className="specs"><tbody>{t.specs.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>
      </section>

      <section className="sec">
        <h2>{t.rTitle}</h2>
        <div className="grid3">{t.reviews.map(([n, w, c]) => (
          <div className="card" key={n}><div className="stars" aria-label="5/5">★★★★★</div><p>{c}</p><b>{n}</b> <small>{w}</small></div>
        ))}</div>
      </section>

      <section className="sec narrow">
        <h2>{t.fTitle}</h2>
        {t.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </section>

      <section className="sec narrow" id="order">
        <h2>{t.formTitle}</h2>
        <OrderForm t={t} lang={lang} />
      </section>

      <section className="cta">
        <p>{t.timer}</p><b dir="ltr">{timer}</b>
        <button className="buy" onClick={toForm}>{t.buy}</button>
      </section>

      <footer>
        <a href={`https://wa.me/${WHATSAPP}`}>{t.contact}: WhatsApp</a>
      </footer>

      <a className="wa" href={`https://wa.me/${WHATSAPP}`} aria-label="WhatsApp">WA</a>
      {bar && <div className="bar"><b>{fmt(PRICE)} {t.da}</b><button className="buy sm" onClick={toForm}>{t.buy}</button></div>}
    </>
  );
}
