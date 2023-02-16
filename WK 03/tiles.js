// const red = Math.floor(Math.random() * 225) + 1;
// const green = Math.floor(Math.random() * 225) + 1;
// const blue = Math.floor(Math.random() * 225) + 1;
function makeGrid(){
    const gridrows = 10;
    const gridcolumns= 10;
    const grid = document.getElementById("grid");
    for (let i = 1; i <= gridrows; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <=gridcolumns; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", "r" + i + "c" + j)
            let idname = cell.setAttribute("id", "r" + i + "c" + j)
            cell.style.backgroundColor = "rgb(200,200,200)";
            row.appendChild(cell);
            console.log("name:" + idname);
         
        }
        grid.appendChild(row);
    }
}
