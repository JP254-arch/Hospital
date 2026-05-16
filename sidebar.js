/* ─────────────────────────────────────────────────
   MediCore HMS — Shared Sidebar Builder
   Call buildSidebar(activeKey) to get sidebar HTML
───────────────────────────────────────────────── */

const NAV = [
  { section: 'Overview' },
  { key: 'dashboard',    icon: 'ti-layout-dashboard', label: 'Dashboard',      href: 'dashboard.html' },
  { key: 'patients',     icon: 'ti-users',            label: 'Patients',       href: 'patients.html',     badge: '12' },
  { section: 'Departments' },
  { key: 'appointments', icon: 'ti-calendar',         label: 'Appointments',   href: 'appointments.html', badge: '12' },
  { key: 'doctors',      icon: 'ti-stethoscope',      label: 'Doctors & Staff',href: 'doctors.html' },
  { key: 'wards',        icon: 'ti-bed',              label: 'Wards & Beds',   href: 'wards.html' },
  { key: 'pharmacy',     icon: 'ti-pill',             label: 'Pharmacy',       href: 'pharmacy.html',     badge: '3' },
  { key: 'laboratory',   icon: 'ti-microscope',       label: 'Laboratory',     href: 'laboratory.html' },
  { section: 'Finance' },
  { key: 'billing',      icon: 'ti-receipt',          label: 'Billing',        href: 'billing.html',      badge: '6' },
  { key: 'reports',      icon: 'ti-chart-bar',        label: 'Reports',        href: 'reports.html' },
  { section: 'System' },
  { key: 'settings',     icon: 'ti-settings',         label: 'Settings',       href: 'settings.html' },
];

function buildSidebar(activeKey) {
  const items = NAV.map(item => {
    if (item.section) {
      return `<div class="sb-section-label">${item.section}</div>`;
    }
    const isActive = item.key === activeKey;
    const badge = item.badge ? `<span class="sb-badge">${item.badge}</span>` : '';
    return `
      <a href="${item.href}" class="sb-item${isActive ? ' active' : ''}">
        <i class="ti ${item.icon}"></i>
        ${item.label}
        ${badge}
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
