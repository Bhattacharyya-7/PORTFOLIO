/* ============ EDIT YOUR CONTENT HERE ============ */
const CONTACT = {
  email: "titlit24012004@gmail.com",
  whatsapp: "919830259430", // country code 91 + number, digits only (leave "" to hide)
  instagram: "https://www.instagram.com/debanjali.bhattacharjee07/",
  linkedin: "",   // full profile URL (optional)
  github: "https://github.com/Bhattacharyya-7"
};
const CV_FILE = "cv/Debanjali_Bhattacharjee_CV.pdf";
const CV_PAGE = "cv.html";

const PROJECTS = [
  { title: "Website experience", tag: "Hands-on web work",
    text: "Hands-on experience with a live website.",
    url: "https://santipurrash.infinityfree.io/", label: "Visit website" },
  { title: "This portfolio", tag: "Personal project",
    text: "My personal portfolio, written in plain HTML, CSS and JavaScript.",
    url: "https://debanjalibhattacharjee.netlify.app/", label: "Visit portfolio" }, // update URL when you deploy this version
  /*{ title: "Your next project", tag: "Placeholder",
    text: "Not yet built. Add a new item to PROJECTS in script.js.", placeholder: true }*/
];
/* ================================================ */

const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };

// Projects
const pl = $("#projects");
PROJECTS.forEach(p => {
  const li = el("li", p.placeholder ? "proj ghost" : "proj");
  li.append(el("span", "ptag", p.tag), el("h3", "", p.title), el("p", "", p.text));
  if (p.url) { const a = el("a", "plink", p.label + " <span class='sr'>(opens in a new tab)</span>"); a.href = p.url; a.target = "_blank"; a.rel = "noopener noreferrer"; li.append(a); }
  pl.append(li);
});

// Contact, social and CV
const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c0 3.500 3 6.500 6.500 6.500l1-1.500-2-1-1 .8c-1-.4-2-1.400-2.400-2.400l.8-1-1-2z"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.500-4-2-6-2.500m12 5v-3.500c0-1 .1-1.400-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1.100-.3-3.500 1.300a12 12 0 0 0-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.500 7l8.500 6 8.500-6"/></svg>'
};
const waLink = n => "https://wa.me/" + String(n).replace(/\D/g, "");
const socials = [];
if (CONTACT.instagram) socials.push({ k: "instagram", short: "Instagram", label: "Instagram (opens in a new tab)", href: CONTACT.instagram, ext: true });
if (CONTACT.whatsapp) socials.push({ k: "whatsapp", short: "WhatsApp", label: "Message on WhatsApp (opens in a new tab)", href: waLink(CONTACT.whatsapp), ext: true });
if (CONTACT.github) socials.push({ k: "github", short: "GitHub", label: "GitHub (opens in a new tab)", href: CONTACT.github, ext: true });
if (CONTACT.email) socials.push({ k: "mail", short: "Email", label: "Send an email", href: "mailto:" + CONTACT.email });
document.querySelectorAll(".social").forEach(ul => socials.forEach(o => {
  const li = el("li"), a = el("a", "", ICONS[o.k]);
  a.href = o.href; a.setAttribute("aria-label", o.label); a.title = o.label.replace(" (opens in a new tab)", "");
  if (o.ext) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  if (ul.classList.contains("tiles")) a.append(el("span", "", o.short));
  li.append(a); ul.append(li);
}));

const act = $("#contact-actions");
if (CONTACT.email) { const b = el("a", "btn primary", "Send me an email"); b.href = "mailto:" + CONTACT.email; act.append(b); }
if (CONTACT.whatsapp) { const b = el("a", "btn", "Message on WhatsApp"); b.href = waLink(CONTACT.whatsapp); b.target = "_blank"; b.rel = "noopener noreferrer"; act.append(b); }

document.querySelectorAll(".cv-view").forEach(a => { a.href = CV_PAGE; });
document.querySelectorAll(".cv-dl").forEach(a => { a.href = CV_FILE; a.setAttribute("download", "Debanjali_Bhattacharjee_CV.pdf"); });

// Hero photo: gentle mouse parallax (desktop pointers only, never with reduced motion)
const fig = $(".hero");
if (fig && matchMedia("(hover:hover) and (pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
  let raf = 0;
  addEventListener("pointermove", e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      fig.style.setProperty("--px", ((e.clientX / innerWidth - .5) * -14).toFixed(1) + "px");
      fig.style.setProperty("--py", ((e.clientY / innerHeight - .5) * -10).toFixed(1) + "px");
    });
  }, { passive: true });
}


// Contact form: Netlify Forms when deployed; opens your email app otherwise
const form = $("#form");
form.addEventListener("submit", async e => {
  e.preventDefault();
  const st = $("#fstatus"), d = new FormData(form);
  const mail = () => openMail("Portfolio message from " + d.get("name"), d.get("message") + "\n\n" + d.get("name") + " (" + d.get("email") + ")");
  try {
    const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(d).toString() });
    if (!r.ok) throw 0;
    st.textContent = "Thank you, your message was sent."; form.reset();
  } catch { st.textContent = "Opening your email instead."; mail(); }
});

// Email: mailto only works if a mail app is set up, so on desktop open Gmail in the browser instead
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const openMail = (subject = "", body = "") => {
  if (isMobile) { location.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body); return; }
  window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(CONTACT.email) + "&su=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body), "_blank", "noopener");
};
document.querySelectorAll('a[href^="mailto:"]').forEach(a => a.addEventListener("click", e => { if (!isMobile) { e.preventDefault(); openMail(); } }));
if (CONTACT.email && navigator.clipboard) {
  const cp = el("button", "btn copy", "Copy email address"); cp.type = "button";
  cp.addEventListener("click", async () => { try { await navigator.clipboard.writeText(CONTACT.email); cp.textContent = "Copied: " + CONTACT.email; } catch { cp.textContent = CONTACT.email; } });
  $("#contact-actions").append(cp);
}

$("#year").textContent = new Date().getFullYear();

// Mobile menu
const burger = $("#burger"), nav = $("#nav");
const setMenu = o => { nav.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// Progress bar + active link
const bar = $("#bar"), links = [...document.querySelectorAll("#menu a")];
const onScroll = () => {
  const h = document.documentElement;
  nav.classList.toggle("solid", h.scrollTop > 40);
  document.documentElement.style.setProperty("--sy", Math.min(h.scrollTop, innerHeight) / innerHeight);
  bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => { const on = l.hash === "#" + e.target.id; l.classList.toggle("active", on); on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"); });
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => io.observe(s));
