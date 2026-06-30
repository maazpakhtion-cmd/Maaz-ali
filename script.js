/* ===================================================
   PORTFOLIO — SHARED JAVASCRIPT
   =================================================== */

/* ── Theme ── */
(function () {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const html  = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next  = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

/* ── Mobile menu ── */
function toggleMenu() { document.getElementById('mobileMenu')?.classList.toggle('open'); }
function closeMenu()  { document.getElementById('mobileMenu')?.classList.remove('open'); }

/* ── Scroll progress ── */
function initScrollProgress() {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
}

/* ── Active nav link ── */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

/* ── Reveal on scroll ── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── Skill bars ── */
function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = (bar.dataset.pct || 0) + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.skills-section').forEach(el => obs.observe(el));
}

/* ── Contact form ── */
function handleContactSubmit() {
  const msg = document.getElementById('formMsg');
  if (msg) { msg.style.display = 'block'; }
}

/* ── Project search & filter ── */
function filterProjects() {
  const q   = (document.getElementById('projectSearch')?.value || '').toLowerCase();
  const tab = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
  document.querySelectorAll('.project-card').forEach(card => {
    const title   = (card.dataset.title || '').toLowerCase();
    const tagText = Array.from(card.querySelectorAll('.project-tag')).map(t => t.textContent.toLowerCase()).join(' ');
    const matchQ   = title.includes(q) || tagText.includes(q);
    const matchTab = tab === 'all' || tagText.includes(tab.toLowerCase());
    card.style.display = (matchQ && matchTab) ? '' : 'none';
  });
}

function initFilterTabs() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterProjects();
    });
  });
}

/* ── Chat widget ── */
const chatKB = {
  skills:      "I'm strongest in Power BI ⭐⭐⭐⭐⭐ and Excel ⭐⭐⭐⭐⭐, with solid Python ⭐⭐⭐⭐☆ and SQL ⭐⭐⭐⭐☆ skills too!",
  project:     "I've built dashboards on Mobile Sales, HR Analytics, Ski Resort, FIFA World Cup, and more. Check the Projects page!",
  contact:     "Reach me via email, LinkedIn, or the contact form on the Contact page. I reply within 24 hours! 📬",
  certificate: "I hold certs from Google, Microsoft, IBM, and Coursera in Data Analytics, Power BI, Python, SQL, and Excel.",
  hire:        "I'm open to freelance, part-time, or full-time data analyst roles. Let's talk — use the Contact page!",
  hello:       "Hello! 👋 Great to meet you. I'm your portfolio assistant. Ask me about skills, projects, or how to reach out.",
  hi:          "Hi there! 😊 How can I help you explore this portfolio?",
  powerbi:     "Power BI is my top skill! I build interactive dashboards with DAX, drill-throughs, and custom visuals.",
  python:      "I use Python for EDA, data cleaning, automation, and visualizations with Pandas, Matplotlib, and Seaborn.",
  sql:         "I write SQL for extraction, joins, aggregations, and reporting from MySQL and PostgreSQL.",
  excel:       "Excel is my bread and butter — Pivot Tables, Power Query, VBA macros, and advanced formulas.",
  resume:      "You can download my CV from the Home page or the Certificates page. Check the Download CV button!",
};

function toggleChat() {
  const box = document.getElementById('chatBox');
  if (!box) return;
  box.classList.toggle('open');
  if (box.classList.contains('open')) document.getElementById('chatInput')?.focus();
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msgs  = document.getElementById('chatMsgs');
  if (!input || !msgs) return;
  const msg = input.value.trim();
  if (!msg) return;

  msgs.innerHTML += `<div class="chat-msg user">${msg}</div>`;
  input.value = '';
  const typing = document.createElement('div');
  typing.className = 'chat-typing'; typing.textContent = '● typing…';
  msgs.appendChild(typing); msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    msgs.removeChild(typing);
    const lower = msg.toLowerCase();
    let reply = "Feel free to explore the site, or use the Contact page to reach me directly. 😊";
    for (const [key, val] of Object.entries(chatKB)) {
      if (lower.includes(key)) { reply = val; break; }
    }
    msgs.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 700);
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  // set theme button icon
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';

  setActiveNav();
  initScrollProgress();
  initReveal();
  initSkillBars();
  initFilterTabs();

  // chat enter key
  document.getElementById('chatInput')?.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendChat();
  });
});
