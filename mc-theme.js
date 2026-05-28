/* ═══════════════════════════════════════════════
   MediCore HMS — Shared Theme & Navigation System
   mc-theme.js  (include on every page)
═══════════════════════════════════════════════ */

/* ── ACCENT PALETTES ── */
const MC_ACCENTS = {
  blue:   { accent:'#185FA5', dk:'#0C447C', lt:'#E6F1FB', name:'Ocean Blue'   },
  teal:   { accent:'#0F6E56', dk:'#085a47', lt:'#E1F5EE', name:'Teal'         },
  violet: { accent:'#5B47D4', dk:'#3e31a8', lt:'#EEEDFE', name:'Violet'       },
  rose:   { accent:'#B83280', dk:'#8b2460', lt:'#FDE8F4', name:'Rose'         },
  amber:  { accent:'#B45309', dk:'#8a3d07', lt:'#FEF3CD', name:'Amber'        },
  slate:  { accent:'#475569', dk:'#334155', lt:'#F1F5F9', name:'Slate'        },
};

const MC_THEME_KEY  = 'mc-theme';
const MC_ACCENT_KEY = 'mc-accent';

/* ── APPLY THEME ── */
function mcApplyTheme(theme, accentKey) {
  const root = document.documentElement;
  theme     = theme     || localStorage.getItem(MC_THEME_KEY)  || 'light';
  accentKey = accentKey || localStorage.getItem(MC_ACCENT_KEY) || 'blue';

  root.setAttribute('data-theme',  theme);
  root.setAttribute('data-accent', accentKey);
  localStorage.setItem(MC_THEME_KEY,  theme);
  localStorage.setItem(MC_ACCENT_KEY, accentKey);

  const pal = MC_ACCENTS[accentKey] || MC_ACCENTS.blue;
  root.style.setProperty('--accent',    pal.accent);
  root.style.setProperty('--accent-dk', pal.dk);
  root.style.setProperty('--accent-lt', pal.lt);

  // update all theme-icon elements
  document.querySelectorAll('.mc-theme-icon').forEach(el => {
    el.className = el.className.replace(/ti-sun|ti-moon/, theme === 'dark' ? 'ti-sun' : 'ti-moon');
  });
  // update accent swatch active state
  document.querySelectorAll('.mc-accent-swatch').forEach(el => {
    el.classList.toggle('active', el.dataset.accent === accentKey);
  });
}

function mcToggleDark() {
  const cur = document.documentElement.getAttribute('data-theme');
  mcApplyTheme(cur === 'dark' ? 'light' : 'dark');
}

