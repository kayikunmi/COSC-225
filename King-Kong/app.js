// Get the necessary DOM elements
const mazeContainer = document.getElementById("maze-container");
const generateButton = document.getElementById("generate-btn");

// Set up variables for the maze dimensions and cell size
const MAZE_WIDTH = 20;
const MAZE_HEIGHT = 20;
const CELL_SIZE = 20;

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

      // Set the cell in the maze grid
      mazeGrid[row][col] = cell;
    }
  }

  // TODO: Generate the maze using your preferred algorithm
  /*Set a random starting cell in the grid.
    Push the starting cell to the stack.
    While the stack is not empty, do the following:
        a. Pop a cell from the stack.
    b. If the cell has not been visited yet, mark it as visited and 
    remove the wall between the current cell and a randomly chosen 
    neighboring cell that has not been visited.
    c. Push all unvisited neighboring cells to the stack.
    Repeat until all cells have been visited.*/
}

// Add an event listener to the "Generate Maze" button
generateButton.addEventListener("click", generateMaze);
