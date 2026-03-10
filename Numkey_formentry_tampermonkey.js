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

    console.log("🟢 Colleague Multi-Search Script Loaded!");

    // Use 'formCode' here so the function knows what to type
    function executeColleagueSearch(formCode) {
        console.log(`Executing search sequence for: ${formCode}`);

        const searchBtn = document.getElementById('btnFormSearch');
        if (!searchBtn) {
            console.error("❌ Could NOT find the Form Search button.");
            return;
        }

        searchBtn.click();

        setTimeout(() => {
            const inputBox = document.getElementById('form-search');

            if (inputBox) {
                inputBox.focus();

                // Inject the specific code passed into the function
                inputBox.value = formCode;

                inputBox.dispatchEvent(new Event('input', { bubbles: true }));
                inputBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));

                console.log(`✅ Search executed successfully for ${formCode}!`);
            } else {
                console.error("❌ Could NOT find the input box.");
            }
        }, 300);
    }

    // --- KEYBOARD SHORTCUT ROUTER ---

    window.addEventListener('keydown', function(e) {
        // Check if Ctrl and Alt are currently being held down
        if (e.ctrlKey && e.altKey) {

            let codeToSearch = null;

            // Figure out which Numpad key was pressed and assign the right code
            switch(e.code) {
                case 'Numpad1':
                    codeToSearch = 'APPN';
                    break;
                case 'Numpad2':
                    codeToSearch = 'XDSM';
                    break;
                case 'Numpad3':
                    codeToSearch = 'DADD';
                    break;
            }

            // If a valid Numpad key was pressed, stop default browser behavior and fire the search
            if (codeToSearch !== null) {
                e.preventDefault();
                executeColleagueSearch(codeToSearch);
            }
        }
    });

})();
