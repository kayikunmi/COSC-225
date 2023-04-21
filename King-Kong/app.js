document.addEventListener("DOMContentLoaded", function() {
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
  
    // Initialize the maze grid
    for (let row = 0; row < MAZE_HEIGHT; row++) {
      for (let col = 0; col < MAZE_WIDTH; col++) {
        mazeGrid[row][col] = {
          visited: false,
          northWall: true,
          eastWall: true,
          southWall: true,
          westWall: true
        };
      }
    }
  
    // Set a random starting cell in the grid
    let currentRow = Math.floor(Math.random() * MAZE_HEIGHT);
    let currentCol = Math.floor(Math.random() * MAZE_WIDTH);
  
    // Mark the starting cell as visited
    mazeGrid[currentRow][currentCol].visited = true;
  
    // Create a stack to keep track of visited cells
    const stack = [];
    stack.push([currentRow, currentCol]);
  
    // While the stack is not empty, do the following
    while (stack.length > 0) {
      // Pop a cell from the stack
      const [row, col] = stack.pop();
  
      // Check if the cell has any unvisited neighbors
      const neighbors = [];
      if (row > 0 && !mazeGrid[row - 1][col].visited) {
        neighbors.push([row - 1, col, "north"]);
      }
      if (col < MAZE_WIDTH - 1 && !mazeGrid[row][col + 1].visited) {
        neighbors.push([row, col + 1, "east"]);
      }
      if (row < MAZE_HEIGHT - 1 && !mazeGrid[row + 1][col].visited) {
        neighbors.push([row + 1, col, "south"]);
      }
      if (col > 0 && !mazeGrid[row][col - 1].visited) {
        neighbors.push([row, col - 1, "west"]);
      }
  
      // If the cell has unvisited neighbors, do the following
      if (neighbors.length > 0) {
        // Push the current cell back onto the stack
        stack.push([row, col]);
  
        // Choose a random unvisited neighbor
        const [neighborRow, neighborCol, direction] = neighbors[Math.floor(Math.random() * neighbors.length)];
  
        // Remove the wall between the current cell and the chosen neighbor
        switch (direction) {
          case "north":
            mazeGrid[row][col].northWall = false;
            mazeGrid[neighborRow][neighborCol].southWall = false;
            break;
          case "east":
            mazeGrid[row][col].eastWall = false;
            mazeGrid[neighborRow][neighborCol].westWall = false;
            break;
          case "south":
            mazeGrid[row][col].southWall = false;
            mazeGrid[neighborRow][neighborCol].northWall = false;
            break;
          case "west":
            mazeGrid[row][col].westWall = false;
            mazeGrid[neighborRow][neighborCol].eastWall = false;
            break;
        }
  
        // Mark the chosen neighbor as visited and push it to the stack
        mazeGrid[neighborRow][neighborCol].visited = true;
        stack.push([neighborRow, neighborCol]);
      }
    }
  
    // Add the cells to the maze container
    for (let row = 0; row < MAZE_HEIGHT; row++) {
        for (let col = 0; col < MAZE_WIDTH; col++) {
            // Get the cell from the maze grid
            const cell = mazeGrid[row][col];
                // Add the walls to the cell
    if (cell.northWall) {
        const wall = document.createElement("div");
        wall.className = "wall";
        wall.style.top = row * CELL_SIZE + "px";
        wall.style.left = col * CELL_SIZE + "px";
        wall.style.width = CELL_SIZE + "px";
        mazeContainer.appendChild(wall);
      }
      if (cell.eastWall) {
        const wall = document.createElement("div");
        wall.className = "wall";
        wall.style.top = row * CELL_SIZE + "px";
        wall.style.left = (col + 1) * CELL_SIZE + "px";
        wall.style.height = CELL_SIZE + "px";
        mazeContainer.appendChild(wall);
      }
      if (cell.southWall) {
        const wall = document.createElement("div");
        wall.className = "wall";
        wall.style.top = (row + 1) * CELL_SIZE + "px";
        wall.style.left = col * CELL_SIZE + "px";
        wall.style.width = CELL_SIZE + "px";
        mazeContainer.appendChild(wall);
      }
      if (cell.westWall) {
        const wall = document.createElement("div");
        wall.className = "wall";
        wall.style.top = row * CELL_SIZE + "px";
        wall.style.left = col * CELL_SIZE + "px";
        wall.style.height = CELL_SIZE + "px";
        mazeContainer.appendChild(wall);
      }
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
});