/* ── NAV DEFINITION ── */
const MC_NAV = [
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

/* ── BUILD SIDEBAR HTML ── */
function mcBuildSidebar(activeKey) {
  const items = MC_NAV.map(item => {
    if (item.section) return `<div class="sb-section-label">${item.section}</div>`;
    const active = item.key === activeKey;
    const badge  = item.badge ? `<span class="sb-badge">${item.badge}</span>` : '';
    return `<a href="${item.href}" class="sb-item${active ? ' active' : ''}">
      <i class="ti ${item.icon}"></i><span>${item.label}</span>${badge}
    </a>`;
  }).join('');

  return `
    <div class="sb-logo">
      <div class="sb-logo-icon"><i class="ti ti-building-hospital"></i></div>
      <div class="sb-logo-text">
        <div class="sb-logo-name">MediCore HMS</div>
        <div class="sb-logo-sub">Admin Portal · Rotterdam</div>
      </div>
    </div>
    <nav class="sb-nav">${items}</nav>
    <div class="sb-footer">
      <a href="settings.html" class="sb-user">
        <div class="sb-user-av">AD</div>
        <div class="sb-user-info">
          <div class="sb-user-name">Dr. Admin User</div>
          <div class="sb-user-role">System Administrator</div>
        </div>
      </a>
      <button class="sb-theme-btn" onclick="mcToggleDark()" title="Toggle dark mode">
        <i class="ti mc-theme-icon ti-moon"></i>
      </button>
    </div>`;
}

/* ── ACCENT PICKER HTML ── */
function mcBuildAccentPicker() {
  const cur = localStorage.getItem(MC_ACCENT_KEY) || 'blue';
  return Object.entries(MC_ACCENTS).map(([key, pal]) =>
    `<button class="mc-accent-swatch${key === cur ? ' active' : ''}"
      data-accent="${key}"
      style="background:${pal.accent}"
      title="${pal.name}"
      onclick="mcApplyTheme(null,'${key}')"></button>`
  ).join('');
}

/* ── TOPBAR THEME CONTROLS ── */
function mcBuildTopbarControls() {
  return `
    <div class="mc-topbar-controls">
      <div class="mc-accent-picker">${mcBuildAccentPicker()}</div>
      <button class="mc-theme-toggle" onclick="mcToggleDark()" title="Toggle dark mode">
        <i class="ti mc-theme-icon ti-moon"></i>
      </button>
    </div>`;
}

/* ── SHARED CSS (injected into <head>) ── */
const MC_SHARED_CSS = `
/* ══ THEME TOKENS ══ */
:root {
  /* Accent - overridden by JS */
  --accent:    #185FA5;
  --accent-dk: #0C447C;
  --accent-lt: #E6F1FB;

  /* Semantic status */
  --green:     #3B6D11; --green-lt:  #EAF3DE;
  --amber:     #854F0B; --amber-lt:  #FAEEDA;
  --red:       #A32D2D; --red-lt:    #FCEBEB;
  --teal:      #0F6E56; --teal-lt:   #E1F5EE;
  --gray:      #5F5E5A; --gray-lt:   #F1EFE8;

  --r:    8px;
  --r-lg: 12px;
}

/* ── LIGHT MODE ── */
[data-theme="light"] {
  --bg:      #f7f6f2;
  --card:    #ffffff;
  --card2:   #f0eeea;
  --border:  #e2e0d9;
  --text:    #1a1916;
  --muted:   #6b6a66;
  --hint:    #9b9a96;
  --shadow:  0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04);
}

/* ── DARK MODE ── */
[data-theme="dark"] {
  --bg:      #0f111a;
  --card:    #161b27;
  --card2:   #1d2335;
  --border:  #252d42;
  --text:    #dde3f5;
  --muted:   #7d89b0;
  --hint:    #3e4868;
  --shadow:  0 1px 6px rgba(0,0,0,.3), 0 4px 20px rgba(0,0,0,.2);
}

/* ── SIDEBAR ── */
.mc-sidebar {
  width: 220px; min-width: 220px;
  background: var(--card);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh;
  overflow-y: auto;
  transition: background .2s, border-color .2s;
}
.sb-logo {
  padding: 18px 16px 14px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 10px;
}
.sb-logo-icon {
  width: 32px; height: 32px;
  background: var(--accent);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: background .3s;
}
.sb-logo-icon i { color: #fff; font-size: 17px; }
.sb-logo-name { font-size: 13px; font-weight: 700; color: var(--text); }
.sb-logo-sub  { font-size: 10px; color: var(--muted); margin-top: 1px; }
.sb-section-label {
  font-size: 10px; font-weight: 700; color: var(--hint);
  letter-spacing: .1em; text-transform: uppercase;
  padding: 12px 10px 4px;
}
.sb-nav { padding: 8px; flex: 1; }
.sb-item {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 10px; border-radius: var(--r);
  font-size: 12.5px; color: var(--muted);
  text-decoration: none; margin-bottom: 2px;
  transition: all .15s;
}
.sb-item:hover { background: var(--card2); color: var(--text); }
.sb-item.active {
  background: var(--accent-lt); color: var(--accent); font-weight: 600;
}
.sb-item i { font-size: 16px; width: 18px; flex-shrink: 0; }
.sb-item span { flex: 1; }
.sb-badge {
  font-size: 10px; font-weight: 700;
  background: #E24B4A; color: #fff;
  padding: 1px 6px; border-radius: 10px;
}
.sb-footer {
  padding: 10px 8px;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; gap: 6px;
}
.sb-user {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 10px; border-radius: var(--r);
  text-decoration: none; flex: 1;
  transition: background .15s;
}
.sb-user:hover { background: var(--card2); }
.sb-user-av {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--accent); color: #fff;
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sb-user-name { font-size: 11.5px; font-weight: 600; color: var(--text); }
.sb-user-role { font-size: 10px; color: var(--muted); }
.sb-theme-btn {
  width: 30px; height: 30px; border-radius: var(--r);
  border: 1px solid var(--border); background: var(--card2);
  color: var(--muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all .15s;
}
.sb-theme-btn:hover { color: var(--text); border-color: var(--accent); }
.sb-theme-btn i { font-size: 15px; }

/* ── TOPBAR CONTROLS ── */
.mc-topbar-controls {
  display: flex; align-items: center; gap: 10px;
}
.mc-accent-picker {
  display: flex; gap: 5px; align-items: center;
}
.mc-accent-swatch {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer; transition: all .15s;
  padding: 0; outline: none;
}
.mc-accent-swatch:hover { transform: scale(1.2); }
.mc-accent-swatch.active {
  border-color: var(--text);
  transform: scale(1.15);
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px currentColor;
}
.mc-theme-toggle {
  width: 32px; height: 32px; border-radius: var(--r);
  border: 1px solid var(--border); background: var(--card2);
  color: var(--muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
}
.mc-theme-toggle:hover { color: var(--accent); border-color: var(--accent); }
.mc-theme-toggle i { font-size: 15px; }

/* ── SHARED PILLS ── */
.pill { display:inline-block; font-size:10px; padding:2px 8px; border-radius:10px; font-weight:600; }
.pill-blue   { background:var(--accent-lt);  color:var(--accent); }
.pill-green  { background:var(--green-lt);   color:var(--green);  }
.pill-amber  { background:var(--amber-lt);   color:var(--amber);  }
.pill-red    { background:var(--red-lt);     color:var(--red);    }
.pill-teal   { background:var(--teal-lt);    color:var(--teal);   }
.pill-gray   { background:var(--gray-lt);    color:var(--gray);   }

/* ── SHARED AVATAR ── */
.mc-av {
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 600; flex-shrink: 0;
}

/* ── TRANSITIONS ── */
*, *::before, *::after {
  transition: background-color .2s ease, border-color .2s ease, color .15s ease;
}
`;

/* ── INJECT CSS & INIT ON DOMCONTENTLOADED ── */
(function() {
  // Inject shared CSS
  const style = document.createElement('style');
  style.textContent = MC_SHARED_CSS;
  document.head.appendChild(style);

  // Apply saved theme immediately (before paint)
  const savedTheme  = localStorage.getItem(MC_THEME_KEY)  || 'light';
  const savedAccent = localStorage.getItem(MC_ACCENT_KEY) || 'blue';
  document.documentElement.setAttribute('data-theme', savedTheme);

  document.addEventListener('DOMContentLoaded', () => {
    mcApplyTheme(savedTheme, savedAccent);

    // Mount sidebar if placeholder exists
    const sbEl = document.getElementById('mc-sidebar');
    if (sbEl) {
      sbEl.className = 'mc-sidebar';
      sbEl.innerHTML = mcBuildSidebar(sbEl.dataset.active || '');
    }

    // Mount topbar controls if placeholder exists
    const tcEl = document.getElementById('mc-topbar-controls');
    if (tcEl) tcEl.innerHTML = mcBuildTopbarControls();
  });
})();
