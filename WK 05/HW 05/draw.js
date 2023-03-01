const svg = document.getElementById("mySvg");
const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");
let line;

point1.addEventListener("click", handlePointClick);
point2.addEventListener("click", handlePointClick);

function handlePointClick() {
  const x1 = parseInt(this.getAttribute("cx"));
  const y1 = parseInt(this.getAttribute("cy"));
  
  if (!line) {
    // create the line element if it doesn't exist yet
    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }
  
  if (this === point1) {
    // user clicked on point1, wait for click on point2
    point2.addEventListener("click", handlePointClick);
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
  } else {
    // user clicked on point2, draw the line
    point2.removeEventListener("click", handlePointClick);
    line.setAttribute("x2", x1);
    line.setAttribute("y2", y1);
  }
}
