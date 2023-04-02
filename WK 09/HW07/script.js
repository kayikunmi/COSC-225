function drawCircle(x, y, r, depth) {
  if (depth <= 0) {
    return;
  }

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("transform", "rotate(" + (x + y) + " " + x + " " + y + ")");

  var svg = document.getElementById("main-svg");
  svg.appendChild(circle);

  drawCircle(x - r, y, r * 0.5, depth - 1);
  drawCircle(x + r, y, r * 0.5, depth - 1);
  drawCircle(x, y - r, r * 0.5, depth - 1);
  drawCircle(x, y + r, r * 0.5, depth - 1);
}

drawCircle(325,325, 150, 4);
