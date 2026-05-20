# watchit 👁️

## Overview
A custom CLI tool built with Node.js that functions similarly to `nodemon`. It uses `chokidar` to observe file changes, `caporal` to parse command-line arguments, and `just-debounce-it` to optimally handle multiple rapid file events, automatically restarting a specified Node.js process upon file modification.

## Key Features
- **Child Processes:** Spawns and manages node-based child processes using `spawn()` from `node:child_process` and gracefully invokes `.kill()` when resetting state.
- **File System Watching:** Actively listens to directory mutations (add, change, unlink) via the `chokidar` library.
- **Debouncing:** Uses `just-debounce-it` to ensure multiple rapid save actions don't infinitely restart the executing child process.
- **CLI Bootstrapping:** Constructed to run globally as a command line application relying on `caporal` for argument checking and help menus.

## How to Run / Usage
This acts as an executable command line node program.
1. Navigate to the `watchit` directory.
2. Ensure you have Node.js installed, then install the dependencies:
   ```bash
   npm install
   ```
3. Create a test file, e.g., `test.js`, and add a console log.
4. Execute the watcher:
   ```bash
   npx watchit test.js
   ```
   *(Alternatively, use `npm link` to make it accessible globally.)*
5. Watch the script auto-execute every time you save `test.js`.
