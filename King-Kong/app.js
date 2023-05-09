// Get the necessary DOM elements
const mazeContainer1 = document.getElementById("maze-container");
const mazeContainer2 = document.getElementById("maze-container2");
const generateButton = document.getElementById("generate-btn");
const dfsButton = document.getElementById("dfs-btn");
const shortButton = document.getElementById("short-btn");

// Add an event listener to the "Generate Maze" button
generateButton.addEventListener("click", generateMaze);
dfsButton.addEventListener("click", dfsMaze);
shortButton.addEventListener("click", shortMaze);


// Set up variables for the maze dimensions and cell size
const MAZE_WIDTH = 20;
const MAZE_HEIGHT = 20;
const CELL_SIZE = 15;

// Set up variables for the starting and ending cells
// Set up variables for the starting and ending cells
let startCell1, endCell1, startCell2, endCell2;

// Initialize the maze grids
const mazeGrid1 = new Array(MAZE_HEIGHT);
for (let i = 0; i < MAZE_HEIGHT; i++) {
  mazeGrid1[i] = new Array(MAZE_WIDTH);
}
const mazeGrid2 = new Array(MAZE_HEIGHT);
for (let i = 0; i < MAZE_HEIGHT; i++) {
  mazeGrid2[i] = new Array(MAZE_WIDTH);
}

// Function to generate the mazes
function generateMaze() {
  // Clear the maze containers
  mazeContainer1.innerHTML = "";
  mazeContainer2.innerHTML = "";

  // Generate the maze grids
  for (let row = 0; row < MAZE_HEIGHT; row++) {
    for (let col = 0; col < MAZE_WIDTH; col++) {
      // Create a div for the cell
      const cell1 = document.createElement("div");
      const cell2 = document.createElement("div");

      // Set the cell's class to "cell"
      cell1.className = "cell";
      cell2.className = "cell";

      // Set the cell's position and size
      cell1.style.top = row * CELL_SIZE + "px";
      cell1.style.left = col * CELL_SIZE + "px";
      cell1.style.width = CELL_SIZE + "px";
      cell1.style.height = CELL_SIZE + "px";

      cell2.style.top = row * CELL_SIZE + "px";
      cell2.style.left = col * CELL_SIZE + "px";
      cell2.style.width = CELL_SIZE + "px";
      cell2.style.height = CELL_SIZE + "px";

      // Add the data-row and data-col attributes to the cells
      cell1.setAttribute("data-row", row);
      cell1.setAttribute("data-col", col);
      cell2.setAttribute("data-row", row);
      cell2.setAttribute("data-col", col);

      // Add the cells to the maze containers
      mazeContainer1.appendChild(cell1);
      mazeContainer2.appendChild(cell2);

      // Randomly decide if the cell should be blocked or not
      if (Math.random() < 0.3) { // adjust probability as desired
        cell1.classList.add("blocked");
        cell2.classList.add("blocked");
      }

      // Set the cell in the maze grid
      mazeGrid1[row][col] = cell1;
      mazeGrid2[row][col] = cell2;
    }
  }

  // Choose a random starting cell that is not blocked
  do {
    const startRow = Math.floor(Math.random() * MAZE_HEIGHT);
    const startCol = Math.floor(Math.random() * MAZE_WIDTH);
    startCell1 = mazeGrid1[startRow][startCol];
    startCell2 = mazeGrid2[startRow][startCol];
  } while (startCell1.classList.contains("blocked") && startCell2.classList.contains("blocked"));

  // Choose a random ending cell that is not blocked and not the starting cell
  do {
    const endRow = Math.floor(Math.random() * MAZE_HEIGHT);
    const endCol = Math.floor(Math.random() * MAZE_WIDTH);
    endCell1 = mazeGrid1[endRow][endCol];
    endCell2 = mazeGrid2[endRow][endCol];
  } while ((endCell1.classList.contains("blocked") || endCell1 === startCell1) && (endCell2.classList.contains("blocked") || endCell2 === startCell2));

  // Mark the start and end cells
  startCell1.classList.add("start");
  startCell1.setAttribute('id', 'start');
  endCell1.classList.add("end");
  endCell1.setAttribute('id', 'end');
  startCell2.classList.add("start");
  startCell2.setAttribute('id', 'start');
  endCell2.classList.add("end");
  endCell2.setAttribute('id', 'end');

  console.log("generated dfs maze");
  console.log("generated short maze")
}


