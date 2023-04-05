let svg_ns = "http://www.w3.org/2000/svg";

function drawCircleWithDiamond(x, y, r, depth, scaleFactor) {
  if (depth <= 0) {
    return;
  }

  let circle = document.createElementNS(svg_ns, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("transform", "scale(" + scaleFactor + ")");

  let svg = document.getElementById("main-svg");
  svg.appendChild(circle);

  let triangle = document.createElementNS(svg_ns, "polygon");
  let points = (x-r) + "," + y + " " + x + "," + (y-r) + " " + (x+r) + "," + y;
  triangle.setAttribute("points", points);
  triangle.setAttribute("fill", "rgb(123,165,133)");
  triangle.setAttribute("stroke", "none");
  triangle.setAttribute("transform", "scale(" + scaleFactor + ")");
  svg.appendChild(triangle);

  let clonedTriangle = triangle.cloneNode(true);
  clonedTriangle.setAttribute("transform", "scale(" + scaleFactor + ") rotate(180 " + x + " " + y + ")");
  svg.appendChild(clonedTriangle);

  drawCircleWithDiamond(x - r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x + r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x, y - r, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x, y + r, r * 0.5, depth - 1, scaleFactor);
}

// let scaleFactor = 0.5;
// drawCircleWithDiamond(600, 600, 300, 6, scaleFactor);
