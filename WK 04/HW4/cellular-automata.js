var decimal;
var binary;
var config = [];

function getUserInput() {
  var nameInput = document.getElementById('number');
  if(nameInput != null){
    document.querySelector('form.pure-form').addEventListener('submit', function (e) {
        //prevent the normal submission of the form
        e.preventDefault();
        decimal = nameInput.value;
        binary = Number(decimal).toString(2);
        console.log("works here");
        console.log("This is the input in decimal: " + decimal); 
        console.log("This is the input in binary: " + binary);
        
        //this pads binary if necessary
        while (binary.length < 8) {
            binary = "0" + binary;
            // console.log("here we are: " + binary);
            // console.log(binary.length);
        }

        //clears the array if necessary
        while(config.length > 0) {
            config.pop();
            //console.log("poping config: " + config.length);
        }
        
        
        // add the values of binary to the config array
        for (let i = 7; i >= 0; i--){
            config.push(binary[i]);
        }
    
        console.log("The binary values in the config array are: " + config);
        console.log("config length: " + config.length);
    });
  }
  
}

// getUserInput();


///

function draw(){
    let color1 = 225;
    let color2 = 0;
    const gridrows = 20;
    const gridcolumns= 20;
    const table = document.getElementById("grid");
    for (let i = 1; i <= gridrows; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <=gridcolumns; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", "r" + i + "c" + j);
            let idname = cell.getAttribute('id')
            //console.log("idname: " + idname);
            color1 -=2.25;
            color2 +=2.25;
            //cell.style.backgroundColor = "rgb(230," + color2 + "," + color1 + ")";
            if(j==i){
                cell.style.backgroundColor = "rgb(230," + color2 + "," + color1 + ")";
            }
            else{
                cell.style.backgroundColor = "rgb(255,255,255)";
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}
///
function applyRule(config, rule){
    //here we want to apply whatever rule we've created
}

 