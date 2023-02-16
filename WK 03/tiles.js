function makeGrid(){
    const gridrows = 10;
    const gridcolumns= 10;
    const grid = document.getElementById("grid");
    for (let i = 0; i < gridrows; i++) {
        let row = document.createElement("tr");
        console.log(row + i);
        for (let j = 0; j < gridcolumns; j++) {
            let cell = document.createElement("td");
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}