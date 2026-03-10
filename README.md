# Colleague_quickforms

Overview

This is a Tampermonkey userscript designed specifically for the Lakehead University Colleague ERP system. It bypasses the standard UI menus by directly interacting with the page's underlying code, allowing you to instantly launch specific form searches using custom keyboard shortcuts.
Prerequisites

    A modern web browser (Firefox, Chrome, Edge, etc.).

    The Tampermonkey browser extension installed.

Installation

    Click the Tampermonkey extension icon in your browser and select Create a new script....

    Delete any default template code in the editor.

    Paste the provided JavaScript code into the editor.

    Press Ctrl + S (or click File > Save) to save the script.

    Navigate to your Colleague tab and Refresh the page (F5).

How to Use

Once the page is loaded, ensure your NumLock is turned ON. Press the following key combinations anywhere on the Colleague page to instantly execute a search:

    Ctrl + Alt + Numpad 1 ➔ Searches for APPN

    Ctrl + Alt + Numpad 2 ➔ Searches for XDSM

    Ctrl + Alt + Numpad 3 ➔ Searches for DADD

Note: The script waits 300 milliseconds for the Colleague UI to transition before typing the code. If your network is exceptionally slow, you may need to increase the setTimeout delay in the script.
How to Add More Shortcuts

To add more form codes to your script, simply locate the switch(e.code) block near the bottom of the code. Add a new case for the next Numpad key.
