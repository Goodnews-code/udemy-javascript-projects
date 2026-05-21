# JavaScript Course Projects

This repository contains a collection of projects, applications, and practice exercises developed during my JavaScript learning journey on Udemy.

## 📁 Repository Structure

Here is a list of the projects included in this repository:

- **[maze](./maze/)** - An interactive, browser-based maze game powered by `Matter.js` for 2D physics. It features a custom depth-first search algorithm to dynamically generate grids and walls, and captures keyboard events to control velocity-based movement against collision boundaries. Features custom physical effects upon reaching the goal. ([Live Demo](https://maze-omega-lyart.vercel.app))
- **[Movie](./Movie/)** - A robust movie comparison application utilizing data from the OMDB API via `axios`. It features custom reusable autocomplete widgets, dynamic DOM manipulation for side-by-side data visualization, and parses complex data sets (using Regex and array reduction) to determine the statistical "winner" across metrics like Box Office and IMDB ratings. ([Live Demo](https://movie-seven-coral.vercel.app))
- **[Message](./Message/)** - A cleverly built application for generating shareable static messages. It utilizes native browser Base64 encoding/decoding (`btoa` and `atob`) to securely pack user inputs into an encrypted URL hash fragment. It then dynamically toggles UI states to render a secret greeting. ([Live Demo](https://message-app-nine-beta.vercel.app))
- **[watchit](./watchit/)** - A custom CLI tool built with Node.js that functions similarly to `nodemon`. It uses `chokidar` to observe file changes, `caporal` to parse command-line arguments, and `just-debounce-it` to optimally handle multiple rapid file events, automatically restarting a specified Node.js process upon file modification.
- **[list](./list/)** - A Node.js-based, command-line clone of the `ls` utility. It demonstrates advanced asynchronous file system operations leveraging `fs.promises.lstat` and `Promise.all` for parallel reading. It distinguishes between files and directories, outputting colored directory contents to the terminal using the `chalk` library.
- **[ecomm](./ecomm/)** - A Node.js and Express backend application designed as an e-commerce foundation. It implements a custom file-based datastore leveraging `fs.promises`, features robust user authentication with secure password hashing (`crypto.scrypt`), and manages login states via `cookie-session`.

---

## 🛠️ How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Goodnews-code/udemy-javascript-projects.git
   cd JavaScript
   ```

2. **Open a project:**
   - Navigate to any of the subfolders (e.g., `cd maze`).
   - Open the `index.html` file in your browser directly, or run it using a local development server (such as Live Server in VS Code).
