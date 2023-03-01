function drawLine() {
  let ns = 'http://www.w3.org/2000/svg';
  let svg = document.getElementById('my-svg');
  let startPoint, endPoint, line;

  svg.addEventListener('mousedown', function(event) {
    // Get the position of the SVG element on the page
    let svgRect = svg.getBoundingClientRect();

    // Set the start point of the line relative to the SVG element
    startPoint = {
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top
    };

    // Create a new line element
    line = document.createElementNS(ns, 'line');

    // Set the starting position of the line
    line.setAttribute('x1', startPoint.x);
    line.setAttribute('y1', startPoint.y);

    // Set the line color and width
    line.setAttribute('stroke', 'green');
    line.setAttribute('stroke-width', '2');

    // Add the line to the SVG element
    svg.appendChild(line);

    svg.addEventListener('mousemove', moveHandler);
  });

  function moveHandler(event) {
    // Get the position of the whitebox div on the page
    let whiteboxRect = document.getElementById('whitebox').getBoundingClientRect();
  
    // Set the end point of the line relative to the whitebox div
    endPoint = {
      x: event.clientX - whiteboxRect.left,
      y: event.clientY - whiteboxRect.top
    };
  
    // Set the ending position of the line
    line.setAttribute('x2', endPoint.x);
    line.setAttribute('y2', endPoint.y);
  }  

  svg.addEventListener('mouseup', function(event) {
    svg.removeEventListener('mousemove', moveHandler);
  });

  svg.addEventListener('mouseleave', function(event) {
    svg.removeEventListener('mousemove', moveHandler);
  });
}
