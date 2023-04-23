// Get the necessary DOM elements
const mazeContainer = document.getElementById("maze-container");
const generateButton = document.getElementById("generate-btn");
const solveButton = document.getElementById("solve-btn");

// Add an event listener to the "Generate Maze" button
generateButton.addEventListener("click", generateMaze);
solveButton.addEventListener("click", solveMaze);


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
      if (Math.random() < 0.2) { // adjust probability as desired
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
}


function solveMaze() {
  // Mark all cells as unvisited
  const visited = new Array(MAZE_HEIGHT);
  for (let i = 0; i < MAZE_HEIGHT; i++) {
    visited[i] = new Array(MAZE_WIDTH).fill(false);
  }

  // Define a helper function to perform DFS
  function dfs(currentCell) {
    // Mark the current cell as visited
    visited[currentCell.dataset.row][currentCell.dataset.col] = true;

    // If the current cell is the end cell, return true to indicate that the maze is solved
    if (currentCell === endCell) {
      return true;
    }

    // Check the neighbors of the current cell
    const neighbors = getNeighbors(currentCell);
    for (let neighbor of neighbors) {
      if (!visited[neighbor.dataset.row][neighbor.dataset.col]) {
        if (dfs(neighbor)) {
          // If DFS finds a path to the end cell, mark the current cell as part of the solution path and return true
          currentCell.classList.add("path");
          return true;
        }
      }
    }

    // If no path to the end cell is found, return false
    return false;
  }

  // Start DFS from the start cell
  dfs(startCell);

  // Add the unvisited class to all non-blocked cells
const allCells = document.querySelectorAll('.cell');
for (let cell of allCells) {
  if (!cell.classList.contains('blocked') && !cell.classList.contains('path') && cell !== startCell && cell !== endCell) {
    cell.classList.add('unvisited');
  }
}

  
}

// Define a helper function to get the neighbors of a cell
function getNeighbors(cell) {
  const neighbors = [];
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (row > 0 && !mazeGrid[row-1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row-1][col]);
  }
  if (col < MAZE_WIDTH - 1 && !mazeGrid[row][col+1].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row][col+1]);
  }
  if (row < MAZE_HEIGHT - 1 && !mazeGrid[row+1][col].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row+1][col]);
  }
  if (col > 0 && !mazeGrid[row][col-1].classList.contains("blocked")) {
    neighbors.push(mazeGrid[row][col-1]);
  }

  return neighbors;
}

