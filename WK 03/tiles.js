function makeGrid(){
    const gridrows = 10;
    const gridcolumns= 10;
    const grid = document.getElementById("grid");
    for (let i = 1; i <= gridrows; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <=gridcolumns; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", "cell" +i +"." +j)
            let idname = cell.setAttribute("id", "cell" +i +"." +j)
            row.appendChild(cell);
            console.log("name:" + idname);
         
        }
        grid.appendChild(row);
    }
}
