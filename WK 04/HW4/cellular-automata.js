// This function applies the cellular automata rule to the current configuration
function applyRule(config, rule) {
    const n = config.length;
    const nextConfig = [];
  
    // Loop through the current configuration
    for (let i = 0; i < n; i++) {
      // Get the left, center and right cells
      const left = config[(i + n - 1) % n];
      //console.log("left of " + i + ": " + left);
      const center = config[i];
      const right = config[(i + 1) % n];
      //console.log("right of " + i + ": " + right);
  
      // Calculate the sum of the left, center and right cells
      const sum = left * 4 + center * 2 + right;
  
      // Apply the rule to the sum and update the next configuration
      nextConfig[i] = (rule >> sum) & 1;
      //console.log("nextConfig[i]: " + nextConfig[i]);
    }
  
    // Return the next configuration
    //console.log("nextConfig = " + nextConfig);
    return nextConfig;
  }
  
  // Select the form and the grid from the HTML document
  const form = document.querySelector('form');
  const grid = document.querySelector('#grid');
  
  // Listen for form submit event
  form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the rule input value
    const ruleInput = document.querySelector('#rule');
    const rule = ruleInput.value;
  
    // Clear the grid before generating new cellular automaton
    grid.innerHTML = '';
  
    // Define the number of rows and columns for the grid
    const numRows = 150;
    const numCols = 150;
  
    // Initialize the configuration with a single cell in the middle
    let config = new Array(numCols).fill(0);
    config[0]=1;
    config[numCols-1] =1;
    config[Math.floor(numCols / 2)] = 1;
  
    // Loop through each row and column
    // generate the cellular automaton
    for (let i = 0; i < numRows; i++) {
      const row = document.createElement('tr');
  
      for (let j = 0; j < numCols; j++) {
        // Create a cell for the current row and column
        const cell = document.createElement('td');
  
        // Set the class of the cell based on the configuration
        cell.classList.toggle('alive', config[j] === 1);
  
        // Add the cell to the current row
        row.appendChild(cell);
      }
  
      // call applyRule to apply the rule to update the grid
      config = applyRule(config, rule);
      grid.appendChild(row);
    }
  });

  module.exports = { applyRule };
  