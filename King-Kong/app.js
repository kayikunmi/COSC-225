// Get the necessary DOM elements
const mazeContainer = document.getElementById("maze-container");
const generateButton = document.getElementById("generate-btn");
const dfsButton = document.getElementById("dfs-btn");
const shortButton = document.getElementById("short-btn");

// Add an event listener to the "Generate Maze" button
generateButton.addEventListener("click", generateMaze);
dfsButton.addEventListener("click", dfsMaze);
shortButton.addEventListener("click", shortMaze);


// Set up variables for the maze dimensions and cell size
const MAZE_WIDTH = 30;
const MAZE_HEIGHT = 30;
const CELL_SIZE = 30;

// Set up variables for the starting and ending cells
let startCell, endCell;

// Initialize the maze grid
const mazeGrid = new Array(MAZE_HEIGHT);
for (let i = 0; i < MAZE_HEIGHT; i++) {
  mazeGrid[i] = new Array(MAZE_WIDTH);
}

// Function to generate the maze
function generateMaze() {
  // Clear the maze container
  mazeContainer.innerHTML = "";

  // Generate the maze grid
  for (let row = 0; row < MAZE_HEIGHT; row++) {
    for (let col = 0; col < MAZE_WIDTH; col++) {
      // Create a div for the cell
      const cell = document.createElement("div");

      // Set the cell's class to "cell"
      cell.className = "cell";

      // Set the cell's position and size
      cell.style.top = row * CELL_SIZE + "px";
      cell.style.left = col * CELL_SIZE + "px";
      cell.style.width = CELL_SIZE + "px";
      cell.style.height = CELL_SIZE + "px";

      // Add the data-row and data-col attributes to the cell
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);

      // Add the cell to the maze container
      mazeContainer.appendChild(cell);

      // Randomly decide if the cell should be blocked or not
      if (Math.random() < 0.3) { // adjust probability as desired
        cell.classList.add("blocked");
      }

      // Set the cell in the maze grid
      mazeGrid[row][col] = cell;
    }
  }

  // Choose a random starting cell that is not blocked
  do {
    const startRow = Math.floor(Math.random() * MAZE_HEIGHT);
    const startCol = Math.floor(Math.random() * MAZE_WIDTH);
    startCell = mazeGrid[startRow][startCol];
  } while (startCell.classList.contains("blocked"));

  // Choose a random ending cell that is not blocked and not the starting cell
  do {
    const endRow = Math.floor(Math.random() * MAZE_HEIGHT);
    const endCol = Math.floor(Math.random() * MAZE_WIDTH);
    endCell = mazeGrid[endRow][endCol];
  } while (endCell.classList.contains("blocked") || endCell === startCell);

  // Mark the start and end cells
  startCell.classList.add("start");
  startCell.setAttribute('id', 'start');
  endCell.classList.add("end");
  endCell.setAttribute('id', 'end');

  console.log("Generated Maze");
}


function dfsMaze() {
  // Mark all cells as unvisited
  const visited = new Array(MAZE_HEIGHT);
  for (let i = 0; i < MAZE_HEIGHT; i++) {
    visited[i] = new Array(MAZE_WIDTH).fill(false);
  }

  // Initialize the stack with the starting cell
  const stack = [startCell];

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
        if (!cell.classList.contains('blocked') && !cell.classList.contains('path') && cell !== startCell && cell !== endCell) {
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
    if (currentCell === endCell) {
      currentCell.classList.add("path");
      console.log("Maze solved with dfs");
      clearInterval(intervalId);
      return;
    }

    // Check the neighbors of the current cell
    const neighbors = getNeighbors(currentCell);
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
  const queue = [startCell];

  // Keep track of the parent of each cell
  const parents = new Map();
  parents.set(startCell, null);

  // Explore the neighbors of the start cell using BFS
  while (queue.length > 0) {
    const currentCell = queue.shift();

    if (currentCell === endCell) {
      // If we've reached the end cell, construct the path by following the parent pointers
      let current = endCell;
      while (current !== startCell) {
        current.classList.add("path");
        current = parents.get(current);
      }
      startCell.classList.add("start");
      endCell.classList.add("end");
      console.log("Maze solved with short");
      return;
    }

    const neighbors = getNeighbors(currentCell);
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
function getNeighbors(cell) {
  const neighbors = [];
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // Check neighbor above
  if (row > 0 && !mazeGrid[row-1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row-1][col]);
  }

  // Check neighbor to the right
  if (col < MAZE_WIDTH - 1 && !mazeGrid[row][col+1].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row][col+1]);
  }

  // Check neighbor below
  if (row < MAZE_HEIGHT - 1 && !mazeGrid[row+1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row+1][col]);
  }

  // Check neighbor to the left
  if (col > 0 && !mazeGrid[row][col-1].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row][col-1]);
  }

  return neighbors;
}


