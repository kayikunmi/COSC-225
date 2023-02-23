
var nameInput = document.getElementById('number');
if(nameInput != null){
    document.querySelector('form.pure-form').addEventListener('submit', function (e) {
        //prevent the normal submission of the form
        e.preventDefault();
        //console.log(nameInput.value);  
        let decimal = nameInput.value;
        let binary = Number(decimal).toString(2);
        console.log("This is the input in decimal: " + decimal); 
        console.log("This is the input in binary: " + binary);
    });
}

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

  