// ==UserScript==
// @name         Colleague Quick Search (Multi-Code)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Automates Colleague form search for multiple codes.
// @match        YourURLhere.ca*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. MASTER CONFIGURATION
    // Edit this list to add/change buttons and shortcuts
    const searchCommands = [
        { key: 'Numpad1', label: 'APPN', color: '#00539b' }, // Blue
        { key: 'Numpad2', label: 'XDSM', color: '#007a33' }, // Forest Green
        { key: 'Numpad3', label: 'DADD', color: '#c8102e' }, // Crimson
        { key: 'Numpad4', label: 'NAE',  color: '#5e35b1' }, // Deep Purple
        { key: 'Numpad5', label: 'EPRG', color: '#fb8c00' }, // Orange
        { key: 'Numpad6', label: 'OUAC', color: '#00acc1' }, // Cyan
        { key: 'Numpad7', label: 'ITCI', color: '#43a047' }  // Green
    ];

    // 2. CORE SEARCH ENGINE
    function executeColleagueSearch(formCode) {
        console.log(`⚙️ Searching: ${formCode}`);
        const searchBtn = document.getElementById('btnFormSearch');
        if (!searchBtn) return;

        searchBtn.click();

        setTimeout(() => {
            const inputBox = document.getElementById('form-search');
            if (inputBox) {
                inputBox.focus();
                inputBox.value = formCode;
                inputBox.dispatchEvent(new Event('input', { bubbles: true }));
                inputBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
            }
        }, 300);
    }

    // 3. GENERATE THE VERTICAL TOOLBAR
    (function createToolbar() {
        const tray = document.createElement('div');
        Object.assign(tray.style, {
            position: 'fixed', top: '15%', right: '15px', zIndex: '10000',
            display: 'flex', flexDirection: 'column', gap: '6px',
            padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)', borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        });

        searchCommands.forEach(item => {
            const btn = document.createElement('button');
            btn.innerHTML = item.label;
            Object.assign(btn.style, {
                padding: '8px 12px', backgroundColor: item.color, color: 'white',
                border: 'none', borderRadius: '6px', cursor: 'pointer',
                fontSize: '11px', fontWeight: 'bold', transition: 'all 0.1s'
            });

            btn.onclick = () => executeColleagueSearch(item.label);
            btn.onmouseover = () => btn.style.filter = 'brightness(1.2)';
            btn.onmouseout = () => btn.style.filter = 'brightness(1.0)';

            tray.appendChild(btn);
        });

        document.body.appendChild(tray);
    })();

    // 4. KEYBOARD SHORTCUT LISTENER
    window.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey) {
            const match = searchCommands.find(cmd => cmd.key === e.code);
            if (match) {
                e.preventDefault();
                executeColleagueSearch(match.label);
            }
        }
    });

    console.log("🟢 Colleague Command Center Active (Numpad 1-7)");
})();
