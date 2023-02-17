function makeGrid(){
    let color1 = 225;
    let color2 = 0;
    const gridrows = 10;
    const gridcolumns= 10;
    const grid = document.getElementById("grid");
    for (let i = 1; i <= gridrows; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <=gridcolumns; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", "r" + i + "c" + j)
            let idname = cell.setAttribute("id", "r" + i + "c" + j)
            console.log("idname: " + idname);
            color1 -=2.25;
            color2 +=2.25;
            cell.style.backgroundColor = "rgb(230," + color2 + "," + color1; 
            row.appendChild(cell);
            
         
        }
        grid.appendChild(row);
    }
}
