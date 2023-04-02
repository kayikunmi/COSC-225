function drawCircle(x, y, r, depth) {
  if (depth <= 0) {
    return;
  }

  // Add circle
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "black");
  var svg = document.getElementById("main-svg");
  svg.appendChild(circle);

  // Add triangles
  var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  var points = [    (x - r) + "," + y,    x + "," + (y - r),    (x + r) + "," + y,    x + "," + (y + r)  ];
  triangle.setAttribute("points", points.join(" "));
  triangle.setAttribute("fill", "rgb(123,165,133)");
  svg.appendChild(triangle);

  // Recursively add smaller circles and triangles
  drawCircle(x - r, y, r * 0.5, depth - 1);
  drawCircle(x + r, y, r * 0.5, depth - 1);
  drawCircle(x, y - r, r * 0.5, depth - 1);
  drawCircle(x, y + r, r * 0.5, depth - 1);
}

drawCircle(325, 325, 150, 4);
