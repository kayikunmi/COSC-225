function createMaze(width, height) {
    let maze = initializeMaze(width, height); // create an empty maze
    let stack = []; // initialize a stack to keep track of visited cells
  
    // choose a random starting cell
    let currentCell = chooseRandomCell(maze);
  
    // mark the current cell as visited
    maze[currentCell.x][currentCell.y].visited = true;
  
    // repeat until all cells have been visited
    while (stack.length > 0) {
      // get all unvisited neighbors of the current cell
      let neighbors = getUnvisitedNeighbors(currentCell, maze);
  
      if (neighbors.length > 0) {
        // choose a random unvisited neighbor
        let nextCell = chooseRandomNeighbor(neighbors);
  
        // remove the wall between the current cell and the next cell
        removeWall(currentCell, nextCell);
  
        // push the current cell onto the stack
        stack.push(currentCell);
  
        // mark the next cell as visited and set it as the current cell
        maze[nextCell.x][nextCell.y].visited = true;
        currentCell = nextCell;
      } else {
        // backtrack to the previous cell on the stack
        currentCell = stack.pop();
      }
    }
  
    return maze;
  }
  
  function initializeMaze(width, height) {
    let maze = [];
  
    // create a 2D array of cells
    for (let x = 0; x < width; x++) {
      maze[x] = [];
      for (let y = 0; y < height; y++) {
        maze[x][y] = {
          x: x,
          y: y,
          visited: false,
          walls: {
            north: true,
            east: true,
            south: true,
            west: true
          }
        };
      }
    }
  
    return maze;
  }
  
  function chooseRandomCell(maze) {
    // choose a random cell within the maze
    let x = Math.floor(Math.random() * maze.length);
    let y = Math.floor(Math.random() * maze[0].length);
  
    return maze[x][y];
  }
  
  function getUnvisitedNeighbors(cell, maze) {
    let neighbors = [];
  
    // check north neighbor
    if (cell.y > 0 && !maze[cell.x][cell.y - 1].visited) {
      neighbors.push(maze[cell.x][cell.y - 1]);
    }
  
    // check east neighbor
    if (cell.x < maze.length - 1 && !maze[cell.x + 1][cell.y].visited) {
      neighbors.push(maze[cell.x + 1][cell.y]);
    }
  
    // check south neighbor
    if (cell.y < maze[0].length - 1 && !maze[cell.x][cell.y + 1].visited) {
      neighbors.push(maze[cell.x][cell.y + 1]);
    }
  
    // check west neighbor
    if (cell.x > 0 && !maze[cell.x - 1][cell.y].visited) {
      neighbors.push(maze[cell.x - 1][cell.y]);
    }
  
    return neighbors;
  }
  
  function chooseRandomNeighbor(neighbors) {
    // choose a random neighbor from the list of unvisited neighbors
    let index = Math.floor(Math.random() * neighbors.length);
    return neighbors[index];
  }
  
  function removeWall(cell1, cell2) {
    // remove the wall between two adjacent cells
    if (cell1.x < cell2.x) {
      // remove east wall of cell1 and west wall of cell2
      cell1.walls.e = false;
      cell2.walls.west = false;
    } 
    else if (cell1.x > cell2.x) {
        // remove west wall of cell1 and east wall of cell2
        cell1.walls.west = false;
        cell2.walls.east = false;
    } 
    else if (cell1.y < cell2.y) {
        // remove south wall of cell1 and north wall of cell2
        cell1.walls.south = false;
        cell2.walls.north = false;
    } 
    else if (cell1.y > cell2.y) {
        // remove north wall of cell1 and south wall of cell2
        cell1.walls.north = false;
        cell2.walls.south = false;
    }
}
  