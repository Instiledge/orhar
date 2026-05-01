// ORHAR — Shared Footer Component
// Usage: <script src="/components/footer.js"></script>

(function() {
    function injectFooter() {
        const footerHTML = `
        <footer>
            <div class="footer-content">
                <div class="footer-brand">
                    <h2>ORHAR</h2>
                    <p data-i18n="foot_made">Made with ❤️ for the life of prayer.</p>
                </div>
                <div class="footer-links">
                    <a href="/privacy.html" data-i18n="foot_priv">Privacy Policy</a>
                    <a href="/terms.html" data-i18n="foot_terms">Terms of Service</a>
                    <a href="/licenses.html" data-i18n="foot_lic">Open Source Licenses</a>
                    <a href="/contact.html" data-i18n="nav_contact">Contact Us</a>
                    <a href="https://github.com/Instiledge/orhar" target="_blank" rel="noopener" class="github-link">
                        <i class="fab fa-github"></i> Open Source
                    </a>
                </div>
            </div>
            <div class="copyright">
                &copy; 2026 ORHAR. <span data-i18n="foot_rights">All Rights Reserved.</span><br>
                <span data-i18n="foot_verse">"Your word is a lamp to my feet, a light to my path." — Psalm 119:105</span>
            </div>
        </footer>`;
        
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
    
    if (document.body) {
        injectFooter();
    } else {
        document.addEventListener('DOMContentLoaded', injectFooter);
    }
})();
