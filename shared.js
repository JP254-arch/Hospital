/* ═══════════════════════════════════════
   MediCore HMS — shared.js
   Theme · Nav · Utils · Accent picker
═══════════════════════════════════════ */

/* ── Storage keys ── */
const MC_THEME  = 'mc-theme';
const MC_ACCENT = 'mc-accent';

/* ── Accent palette definitions ── */
const ACCENTS = [
  { key: 'blue',   label: 'Blue',   color: '#185FA5', rgb: '24,95,165'   },
  { key: 'teal',   label: 'Teal',   color: '#0F6E56', rgb: '15,110,86'   },
  { key: 'violet', label: 'Violet', color: '#5B44D4', rgb: '91,68,212'   },
  { key: 'amber',  label: 'Amber',  color: '#8B5E0A', rgb: '139,94,10'   },
  { key: 'rose',   label: 'Rose',   color: '#993556', rgb: '153,53,86'   },
];

/* ── Apply theme + accent to <html> ── */
function applyTheme(theme, accent) {
  const t = theme  || localStorage.getItem(MC_THEME)  || 'light';
  const a = accent || localStorage.getItem(MC_ACCENT) || 'blue';
  document.documentElement.setAttribute('data-theme',  t);
  document.documentElement.setAttribute('data-accent', a);
  localStorage.setItem(MC_THEME,  t);
  localStorage.setItem(MC_ACCENT, a);
  syncThemeUI(t, a);
}

function toggleDarkMode() {
  const cur = document.documentElement.getAttribute('data-theme');
  applyTheme(cur === 'dark' ? 'light' : 'dark', null);
}

function setAccent(accentKey) {
  applyTheme(null, accentKey);
}

/* ── Sync UI (icon + popover active states) ── */
function syncThemeUI(theme, accent) {
  /* moon/sun icon */
  document.querySelectorAll('.js-theme-icon').forEach(el => {
    el.className = el.className.replace(/ti-\S+/g, theme === 'dark' ? 'ti-sun' : 'ti-moon');
  });
  /* accent swatches */
  document.querySelectorAll('.accent-sw').forEach(el => {
    el.classList.toggle('active', el.dataset.accent === accent);
  });
  /* theme option pills in popover */
  document.querySelectorAll('.theme-opt').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme);
  });
}

/* ── Init (run before DOM ready is fine; setAttribute works immediately) ── */
(function initTheme() {
  const t = localStorage.getItem(MC_THEME)  || 'light';
  const a = localStorage.getItem(MC_ACCENT) || 'blue';
  document.documentElement.setAttribute('data-theme',  t);
  document.documentElement.setAttribute('data-accent', a);
})();

/* ═══════════════════════════
   NAV DATA & SIDEBAR BUILDER
═══════════════════════════ */
const NAV = [
  { section: 'Overview' },
  { key:'dashboard',    icon:'ti-layout-dashboard', label:'Dashboard',       href:'dashboard.html'    },
  { key:'patients',     icon:'ti-users',            label:'Patients',        href:'patients.html',     badge:'12' },
  { section: 'Departments' },
  { key:'appointments', icon:'ti-calendar',         label:'Appointments',    href:'appointments.html', badge:'12' },
  { key:'doctors',      icon:'ti-stethoscope',      label:'Doctors & Staff', href:'doctors.html'      },
  { key:'wards',        icon:'ti-bed',              label:'Wards & Beds',    href:'wards.html'        },
  { key:'pharmacy',     icon:'ti-pill',             label:'Pharmacy',        href:'pharmacy.html',     badge:'3'  },
  { key:'laboratory',   icon:'ti-microscope',       label:'Laboratory',      href:'laboratory.html'   },
  { section: 'Finance' },
  { key:'billing',      icon:'ti-receipt',          label:'Billing',         href:'billing.html',      badge:'6'  },
  { key:'reports',      icon:'ti-chart-bar',        label:'Reports',         href:'reports.html'      },
  { section: 'System' },
  { key:'settings',     icon:'ti-settings',         label:'Settings',        href:'settings.html'     },
];

