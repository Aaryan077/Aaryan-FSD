/* ══════════════════════════════════════════════════════════════
   PORTFOLIO DEMO.JS  — all features fixed & fully working
   ══════════════════════════════════════════════════════════════ */

/* ── 1. NAVBAR SCROLL EFFECT ─────────────────────────────────── */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Active nav link highlight on scroll ──────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-pill');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active-pill', link.getAttribute('href') === `#${current}`);
  });
});

/* ── 2. HERO TYPING ANIMATION ────────────────────────────────── */
const typingEl = document.getElementById('typingText');
const phrases  = [
  'Full Stack Developer',
  'HTML Enthusiast',
  'CSS Artist',
  'JavaScript Learner',
  'Bootstrap Builder',
  'Web Developer'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
function typeLoop() {
  const current = phrases[phraseIndex];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) { delay = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0)           { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ── 3. SCROLL REVEAL ANIMATION ──────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.glass-card, .concept-card, .section-header').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── 4. VIEWPORT SIZE INDICATOR ──────────────────────────────── */
function updateViewportLabel() {
  const w = window.innerWidth;
  const label = `${w}px`;
  const el = document.getElementById('viewportLabel');
  if (el) el.textContent = label;
}
window.addEventListener('resize', updateViewportLabel);
updateViewportLabel();

/* ── 5. FULL STACK ARCHITECTURE DIAGRAM ──────────────────────── */
const layerInfoMap = {
  frontend: {
    title: '🖥️ Frontend Layer', color: '#f97316',
    desc: 'The Frontend is what the user sees and interacts with. It runs directly in the browser and is built with:',
    points: [
      '<strong>HTML</strong> — Provides the structure and content of the page',
      '<strong>CSS</strong> — Controls the visual appearance and layout',
      '<strong>JavaScript</strong> — Adds interactivity and dynamic behaviour',
      '<strong>Bootstrap</strong> — A CSS framework for faster, responsive design',
    ]
  },
  backend: {
    title: '⚙️ Backend Layer', color: '#3b82f6',
    desc: 'The Backend runs on the server and handles the application logic:',
    points: [
      '<strong>Node.js / Express</strong> — JavaScript runtime for server-side code',
      '<strong>Python / Django / Flask</strong> — Alternative backend frameworks',
      '<strong>REST APIs</strong> — Endpoints that the frontend calls to get/send data',
      '<strong>Authentication</strong> — Login, registration, session management',
    ]
  },
  db: {
    title: '🗄️ Database Layer', color: '#eab308',
    desc: 'The Database stores all application data persistently:',
    points: [
      '<strong>MySQL / PostgreSQL</strong> — Relational databases using SQL queries',
      '<strong>MongoDB</strong> — NoSQL document database storing JSON-like data',
      '<strong>CRUD Operations</strong> — Create, Read, Update, Delete data',
      '<strong>ORM</strong> — Object-Relational Mapping to work with databases in code',
    ]
  }
};
function showLayerInfo(layer) {
  const info = layerInfoMap[layer];
  const box  = document.getElementById('layerInfo');
  if (!info || !box) return;
  box.style.borderColor = info.color + '55';
  box.innerHTML = `
    <h5 style="color:${info.color};margin-bottom:8px">${info.title}</h5>
    <p style="margin-bottom:8px;color:var(--text-muted);font-size:0.9rem">${info.desc}</p>
    <ul style="margin:0;padding-left:1.2rem;color:var(--text-muted);font-size:0.85rem">
      ${info.points.map(p => `<li style="padding:3px 0">${p}</li>`).join('')}
    </ul>`;
  // Highlight active node
  document.querySelectorAll('.arch-node').forEach(n => n.classList.remove('arch-node-active'));
  const nodeEl = document.getElementById(`layer-${layer}`);
  if (nodeEl) nodeEl.querySelector('.arch-node').classList.add('arch-node-active');
}

/* ── 6. LIVE HTML EDITOR ─────────────────────────────────────── */
function runHtmlEditor() {
  const code    = document.getElementById('htmlEditor').value;
  const preview = document.getElementById('htmlPreview');
  const doc     = preview.contentDocument || preview.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();
}

/* ── 7. LIVE CSS EDITOR ──────────────────────────────────────── */
function runCssEditor() {
  const css     = document.getElementById('cssEditor').value;
  const preview = document.getElementById('cssPreview');
  const doc     = preview.contentDocument || preview.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>
    body{margin:0;display:flex;align-items:center;justify-content:center;
    min-height:100vh;background:#0a0a0f;font-family:Inter,sans-serif;}
    ${css}
  </style></head><body><div class="demo-card"><h2>CSS Card</h2>
  <p>Hover over me! Edit the CSS on the left to change my style.</p></div></body></html>`);
  doc.close();
}

/* Auto-run editors & bind live update on input */
window.addEventListener('load', () => {
  runHtmlEditor();
  runCssEditor();
  const htmlEd = document.getElementById('htmlEditor');
  const cssEd  = document.getElementById('cssEditor');
  if (htmlEd) htmlEd.addEventListener('input', runHtmlEditor);
  if (cssEd)  cssEd.addEventListener('input', runCssEditor);
});

/* ── 8. HTML FORM DEMO ───────────────────────────────────────── */
function demoFormSubmit(e) {
  e.preventDefault();
  const name   = document.getElementById('demoName').value;
  const email  = document.getElementById('demoEmail').value;
  const result = document.getElementById('formResult');
  result.innerHTML = `
    <div style="background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);
                border-radius:8px;padding:10px;color:#4ade80;margin-top:8px">
      <i class="bi bi-check-circle me-1"></i>
      Form submitted! Hello <strong>${name}</strong> (${email}) ✅
    </div>`;
  e.target.reset();
}

/* ── 9. CSS BOX MODEL DEMO ───────────────────────────────────── */
function updateBoxModel() {
  const margin  = document.getElementById('marginSlider').value;
  const padding = document.getElementById('paddingSlider').value;
  const border  = document.getElementById('borderSlider').value;
  const boxMarginEl  = document.querySelector('.box-margin');
  const boxBorderEl  = document.querySelector('.box-border');
  const boxPaddingEl = document.querySelector('.box-padding');
  // .box-margin uses padding to create the visual margin space
  if (boxMarginEl)  boxMarginEl.style.padding    = `${margin}px`;
  if (boxBorderEl)  boxBorderEl.style.borderWidth = `${border}px`;
  if (boxPaddingEl) boxPaddingEl.style.padding    = `${padding}px`;
  // Update live labels
  const mLbl = document.getElementById('marginValue');
  const pLbl = document.getElementById('paddingValue');
  const bLbl = document.getElementById('borderValue');
  if (mLbl) mLbl.textContent = margin + 'px';
  if (pLbl) pLbl.textContent = padding + 'px';
  if (bLbl) bLbl.textContent = border + 'px';
}

/* ── 11. ANIM BOX INTERACTIONS (hover + click/keyboard) ─────── */
function setupAnimBoxInteractions() {
  const boxes = document.querySelectorAll('.anim-box');
  boxes.forEach(box => {
    // Helper to clear previous color classes
    const clearColors = (el) => el.classList.remove('color-1','color-2','color-3','color-4');

    // Toggle selected state on click — apply the box's data-color class when selected
    box.addEventListener('click', (e) => {
      const willSelect = !box.classList.contains('is-selected');
      if (willSelect) {
        clearColors(box);
        const c = box.dataset.color || box.getAttribute('data-color') || '1';
        box.classList.add(`color-${c}`);
        box.classList.add('is-selected');
        box.setAttribute('aria-pressed', 'true');
      } else {
        box.classList.remove('is-selected');
        clearColors(box);
        box.setAttribute('aria-pressed', 'false');
      }
    });

    // Keyboard support: Enter or Space toggles selection
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        box.click();
      }
    });

    // Double-click clears selection
    box.addEventListener('dblclick', () => {
      box.classList.remove('is-selected');
      clearColors(box);
      box.setAttribute('aria-pressed', 'false');
    });
  });
}

window.addEventListener('load', () => {
  // existing load tasks already call runHtmlEditor/runCssEditor; ensure this runs after them
  try { setupAnimBoxInteractions(); } catch (err) { /* noop */ }
});

/* ── 10. CSS FLEXBOX DEMO ────────────────────────────────────── */
function updateFlex() {
  const justify = document.getElementById('flexJustify').value;
  const align   = document.getElementById('flexAlign').value;
  const box     = document.getElementById('flexDemo');
  if (box) { box.style.justifyContent = justify; box.style.alignItems = align; }
}
function setFlexDir(dir, btn) {
  const box = document.getElementById('flexDemo');
  if (box) box.style.flexDirection = dir;
  btn.closest('.flex-direction-group')
    .querySelectorAll('button')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── 11. LIVE JS CONSOLE ─────────────────────────────────────── */
// Use a persistent sandbox object so variables survive between runs
let jsSandbox = {};
function runJsCode() {
  const code     = document.getElementById('jsEditor').value;
  const outputEl = document.getElementById('consoleOutput');
  outputEl.innerHTML = '';
  const logs = [];
  const origLog   = console.log;
  const origError = console.error;
  const origWarn  = console.warn;
  console.log   = (...args) => { logs.push({ type:'log',  msg: args.map(formatVal).join(' ') }); origLog(...args); };
  console.error = (...args) => { logs.push({ type:'err',  msg: args.map(formatVal).join(' ') }); origError(...args); };
  console.warn  = (...args) => { logs.push({ type:'warn', msg: args.map(formatVal).join(' ') }); origWarn(...args); };
  try {
    // Wrap in a function so const/let work cleanly each run
    const fn = new Function(code);
    fn();
  } catch (err) {
    logs.push({ type:'err', msg: `❌ ${err.message}` });
  }
  console.log   = origLog;
  console.error = origError;
  console.warn  = origWarn;
  if (logs.length === 0) {
    outputEl.innerHTML = '<span class="text-muted">// No output — add console.log() calls to see results</span>';
    return;
  }
  logs.forEach(entry => {
    const line = document.createElement('span');
    line.className = `console-line${entry.type === 'err' ? ' err' : entry.type === 'warn' ? ' info' : ''}`;
    line.textContent = entry.msg;
    outputEl.appendChild(line);
    outputEl.appendChild(document.createTextNode('\n'));
  });
  outputEl.scrollTop = outputEl.scrollHeight;
}
function formatVal(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'object') { try { return JSON.stringify(val, null, 2); } catch { return String(val); } }
  return String(val);
}

/* ── 12. DOM MANIPULATION DEMO ───────────────────────────────── */
const domColors = ['#6c63ff','#f97316','#22c55e','#ec4899','#eab308','#3b82f6'];
let domColorIdx = 0, domAddCount = 0;
function domChangeText() {
  const el = document.getElementById('domTarget');
  const phrases = [
    'JavaScript changed my text! ✨',
    'DOM manipulation is powerful! 💪',
    'getElementById() found me!',
    'I was updated dynamically!',
    'Full Stack JavaScript in action! 🚀'
  ];
  const r = phrases[Math.floor(Math.random() * phrases.length)];
  el.textContent = r;
  setDomCode(`document.getElementById('domTarget')\n  .textContent = '${r}'`);
}
function domChangeColor() {
  const el    = document.getElementById('domTarget');
  const color = domColors[domColorIdx++ % domColors.length];
  el.style.color      = color;
  el.style.fontWeight = '700';
  setDomCode(`document.getElementById('domTarget')\n  .style.color = '${color}'`);
}
function domAddElement() {
  domAddCount++;
  const area  = document.getElementById('domDemoArea');
  const newEl = document.createElement('p');
  newEl.textContent = `🆕 New element #${domAddCount} added by JavaScript!`;
  newEl.style.cssText = `margin:4px 0;padding:6px 12px;background:rgba(108,99,255,0.15);border-radius:6px;font-size:0.85rem;color:#a78bfa;animation:fadeInUp 0.3s ease`;
  newEl.setAttribute('data-dynamic', 'true');
  area.appendChild(newEl);
  setDomCode(`const p = document.createElement('p');\np.textContent = 'New element #${domAddCount}';\ndocument.getElementById('domDemoArea').appendChild(p);`);
}
function domRemoveLast() {
  const area = document.getElementById('domDemoArea');
  const dynamicEls = area.querySelectorAll('[data-dynamic]');
  if (dynamicEls.length > 0) {
    dynamicEls[dynamicEls.length - 1].remove();
    setDomCode(`const els = document.querySelectorAll('[data-dynamic]');\nels[els.length - 1].remove();`);
  } else {
    setDomCode(`// No dynamic elements to remove`);
  }
}
function domReset() {
  const el = document.getElementById('domTarget');
  el.textContent  = 'I am a paragraph. Use the buttons below to change me!';
  el.style.color  = '';
  el.style.fontWeight = '';
  document.querySelectorAll('#domDemoArea [data-dynamic]').forEach(e => e.remove());
  domAddCount = 0;
  setDomCode(`document.getElementById('domTarget').textContent\n  = 'Original text...'`);
}
function setDomCode(code) {
  const el = document.getElementById('domCodeDisplay');
  if (el) el.textContent = code;
}

/* ── 13. EVENT LOG ───────────────────────────────────────────── */
function logEvent(type) {
  const list  = document.getElementById('eventLogList');
  const entry = document.createElement('div');
  entry.className = 'event-entry';
  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
  entry.innerHTML = `<span class="time">[${timeStr}]</span><span>${type}</span>`;
  const placeholder = list.querySelector('span.text-muted');
  if (placeholder) placeholder.remove();
  list.insertBefore(entry, list.firstChild);
  const entries = list.querySelectorAll('.event-entry');
  if (entries.length > 8) entries[entries.length - 1].remove();
}

/* ── 14. CALCULATOR ──────────────────────────────────────────── */
let calcExpression = '', calcLastResult = '';

// Safe math evaluator — no eval()
function safeCalc(expr) {
  // Only allow digits, operators, decimals, parentheses
  if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(expr)) throw new Error('Invalid expression');
  // Use Function constructor scoped to no global access
  return Function('"use strict"; return (' + expr + ')')();
}

function calcAction(value) {
  const exprEl = document.getElementById('calcExpression');
  const resEl  = document.getElementById('calcResult');
  document.querySelectorAll('.calc-op').forEach(b => b.classList.remove('active'));

  switch (value) {
    case 'clear':
      calcExpression = '';
      exprEl.textContent = '0';
      resEl.textContent  = '';
      break;
    case 'sign':
      if (calcExpression && calcExpression !== '0') {
        calcExpression = calcExpression.startsWith('-')
          ? calcExpression.slice(1)
          : '-' + calcExpression;
        exprEl.textContent = calcExpression;
      }
      break;
    case 'percent':
      if (calcExpression) {
        try {
          const v = safeCalc(calcExpression);
          calcExpression = String(v / 100);
          exprEl.textContent = calcExpression;
        } catch {}
      }
      break;
    case '=':
      if (calcExpression) {
        try {
          const result = safeCalc(calcExpression);
          resEl.textContent  = '= ' + calcExpression;
          calcExpression     = String(parseFloat(result.toFixed(10)));
          exprEl.textContent = calcExpression;
        } catch {
          exprEl.textContent = 'Error';
          calcExpression = '';
        }
      }
      break;
    case '+': case '-': case '*': case '/': {
      const last = calcExpression.slice(-1);
      if (['+','-','*','/'].includes(last)) calcExpression = calcExpression.slice(0, -1);
      calcExpression += value;
      exprEl.textContent = calcExpression.replace(/\*/g,'×').replace(/\//g,'÷').replace(/-/g,'−');
      const btnId = {'+':'calcAdd','-':'calcSub','*':'calcMul','/':'calcDiv'}[value];
      const activeBtn = document.getElementById(btnId);
      if (activeBtn) activeBtn.classList.add('active');
      break;
    }
    case '.': {
      const segments = calcExpression.split(/[\+\-\*\/]/);
      const lastSeg  = segments[segments.length - 1];
      if (!lastSeg.includes('.')) {
        calcExpression += calcExpression === '' ? '0.' : '.';
        exprEl.textContent = calcExpression;
      }
      break;
    }
    default: // digit
      if (calcExpression === '0' || calcExpression === 'Error') calcExpression = '';
      calcExpression += value;
      exprEl.textContent = calcExpression.replace(/\*/g,'×').replace(/\//g,'÷').replace(/-/g,'−');
      // Live preview
      try {
        const preview = safeCalc(calcExpression);
        if (!isNaN(preview) && String(preview) !== calcExpression) {
          resEl.textContent = '= ' + parseFloat(preview.toFixed(10));
        } else { resEl.textContent = ''; }
      } catch { resEl.textContent = ''; }
  }
  animateCalcBtn(value);
}

function animateCalcBtn(value) {
  const idMap = {
    '0':'calc0','1':'calc1','2':'calc2','3':'calc3','4':'calc4',
    '5':'calc5','6':'calc6','7':'calc7','8':'calc8','9':'calc9',
    '.':'calcDot','+':'calcAdd','-':'calcSub','*':'calcMul','/':'calcDiv',
    '=':'calcEq','clear':'calcClear','sign':'calcSign','percent':'calcPercent'
  };
  const btn = document.getElementById(idMap[value]);
  if (btn) {
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => { btn.style.transform = ''; }, 120);
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('calculator')) return;
  // Don't fire when typing in an input/textarea
  if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
  const keyMap = {
    '0':'0','1':'1','2':'2','3':'3','4':'4',
    '5':'5','6':'6','7':'7','8':'8','9':'9',
    '+':'+','-':'-','*':'*','/':'/',
    'Enter':'=','=':'=','Escape':'clear','Backspace':'clear','.':'.'
  };
  if (keyMap[e.key] !== undefined) {
    e.preventDefault();
    calcAction(keyMap[e.key]);
  }
});

/* ── 15. FETCH QUOTE ─────────────────────────────────────────── */
const fallbackQuotes = [
  { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { quote: "Java is to JavaScript what car is to carpet.", author: "Chris Heilmann" },
  { quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
  { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { quote: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { quote: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { quote: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
];

async function fetchQuote() {
  const btn    = document.getElementById('fetchBtn');
  const result = document.getElementById('quoteResult');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Fetching...';
  // Try multiple public APIs, fall back to local list if all fail
  const apis = [
    async () => {
      const r = await fetch('https://api.adviceslip.com/advice', { cache:'no-cache' });
      const d = await r.json();
      return { quote: d.slip.advice, author: 'Advice Slip API', fromAPI: true };
    },
    async () => {
      const r = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
      const d = await r.json();
      return { quote: d.text, author: 'Useless Facts API', fromAPI: true };
    }
  ];
  let found = false;
  for (const api of apis) {
    try {
      const data = await Promise.race([api(), new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000))]);
      showQuote(data.quote, data.author, result, true);
      found = true;
      break;
    } catch {}
  }
  if (!found) {
    const q = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    showQuote(q.quote, q.author, result, false);
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="bi bi-cloud-download me-2"></i>Fetch Another Quote';
}

function showQuote(quote, author, el, fromAPI) {
  el.innerHTML = `
    <p style="margin:0;font-size:0.92rem">"${quote}"</p>
    <p class="quote-author">— ${author}
      ${fromAPI ? '<span style="font-size:0.72rem;opacity:0.6">(via live API)</span>' : '<span style="font-size:0.72rem;opacity:0.6">(local fallback)</span>'}
    </p>`;
}

/* ── 16. CONTACT FORM ────────────────────────────────────────── */
function submitContact(e) {
  e.preventDefault();
  const btn    = document.getElementById('contactSubmitBtn');
  const result = document.getElementById('contactResult');
  const name   = document.getElementById('contactName').value;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
  result.innerHTML = '';
  setTimeout(() => {
    result.innerHTML = `
      <div style="background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.3);
                  border-radius:10px;padding:14px;color:#4ade80">
        <i class="bi bi-check-circle-fill me-2"></i>
        <strong>Message simulated!</strong> Thanks ${name}, this is a demo form — no message was actually sent. 👋
      </div>`;
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
    e.target.reset();
  }, 1500);
}

/* ── 17. SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});

/* ── 18. PARTICLE SPARKLE ON CLICK ──────────────────────────── */
document.addEventListener('click', (e) => {
  if (e.target.closest('button, a, input, textarea, select, label')) return;
  createSparkle(e.clientX, e.clientY);
});
function createSparkle(x, y) {
  const colors = ['#6c63ff','#3b82f6','#f97316','#eab308','#22c55e','#ec4899'];
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size  = Math.random() * 8 + 4;
    const dx    = Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 50 + 20);
    const dy    = Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 50 + 20);
    spark.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};pointer-events:none;z-index:9999;
      transform:translate(-50%,-50%);box-shadow:0 0 6px ${color};
      animation:sparkle-out 0.6s ease-out forwards;
      --dx:${dx}px;--dy:${dy}px;`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }
}
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkle-out {
    0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
    100% { opacity:0; transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0); }
  }`;
document.head.appendChild(sparkleStyle);

/* ── 19. SECTION COUNTER ANIMATION ──────────────────────────── */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const inc = target / 40;
  const timer = setInterval(() => {
    current += inc;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 30);
}
const statNumbers = document.querySelectorAll('.stat-number');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      [{ el: statNumbers[0], val: 5, suffix: '' },
       { el: statNumbers[1], val: 10, suffix: '+' },
       { el: statNumbers[2], val: 100, suffix: '%' }]
        .forEach(s => { if (s.el) animateCounter(s.el, s.val, s.suffix); });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

/* ── 21. BOOTSTRAP TOAST TRIGGER ─────────────────────────────── */
function showToast(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const toast = new bootstrap.Toast(el);
  toast.show();
}

function showButtonToast(message) {
  const el = document.getElementById('toastButtonAction');
  if (!el) return;
  const body = el.querySelector('.toast-body');
  if (body) body.innerHTML = `<i class="bi bi-mouse-fill me-2"></i>${message}`;
  const toast = new bootstrap.Toast(el);
  toast.show();
}

function attachBootstrapButtonDemo() {
  const container = document.getElementById('bootstrapButtonDemo');
  if (!container) return;
  container.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !container.contains(button)) return;
    const label = button.textContent.trim();
    if (!label) return;
    showButtonToast(`${label} clicked`);
  });
}

attachBootstrapButtonDemo();

function attachBootstrapNavbarDemo() {
  const navContainer = document.getElementById('demoNav');
  const statusEl = document.getElementById('demoNavStatus');
  if (!navContainer || !statusEl) return;

  navContainer.addEventListener('click', event => {
    const anchor = event.target.closest('a');
    if (!anchor || !navContainer.contains(anchor)) return;
    if (anchor.getAttribute('href') !== '#') return;

    event.preventDefault();

    const label = anchor.textContent.trim();
    if (!label) return;

    const dropdownToggle = navContainer.querySelector('.nav-link.dropdown-toggle');
    const navLinks = navContainer.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    if (anchor.closest('.dropdown-menu')) {
      if (dropdownToggle) dropdownToggle.classList.add('active');
      anchor.classList.add('active');
    } else {
      anchor.classList.add('active');
    }

    statusEl.textContent = `Selected: ${label}`;
  });
}

attachBootstrapNavbarDemo();

/* ── 22. CONSOLE EASTER EGG ──────────────────────────────────── */
console.log('%c👋 Hey Developer!', 'font-size:20px;font-weight:bold;color:#6c63ff');
console.log('%cWelcome to Aaryan\'s Portfolio Source Code!', 'font-size:14px;color:#a78bfa');
console.log('%cBuilt with ❤️ using HTML, CSS, Bootstrap & JavaScript', 'font-size:12px;color:#8b8ba7');