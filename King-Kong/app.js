// Get the necessary DOM elements
const mazeContainer = document.getElementById("maze-container");
const generateButton = document.getElementById("generate-btn");
const solveButton = document.getElementById("solve-btn");

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
  endCell.classList.add("end");

  // Generate the maze using DFS algorithm
  dfs(startCell);

  // Remove the "visited" class from all cells
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("visited");
  }
}

function getUnvisitedNeighbors(cell) {
    const { row, col } = getCellPosition(cell);
    const neighbors = [];
  
    // Check the north neighbor
    if (row > 0 && !mazeGrid[row - 1][col].classList.contains("visited")) {
      neighbors.push(mazeGrid[row - 1][col]);
    }
  
    // Check the east neighbor
    if (col < MAZE_WIDTH - 1 && !mazeGrid[row][col + 1].classList.contains("visited")) {
      neighbors.push(mazeGrid[row][col + 1]);
    }
  
    // Check the south neighbor
    if (row < MAZE_HEIGHT - 1 && !mazeGrid[row + 1][col].classList.contains("visited")) {
      neighbors.push(mazeGrid[row + 1][col]);
    }
  
    // Check the west neighbor
    if (col > 0 && !mazeGrid[row][col - 1].classList.contains("visited")) {
      neighbors.push(mazeGrid[row][col - 1]);
    }
  
    return neighbors;
  }
  

  function getCellPosition(cell) {
    const row = parseInt(cell.style.top) / CELL_SIZE;
    const col = parseInt(cell.style.left) / CELL_SIZE;
    return { row, col };
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function dfs(startCell) {
    const stack = [startCell];
    while (stack.length > 0) {
      const currentCell = stack.pop();
      if (!currentCell.classList.contains("visited")) {
        currentCell.classList.add("visited");
        const neighbors = getUnvisitedNeighbors(currentCell);
        shuffle(neighbors);
        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }
      }
    }
  }
  async function dfs(startCell) {
    const stack = [startCell];
    while (stack.length > 0) {
      const currentCell = stack.pop();
      if (!currentCell.classList.contains("visited")) {
        currentCell.classList.add("visited");
        const neighbors = getUnvisitedNeighbors(currentCell);
        shuffle(neighbors);
        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }
  
        // Wait for a short delay before moving on to the next step
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
  }

// Add an event listener to the "Generate Maze" button
generateButton.addEventListener("click", generateMaze);
solveButton.addEventListener("click", () => {
  dfs(startCell);
});