function buildSidebar(activeKey) {
  const items = NAV.map(item => {
    if (item.section) {
      return `<span class="sb-section-label">${item.section}</span>`;
    }
    const isActive = item.key === activeKey;
    const badge = item.badge
      ? `<span class="sb-badge">${item.badge}</span>` : '';
    return `<a href="${item.href}" class="sb-item${isActive ? ' active' : ''}">
      <i class="ti ${item.icon}"></i>${item.label}${badge}
    </a>`;
  }).join('');

  return `
    <div class="sb-logo">
      <div class="sb-logo-mark"><i class="ti ti-building-hospital"></i></div>
      <div>
        <div class="sb-logo-name">MediCore HMS</div>
        <div class="sb-logo-sub">Admin Portal · Rotterdam</div>
      </div>
    </div>
    <nav class="sb-nav">${items}</nav>
    <div class="sb-footer">
      <a href="settings.html" class="sb-user">
        <div class="sb-user-av">AD</div>
        <div>
          <div class="sb-user-name">Dr. Admin User</div>
          <div class="sb-user-role">System Administrator</div>
        </div>
      </a>
    </div>`;
}

/* ═══════════════════════
   TOPBAR CONTROLS BUILDER
   Returns HTML string for theme btn + accent btn
═══════════════════════ */
function buildTopbarControls() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const curAccent = document.documentElement.getAttribute('data-accent') || 'blue';

  const swatches = ACCENTS.map(a =>
    `<div class="accent-sw${a.key === curAccent ? ' active' : ''}"
         data-accent="${a.key}"
         style="background:${a.color}"
         title="${a.label}"
         onclick="setAccent('${a.key}')"></div>`
  ).join('');

  return `
    <button class="theme-btn" onclick="toggleDarkMode()" title="Toggle dark/light mode">
      <i class="ti js-theme-icon ${dark ? 'ti-sun' : 'ti-moon'}"></i>
    </button>
    <div class="accent-picker-wrap">
      <button class="accent-btn" id="accentBtn" title="Choose accent colour" onclick="toggleAccentPicker()">
        <i class="ti ti-palette"></i>
      </button>
      <div class="accent-popover" id="accentPopover">
        <h4>Accent colour</h4>
        <div class="accent-swatches">${swatches}</div>
        <div class="accent-popover-footer">
          <div class="theme-opt${document.documentElement.getAttribute('data-theme')==='light'?' active':''}" data-theme="light" onclick="applyTheme('light',null)">☀ Light</div>
          <div class="theme-opt${document.documentElement.getAttribute('data-theme')==='dark'?' active':''}" data-theme="dark" onclick="applyTheme('dark',null)">☾ Dark</div>
        </div>
      </div>
    </div>`;
}

function toggleAccentPicker() {
  const p = document.getElementById('accentPopover');
  if (!p) return;
  p.classList.toggle('open');
  // rebuild swatches to reflect current accent
  const curAccent = document.documentElement.getAttribute('data-accent') || 'blue';
  const curTheme  = document.documentElement.getAttribute('data-theme')  || 'light';
  p.querySelector('.accent-swatches').innerHTML = ACCENTS.map(a =>
    `<div class="accent-sw${a.key === curAccent ? ' active' : ''}"
         data-accent="${a.key}"
         style="background:${a.color}"
         title="${a.label}"
         onclick="setAccent('${a.key}')"></div>`
  ).join('');
  p.querySelectorAll('.theme-opt').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === curTheme);
  });
}

/* Close popover when clicking outside */
document.addEventListener('click', e => {
  const wrap = document.querySelector('.accent-picker-wrap');
  if (wrap && !wrap.contains(e.target)) {
    const p = document.getElementById('accentPopover');
    if (p) p.classList.remove('open');
  }
});

/* ═══════════
   TAB HELPER
═══════════ */
function switchTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  document.querySelectorAll('.section').forEach(s => s.classList.remove('on'));
  const tab = document.getElementById('tab-' + id);
  const sec = document.getElementById('sec-' + id);
  if (tab) tab.classList.add('on');
  if (sec) sec.classList.add('on');
}

