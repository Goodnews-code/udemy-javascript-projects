# list 📁

## Overview
A Node.js-based, command-line clone of the `ls` utility. It demonstrates advanced asynchronous file system operations leveraging `fs.promises.lstat` and `Promise.all` for parallel reading. It distinguishes between files and directories, outputting colored directory contents to the terminal using the `chalk` library.

## Key Features
- **Parallel Promise Execution:** Reads file structures efficiently by generating parallel promises mapped over directory arrays and awaiting resolutions through `Promise.all()`.
- **Node File System Modules:** Effectively maneuvers `fs.readdir` and `lstat` hooks.
- **Chalk Coloring:** Integrates the `chalk` package for stylized and contextual log output—differentiating between files (white) and directories (bold blue).
- **ES Modules:** Relies on `"type": "module"` in Node to support native `import` syntaxes.

## How to Run / Usage
This acts as an executable command line node program.
1. Navigate to the `list` directory.
2. Install the required Node packages (specifically `chalk`):
   ```bash
   npm install
   ```
3. Run the list script locally:
   ```bash
   node index.js
   ```
4. *Optional*: Run `npm link` to make the `nls` command available globally in your terminal.
