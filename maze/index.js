const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 6;
const cellsVertical = 4;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Outer boundary walls (100px thick to prevent tunneling/disappearing)
const walls = [
  Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true }),
  Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true }),
  Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true }),
  Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true }),
];
World.add(world, walls);

// Maze generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
  // If i have visted the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }

  // Mark this cell as being visited
  grid[row][column] = true;

  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
  ]);
  // For each neighbor....
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove a wall from either horizontals or verticals
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }

    stepThroughCell(nextRow, nextColumn);
  }
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      10, // Thicker wall (10px) to prevent physics tunneling
      {
        label: "wall",
        isStatic: true,
        render: {
          fillStyle: "red",
        },
      },
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      10, // Thicker wall (10px) to prevent physics tunneling
      unitLengthY,
      {
        label: "wall",
        isStatic: true,
        render: {
          fillStyle: "red",
        },
      },
    );
    World.add(world, wall);
  });
});

// Goal

const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    label: "goal",
    isStatic: true,
    render: {
      fillStyle: "green",
    },
  },
);
World.add(world, goal);

// Ball

const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: "ball",
  render: {
    fillStyle: "blue",
  },
});
World.add(world, ball);

document.addEventListener("keydown", (event) => {
  const { x, y } = ball.velocity;
  const speedLimit = 10; // Cap velocity to prevent extreme speeds and tunneling

  if (event.keyCode === 38 || event.keyCode === 87) {
    Body.setVelocity(ball, { x, y: Math.max(y - 5, -speedLimit) });
  }
  if (event.keyCode === 39 || event.keyCode === 68) {
    Body.setVelocity(ball, { x: Math.min(x + 5, speedLimit), y });
  }
  if (event.keyCode === 40 || event.keyCode === 83) {
    Body.setVelocity(ball, { x, y: Math.min(y + 5, speedLimit) });
  }
  if (event.keyCode === 37 || event.keyCode === 65) {
    Body.setVelocity(ball, { x: Math.max(x - 5, -speedLimit), y });
  }
});

// Win Condition

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector(".winner").classList.remove("hidden");

      // Defer modifications to after the update tick to prevent Matter.js crashes/ignored states
      Events.on(engine, "afterUpdate", function triggerWin() {
        Events.off(engine, "afterUpdate", triggerWin); // Unsubscribe immediately

        world.gravity.y = 1;
        World.remove(world, walls);
        Body.setStatic(ball, true); // Freeze the ball in place so it doesn't fall
        
        world.bodies.forEach((body) => {
          if (body.label === "wall") {
            Body.setStatic(body, false); // Make maze walls fall
          }
        });
      });
    }
  });
});
