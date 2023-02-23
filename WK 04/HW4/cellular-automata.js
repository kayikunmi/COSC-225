function draw(){
    var nameInput = document.getElementById('number');

document.querySelector('form.pure-form').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    console.log(nameInput.value);    
});
    let color1 = 225;
    let color2 = 0;
    const gridrows = 10;
    const gridcolumns= 10;
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

  