let svg_ns = "http://www.w3.org/2000/svg";

function drawCircleWithDiamond(x, y, r, depth, scaleFactor) {
  if (depth <= 0) {
    return;
  }

  // Create and append the circle
  let circle = document.createElementNS(svg_ns, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("transform", "scale(" + scaleFactor + ")");
  let svg = document.getElementById("main-svg");
  svg.appendChild(circle);

  // Create and append the first triangle
  let triangle1 = document.createElementNS(svg_ns, "polygon");
  let points1 = (x-r) + "," + y + " " + x + "," + (y-r) + " " + (x+r) + "," + y;
  triangle1.setAttribute("points", points1);
  triangle1.setAttribute("fill", "rgb(123,165,133)");
  triangle1.setAttribute("stroke", "black");
  triangle1.setAttribute("transform", "scale(" + scaleFactor + ")");
  svg.appendChild(triangle1);

  // Create and append the second triangle
  let triangle2 = document.createElementNS(svg_ns, "polygon");
  let points2 = (x-r) + "," + y + " " + x + "," + (y+r) + " " + (x+r) + "," + y;
  triangle2.setAttribute("points", points2);
  triangle2.setAttribute("fill", "rgb(123,165,133)");
  triangle2.setAttribute("stroke", "black");
  triangle2.setAttribute("transform", "scale(" + scaleFactor + ")");
  svg.appendChild(triangle2);

  // Recursively call the function for the four smaller circles
  drawCircleWithDiamond(x - r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x + r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x, y - r, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x, y + r, r * 0.5, depth - 1, scaleFactor);
}