function dfsMaze() {
  // Mark all cells as unvisited
  const visited = new Array(MAZE_HEIGHT);
  for (let i = 0; i < MAZE_HEIGHT; i++) {
    visited[i] = new Array(MAZE_WIDTH).fill(false);
  }

  // Initialize the stack with the starting cell
  const stack = [startCell1];

  // Set a maximum number of iterations
  const maxIterations = 1000;
  let iteration = 0;

  // Define a helper function to perform one step of DFS
  function dfs() {
    // Check if the stack is empty or the maximum number of iterations has been reached
    if (stack.length === 0 || iteration >= maxIterations) {
      // Add the unvisited class to all non-blocked cells
      const allCells = document.querySelectorAll('.cell');
      for (let cell of allCells) {
        if (!cell.classList.contains('blocked') && !cell.classList.contains('path') && cell !== startCell1 && cell !== endCell1) {
          cell.classList.add('unvisited');
        }
      }
      console.log("Maze solved or maximum number of iterations reached with dfs");
      clearInterval(intervalId);
      return;
    }

    // Get the next cell from the stack
    const currentCell = stack.pop();

    // Mark the current cell as visited
    visited[currentCell.dataset.row][currentCell.dataset.col] = true;

    // If the current cell is the end cell, mark it as part of the solution path and return true
    if (currentCell === endCell1) {
      currentCell.classList.add("path");
      console.log("Maze solved with dfs");
      clearInterval(intervalId);
      return;
    }

    // Check the neighbors of the current cell
    const neighbors = getNeighbors1(currentCell);
    for (let neighbor of neighbors) {
      if (!visited[neighbor.dataset.row][neighbor.dataset.col]) {
        // Add the neighbor to the stack
        stack.push(neighbor);
      }
    }

    // Mark the current cell as part of the solution path
    currentCell.classList.add("path");
    iteration++;
  }

  // Call the dfs function every 100 milliseconds
  const intervalId = setInterval(dfs, 10);
}

function shortMaze() {
  // Mark all cells as unvisited
  const visited = new Array(MAZE_HEIGHT);
  for (let i = 0; i < MAZE_HEIGHT; i++) {
    visited[i] = new Array(MAZE_WIDTH).fill(false);
  }

  // Initialize the queue with the starting cell
  const queue = [startCell2];

  // Keep track of the parent of each cell
  const parents = new Map();
  parents.set(startCell2, null);

  // Explore the neighbors of the start cell using BFS
  while (queue.length > 0) {
    const currentCell = queue.shift();

    if (currentCell === endCell2) {
      // If we've reached the end cell, construct the path by following the parent pointers
      let current = endCell2;
      while (current !== startCell2) {
        current.classList.add("path");
        current = parents.get(current);
      }
      startCell2.classList.add("start");
      endCell2.classList.add("end");
      console.log("Maze solved with short");
      return;
    }

    const neighbors = getNeighbors2(currentCell);
    for (let neighbor of neighbors) {
      if (!visited[neighbor.dataset.row][neighbor.dataset.col] && !neighbor.classList.contains("blocked")) {
        queue.push(neighbor);
        visited[neighbor.dataset.row][neighbor.dataset.col] = true;
        parents.set(neighbor, currentCell);
      }
    }
   
  }

  console.log("No solution found with short");
}

// Define a helper function to get the neighbors of a cell
function getNeighbors1(cell) {
  const neighbors = [];
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // Check neighbor above
  if (row > 0 && !mazeGrid1[row-1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid1[row-1][col]);
  }

  // Check neighbor to the right
  if (col < MAZE_WIDTH - 1 && !mazeGrid1[row][col+1].classList.contains("blocked")) {
    neighbors.push(mazeGrid1[row][col+1]);
  }

  // Check neighbor below
  if (row < MAZE_HEIGHT - 1 && !mazeGrid1[row+1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid1[row+1][col]);
  }

  // Check neighbor to the left
  if (col > 0 && !mazeGrid1[row][col-1].classList.contains("blocked")) {
    neighbors.push(mazeGrid1[row][col-1]);
  }

  return neighbors;
}
function getNeighbors2(cell) {
  const neighbors = [];
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // Check neighbor above
  if (row > 0 && !mazeGrid2[row-1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid2[row-1][col]);
  }

  // Check neighbor to the right
  if (col < MAZE_WIDTH - 1 && !mazeGrid2[row][col+1].classList.contains("blocked")) {
    neighbors.push(mazeGrid2[row][col+1]);
  }

  // Check neighbor below
  if (row < MAZE_HEIGHT - 1 && !mazeGrid2[row+1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid2[row+1][col]);
  }

  // Check neighbor to the left
  if (col > 0 && !mazeGrid2[row][col-1].classList.contains("blocked")) {
    neighbors.push(mazeGrid2[row][col-1]);
  }

  return neighbors;
}

