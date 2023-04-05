let svg_ns = "http://www.w3.org/2000/svg";

//Function to draw SS image using circles and diamonds(two triangles)
function drawCircleWithDiamond(x, y, r, depth, scaleFactor) {
  // Base case: if depth is 0, stop recursion
  if (depth <= 0) {
    return;
  }

  //Draw a circle at the given x, y coordinates with the specified radius and scale factor
  let circle = document.createElementNS(svg_ns, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("transform", "scale(" + scaleFactor + ")");

  //Append the circle to the SVG element
  let svg = document.getElementById("main-svg");
  svg.appendChild(circle);

  //Draw a diamond shape (first triangle) at the corners of the circle
  let triangle = document.createElementNS(svg_ns, "polygon");
  let points = (x-r) + "," + y + " " + x + "," + (y-r) + " " + (x+r) + "," + y;
  triangle.setAttribute("points", points);
  triangle.setAttribute("fill", "rgb(123,165,133)");
  triangle.setAttribute("stroke", "none");
  triangle.setAttribute("transform", "scale(" + scaleFactor + ")");
  svg.appendChild(triangle);

  //Clone the diamond shape and rotate it by 180 degrees to draw the other half of the diamond
  let clonedTriangle = triangle.cloneNode(true);
  clonedTriangle.setAttribute("transform", "scale(" + scaleFactor + ") rotate(180 " + x + " " + y + ")");
  svg.appendChild(clonedTriangle);

  // Recursively call the function with reduced radius and depth for each corner of the diamond
  drawCircleWithDiamond(x - r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x + r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x, y - r, r * 0.5, depth - 1, scaleFactor);
  drawCircleWithDiamond(x, y + r, r * 0.5, depth - 1, scaleFactor);
}
