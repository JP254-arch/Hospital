/* ─────────────────────────────────────────────
   MediCore HMS — Shared JS (theme + sidebar + utils)
───────────────────────────────────────────── */

/* ══ THEME MANAGEMENT ══ */
const THEME_KEY  = 'mc-theme';
const ACCENT_KEY = 'mc-accent';

function applyTheme(theme, accent) {
  document.documentElement.setAttribute('data-theme',  theme  || 'light');
  document.documentElement.setAttribute('data-accent', accent || 'blue');
  localStorage.setItem(THEME_KEY,  theme  || 'light');
  localStorage.setItem(ACCENT_KEY, accent || 'blue');
  updateThemeIcons();
}

function toggleDarkMode() {
  const cur = document.documentElement.getAttribute('data-theme');
  applyTheme(cur === 'dark' ? 'light' : 'dark',
    document.documentElement.getAttribute('data-accent') || 'blue');
}

function setAccent(accent) {
  applyTheme(document.documentElement.getAttribute('data-theme') || 'light', accent);
}

function updateThemeIcons() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.js-theme-icon').forEach(el => {
    el.className = el.className.replace(/ti-\S+/, dark ? 'ti-sun' : 'ti-moon');
  });
}

function initTheme() {
  const theme  = localStorage.getItem(THEME_KEY)  || 'light';
  const accent = localStorage.getItem(ACCENT_KEY) || 'blue';
  document.documentElement.setAttribute('data-theme',  theme);
  document.documentElement.setAttribute('data-accent', accent);
  // defer icon update until DOM ready
  setTimeout(updateThemeIcons, 0);
}

// Run immediately
initTheme();

/* ══ SIDEBAR ══ */
const NAV = [
  { section: 'Overview' },
  { key:'dashboard',    icon:'ti-layout-dashboard', label:'Dashboard',       href:'dashboard.html' },
  { key:'patients',     icon:'ti-users',            label:'Patients',        href:'patients.html',     badge:'12' },
  { section: 'Departments' },
  { key:'appointments', icon:'ti-calendar',         label:'Appointments',    href:'appointments.html', badge:'12' },
  { key:'doctors',      icon:'ti-stethoscope',      label:'Doctors & Staff', href:'doctors.html' },
  { key:'wards',        icon:'ti-bed',              label:'Wards & Beds',    href:'wards.html' },
  { key:'pharmacy',     icon:'ti-pill',             label:'Pharmacy',        href:'pharmacy.html',     badge:'3' },
  { key:'laboratory',   icon:'ti-microscope',       label:'Laboratory',      href:'laboratory.html' },
  { section: 'Finance' },
  { key:'billing',      icon:'ti-receipt',          label:'Billing',         href:'billing.html',      badge:'6' },
  { key:'reports',      icon:'ti-chart-bar',        label:'Reports',         href:'reports.html' },
  { section: 'System' },
  { key:'settings',     icon:'ti-settings',         label:'Settings',        href:'settings.html' },
];

function buildSidebar(activeKey) {
  const items = NAV.map(item => {
    if (item.section) return `<span class="sb-section-label">${item.section}</span>`;
    const isActive = item.key === activeKey;
    const badge    = item.badge ? `<span class="sb-badge">${item.badge}</span>` : '';
    return `<a href="${item.href}" class="sb-item${isActive ? ' active' : ''}"><i class="ti ${item.icon}"></i>${item.label}${badge}</a>`;
  }).join('');

  return `
    <div class="sb-logo">
      <div class="sb-logo-mark"><i class="ti ti-building-hospital"></i></div>
      <div><div class="sb-logo-name">MediCore HMS</div><div class="sb-logo-sub">Admin Portal · Rotterdam</div></div>
    </div>
    <nav class="sb-nav">${items}</nav>
    <div class="sb-footer">
      <a href="settings.html" class="sb-user">
        <div class="sb-user-av">AD</div>
        <div><div class="sb-user-name">Dr. Admin User</div><div class="sb-user-role">System Administrator</div></div>
      </a>
    </div>`;
}

/* ══ TOPBAR THEME BUTTON ══ */
function buildThemeBtn() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return `<button class="theme-btn" onclick="toggleDarkMode()" title="Toggle dark mode">
    <i class="ti js-theme-icon ${dark ? 'ti-sun' : 'ti-moon'}"></i>
  </button>`;
}

/* ══ TAB / SECTION SWITCHER ══ */
function switchTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const tab = document.getElementById('tab-' + id);
  const sec = document.getElementById('sec-' + id);
  if (tab) tab.classList.add('active');
  if (sec) sec.classList.add('active');
}

/* ══ SETTINGS PANEL SWITCHER ══ */
function showPanel(id) {
  document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  const panel = document.getElementById('panel-' + id);
  const nav   = document.getElementById('snav-' + id);
  if (panel) panel.classList.add('active');
  if (nav)   nav.classList.add('active');
}

/* ══ UTILITIES ══ */
function initials(name) {
  return name.replace(/^(Dr\.|Nurse|Pharm\.)\s*/i, '').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}

const PILL_MAP = {
  'Admitted':'pill-blue','Critical':'pill-red','Discharged':'pill-green','Outpatient':'pill-amber',
  'Observation':'pill-amber','Stable':'pill-green','Monitoring':'pill-blue',
  'Confirmed':'pill-green','Pending':'pill-amber','In Progress':'pill-blue','Cancelled':'pill-red',
  'Completed':'pill-green','Ordered':'pill-gray','Sample collected':'pill-blue',
  'Processing':'pill-amber','Ready':'pill-teal','Delivered':'pill-green',
  'In Stock':'pill-green','Low Stock':'pill-amber','Out of Stock':'pill-red',
  'Paid':'pill-green','Overdue':'pill-red','Partial':'pill-blue',
  'On Duty':'pill-green','Off Duty':'pill-amber','On Leave':'pill-red',
  'STAT':'pill-red','Urgent':'pill-amber','Routine':'pill-gray',
  'Submitted':'pill-blue','Approved':'pill-green','Rejected':'pill-red',
  'Active':'pill-green','Maintenance':'pill-amber','Dispensed':'pill-green',
  'Partially dispensed':'pill-blue','Normal':'pill-green','Critical flag':'pill-red',
};
function pill(status) {
  return `<span class="pill ${PILL_MAP[status]||'pill-gray'}">${status}</span>`;
}

const AV_COLORS = [
  ['#eff6ff','#2563eb'],['#f0fdf4','#16a34a'],['#fefce8','#ca8a04'],['#fef2f2','#dc2626'],
  ['#f5f3ff','#7c3aed'],['#f0fdfa','#0d9488'],['#fff7ed','#ea580c'],['#fdf2f8','#db2777'],
];
function avatarColor(name) {
  let h = 0; for (let c of name) h = ((h<<5)-h)+c.charCodeAt(0);
  return AV_COLORS[Math.abs(h) % AV_COLORS.length];
}
function avatar(name, size='') {
  const [bg,fg] = avatarColor(name);
  return `<div class="av${size?' '+size:''}" style="background:${bg};color:${fg}">${initials(name)}</div>`;
}

function saveBtn(btn, cb) {
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="ti ti-check"></i> Saved!';
  btn.style.cssText += 'background:var(--green);border-color:var(--green);color:#fff';
  setTimeout(() => { btn.innerHTML = orig; btn.removeAttribute('style'); if(cb) cb(); }, 2000);
}