/* ═══════════════
   SETTINGS PANEL
═══════════════ */
function showPanel(id) {
  document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  const panel = document.getElementById('panel-' + id);
  const nav   = document.getElementById('snav-' + id);
  if (panel) panel.classList.add('active');
  if (nav)   nav.classList.add('active');
}

/* ═══════════
   UTILITIES
═══════════ */
function initials(name) {
  return name
    .replace(/^(Dr\.|Nurse|Pharm\.)\s*/i, '')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const PILL_MAP = {
  'Admitted':    'pill-blue',  'Critical':       'pill-red',   'Discharged': 'pill-green',
  'Outpatient':  'pill-amber', 'Observation':    'pill-amber', 'Stable':     'pill-green',
  'Monitoring':  'pill-blue',  'Confirmed':      'pill-green', 'Pending':    'pill-amber',
  'In Progress': 'pill-blue',  'Cancelled':      'pill-red',   'Completed':  'pill-green',
  'Ordered':     'pill-gray',  'Sample collected':'pill-blue', 'Processing': 'pill-amber',
  'Ready':       'pill-teal',  'Delivered':      'pill-green', 'In Stock':   'pill-green',
  'Low Stock':   'pill-amber', 'Out of Stock':   'pill-red',   'Paid':       'pill-green',
  'Overdue':     'pill-red',   'Partial':        'pill-blue',  'On Duty':    'pill-green',
  'Off Duty':    'pill-amber', 'On Leave':       'pill-red',   'STAT':       'pill-red',
  'Urgent':      'pill-amber', 'Routine':        'pill-gray',  'Submitted':  'pill-blue',
  'Approved':    'pill-green', 'Rejected':       'pill-red',   'Active':     'pill-green',
  'Maintenance': 'pill-amber', 'Dispensed':      'pill-green', 'Normal':     'pill-green',
  'Critical flag':'pill-red',  'Partially dispensed':'pill-blue',
};
function pill(status) {
  return `<span class="pill ${PILL_MAP[status] || 'pill-gray'}">${status}</span>`;
}

const AV_COLORS = [
  ['#eff6ff','#2563eb'],['#f0fdf4','#16a34a'],['#fefce8','#ca8a04'],['#fef2f2','#dc2626'],
  ['#f5f3ff','#7c3aed'],['#f0fdfa','#0d9488'],['#fff7ed','#ea580c'],['#fdf2f8','#db2777'],
];
function avatarColor(name) {
  let h = 0;
  for (const c of name) h = ((h << 5) - h) + c.charCodeAt(0);
  return AV_COLORS[Math.abs(h) % AV_COLORS.length];
}
function avatar(name, cls = '') {
  const [bg, fg] = avatarColor(name);
  return `<div class="av${cls ? ' ' + cls : ''}" style="background:${bg};color:${fg}">${initials(name)}</div>`;
}

function saveBtn(btn, cb) {
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="ti ti-check"></i> Saved!';
  btn.style.cssText += 'background:var(--green);border-color:var(--green);color:#fff';
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.removeAttribute('style');
    if (cb) cb();
  }, 2000);
}

/* ═══════════════════════════════════════
   BOOT: inject sidebar + topbar controls
   Call this after DOM is ready:
     initPage('dashboard')
═══════════════════════════════════════ */
function initPage(activeKey) {
  /* Sync theme (already set on <html> by initTheme above) */
  const t = localStorage.getItem(MC_THEME)  || 'light';
  const a = localStorage.getItem(MC_ACCENT) || 'blue';
  syncThemeUI(t, a);

  /* Build sidebar */
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.innerHTML = buildSidebar(activeKey);

  /* Inject topbar controls before </topbar> if placeholder exists */
  const tbCtrl = document.getElementById('topbar-controls');
  if (tbCtrl) tbCtrl.innerHTML = buildTopbarControls();
}
