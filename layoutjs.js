// layout.js — ROS Retail OS — inject sidebar + topbar
function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'dashboard.html';
}

function renderLayout(pageTitle) {
  const cur = getCurrentPage();
  const links = [
    { href: 'dashboard.html',  icon: 'fa-chart-pie',         label: 'Dashboard',        section: 'MAIN' },
    { href: 'products.html',   icon: 'fa-box-open',          label: 'Products',         section: null },
    { href: 'customers.html',  icon: 'fa-users',             label: 'Customers',        section: null },
    { href: 'orders.html',     icon: 'fa-receipt',           label: 'Orders',           badge: '3', section: null },
    { href: 'inventory.html',  icon: 'fa-warehouse',         label: 'Inventory',        section: 'OPERATIONS' },
    { href: 'suppliers.html',  icon: 'fa-truck',             label: 'Suppliers',        section: null },
    { href: 'reports.html',    icon: 'fa-chart-bar',         label: 'Reports',          section: 'INSIGHTS' },
    { href: 'notifications.html', icon: 'fa-bell',           label: 'Notifications',    badge: '5', section: null },
    { href: 'users.html',      icon: 'fa-user-shield',       label: 'User Management',  section: 'SETTINGS' },
    { href: 'login.html',      icon: 'fa-right-from-bracket',label: 'Logout',           section: null },
  ];

  let navHTML = '';
  let lastSection = null;
  links.forEach(link => {
    if (link.section && link.section !== lastSection) {
      navHTML += `<div class="sidebar-section-label">${link.section}</div>`;
      lastSection = link.section;
    }
    const active = cur === link.href ? 'active' : '';
    const badge = link.badge ? `<span class="nav-badge">${link.badge}</span>` : '';
    navHTML += `<a href="${link.href}" class="nav-link ${active}">
      <i class="fa ${link.icon}"></i>${link.label}${badge}
    </a>`;
  });

  const sidebar = `
  <div class="sidebar">
    <div class="sidebar-brand">
      <span class="logo-badge">ROS</span>
      <span class="brand-name">Retail OS</span>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <div class="sidebar-user">
      <div class="user-avatar">AD</div>
      <div class="user-info">
        <div class="name">Admin User</div>
        <div class="role">Super Admin</div>
      </div>
      <a href="login.html" class="user-logout"><i class="fa fa-right-from-bracket"></i></a>
    </div>
  </div>`;

  const topbar = `
  <div class="topbar">
    <div class="topbar-title">${pageTitle}</div>
    <div class="topbar-search">
      <i class="fa fa-search search-icon"></i>
      <input type="text" placeholder="Search anything…"/>
    </div>
    <div class="topbar-actions">
      <a href="notifications.html" class="icon-btn"><i class="fa fa-bell"></i><span class="badge-dot"></span></a>
      <div class="icon-btn"><i class="fa fa-gear"></i></div>
      <div class="topbar-avatar">AD</div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', sidebar);
  const wrapper = document.querySelector('.main-wrapper');
  wrapper.insertAdjacentHTML('afterbegin', topbar);
}