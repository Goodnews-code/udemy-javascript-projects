# maze 🕹️

## Overview
An interactive, browser-based maze game powered by `Matter.js` for 2D physics. It features a custom depth-first search algorithm to dynamically generate grids and walls, and captures keyboard events to control velocity-based movement against collision boundaries. It features custom physical effects upon reaching the goal.

## Key Features
- **Matter.js Physics Engine:** Utilizes Bodies, World, Engine, and Runner for 2D interactions and friction.
- **Dynamic Maze Generation:** Implements a depth-first search logic coupled with grid arrays for rendering.
- **Collision Detection:** Listens to Matter.js events to trigger win condition graphics and physics alterations upon reaching the goal.
- **Velocity Control:** Keydown listeners specifically throttle user movement through bounded velocity values to prevent tunneling through static collision walls.

## How to Run / Usage
This is a standard HTML, CSS, and JS web application.
1. Navigate into the `maze` folder.
2. Open `index.html` in your web browser. Alternatively, right-click `index.html` and use the "Open with Live Server" VS Code extension.
3. Use the **W A S D** or **Arrow Keys** to steer the ball to the green goal block!

## Live Demo
[Live Demo](https://maze-omega-lyart.vercel.app)
