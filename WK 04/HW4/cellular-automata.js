// This function applies the cellular automata rule to the current configuration
function applyRule(config, rule){
  let n = config.length;
  let nextConfig = [];
  
  for (let i = 0; i < n; i++){
    //get the neighbor cells
    const left = config[(i + n - 1) % n];
    //console.log("left of " + i + ": " + left);
    const center = config[i];
    const right = config[(i + 1) % n];
    //console.log("right of " + i + ": " + right);
  
    //calculate the sum of the left, center and right cells
    const sum = left * 4 + center * 2 + right;

    //apply the rule to the sum and update the next configuration
    nextConfig[i] = (rule >> sum) & 1;
    //console.log("nextConfig[i]: " + nextConfig[i]);
  }
  //console.log("nextConfig = " + nextConfig);
  return nextConfig;
}

let form, grid;
if (typeof document !== 'undefined') {
  form = document.querySelector('form');
  grid = document.querySelector('#grid');

  form.addEventListener('submit', (event) => {
    //prevent the default form submission behavior
    event.preventDefault();
    let ruleInput = document.querySelector('#rule');
    let rule = ruleInput.value;

    //clear the grid before generating new cellular automaton
    grid.innerHTML = '';

    let numRows = 150;
    let numCols = 150;

    //initialize the configuration with a single cell in the middle
    let config = new Array(numCols).fill(0);
    config[0]=1;
    config[numCols-1] =1;
    config[Math.floor(numCols / 2)] = 1;

    //generate the cellular automaton by looping through each cell
    for (let i = 0; i < numRows; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < numCols; j++) {
        const cell = document.createElement('td');
        //change the class to alive when the number is 1. 
        //this will change the color to whatever alive's css is
        cell.classList.toggle('alive', config[j] === 1);
        row.appendChild(cell);
      }

      config = applyRule(config, rule);
      grid.appendChild(row);
    }
  });
}

module.exports = { applyRule };
