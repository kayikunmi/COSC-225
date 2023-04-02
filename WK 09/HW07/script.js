function drawCircle(x, y, r, depth, scaleFactor) {
  if (depth <= 0) {
    return;
  }

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("transform", "scale(" + scaleFactor + ")");

  var svg = document.getElementById("main-svg");
  svg.appendChild(circle);

  drawCircle(x - r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircle(x + r, y, r * 0.5, depth - 1, scaleFactor);
  drawCircle(x, y - r, r * 0.5, depth - 1, scaleFactor);
  drawCircle(x, y + r, r * 0.5, depth - 1, scaleFactor);
}

function drawTriangle(x, y, r, depth, scaleFactor) {
  if (depth <= 0) {
    return;
  }

  var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  var points = (x-r) + "," + y + " " + x + "," + (y-r) + " " + (x+r) + "," + y;
  triangle.setAttribute("points", points);
  triangle.setAttribute("fill", "rgb(123,165,133)");
  triangle.setAttribute("stroke", "none");
  triangle.setAttribute("transform", "scale(" + scaleFactor + ")");

  var svg = document.getElementById("main-svg");
  svg.appendChild(triangle);

  drawTriangle(x - r, y, r * 0.5, depth - 1, scaleFactor);
  drawTriangle(x + r, y, r * 0.5, depth - 1, scaleFactor);
  drawTriangle(x, y - r, r * 0.5, depth - 1, scaleFactor);
  drawTriangle(x, y + r, r * 0.5, depth - 1, scaleFactor);
}

var scaleFactor = 0.5;
drawCircle(600, 600, 300, 4, scaleFactor);
drawTriangle(600, 600, 300, 4, scaleFactor);
