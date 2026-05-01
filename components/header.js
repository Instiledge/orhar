// ORHAR — Shared Header Component
// Usage: <script src="/components/header.js"></script>

(function() {
    const currentPath = window.location.pathname;
    const depth = (currentPath.match(/\//g) || []).length;
    const prefix = depth > 0 ? '../'.repeat(depth - 1) || './' : './';
    
    // Determine active page
    const isHome = currentPath.includes('/index.html') || currentPath === '/' || currentPath.endsWith('/');
    const isContact = currentPath.includes('contact.html');
    const isUpdates = currentPath.includes('updates.html');
    
    const headerHTML = `
    <header>
        <a href="${prefix}" class="logo-container">
            <img src="${prefix}logo.png" alt="ORHAR Logo" class="logo-img" onerror="this.style.display='none'">
            <span class="logo-text">ORHAR</span>
        </a>
        <nav class="nav-links">
            <a href="${prefix}" data-i18n="nav_home"${isHome ? ' class="active"' : ''}>Home</a>
            <a href="${prefix}contact.html#contact-section" data-i18n="nav_contact"${isContact ? ' class="active"' : ''}>Contact</a>
            <a href="${prefix}updates.html" data-i18n="nav_updates"${isUpdates ? ' class="active"' : ''}>Updates</a>
            <select id="langSwitch" class="lang-select" onchange="changeLang(this.value)">
                <option value="en">🇬🇧 EN</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="es">🇪🇸 ES</option>
                <option value="de">🇩🇪 DE</option>
                <option value="it">🇮🇹 IT</option>
                <option value="pt">🇵🇹 PT</option>
                <option value="pl">🇵🇱 PL</option>
            </select>
        </nav>
    </header>`;
    
    // Insert at the very beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
})();
