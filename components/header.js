// ORHAR — Shared Header Component
// Usage: <script>window.headerLinks = 'home';</script>
//        <script src="/components/header.js"></script>

(function() {
    function injectHeader() {
        const linkSet = window.headerLinks || 'home';
        
        const links = {
            home: `
                <a href="#story" data-i18n="nav_story">The Story</a>
                <a href="#features" data-i18n="nav_features">Features</a>
                <a href="/contact.html" data-i18n="nav_contact">Contact</a>
            `,
            contact: `
                <a href="/" data-i18n="nav_home">Home</a>
                <a href="#contact-section" data-i18n="nav_contact">Contact</a>
                <a href="#support-section" data-i18n="nav_support">Support</a>
                <a href="#faq-section" data-i18n="nav_faq">FAQ</a>
            `,
            default: `
                <a href="/" data-i18n="nav_home">Home</a>
                <a href="/contact.html" data-i18n="nav_contact">Contact</a>
            `
        };

        const headerHTML = `
        <header>
            <a href="/" class="logo-container">
                <img src="/logo.png" alt="ORHAR Logo" class="logo-img" onerror="this.style.display='none'">
                <span class="logo-text">ORHAR</span>
            </a>
            <nav class="nav-links">
                ${links[linkSet] || links.default}
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
        
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    
    // Wait for body to be ready
    if (document.body) {
        injectHeader();
    } else {
        document.addEventListener('DOMContentLoaded', injectHeader);
    }
})();
