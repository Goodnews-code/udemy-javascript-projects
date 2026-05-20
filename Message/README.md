# Message ✉️

## Overview
A cleverly built application for generating shareable static messages. It utilizes native browser Base64 encoding/decoding (`btoa` and `atob`) to securely pack user inputs into an encrypted URL hash fragment. It then dynamically toggles UI states to render a secret greeting format when the generated link is accessed.

## Key Features
- **Native Browser Cryptography:** Uses Base64 encoding tools `btoa` to encode readable input into obfuscated hashes and `atob` to decode them back.
- **URL Hash Routing:** Extracts the fragment identifier (hash) using `window.location.hash` to determine application state without querying a backend database.
- **State Toggling:** Modifies class structures aggressively to transition the browser from an "input" view directly to a "message readout" view depending on the detected URL hash.

## How to Run / Usage
This is a completely front-end application with no installation needed.
1. CD into the `Message` folder.
2. Simply open `index.html` in a web browser.
3. Type a message, generate the link, and copy/paste the link in a new tab to see your secret message rendered.

## Live Demo
[Live Demo](https://message-app-nine-beta.vercel.app)
