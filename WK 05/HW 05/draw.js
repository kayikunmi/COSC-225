function drawLine() {
  let ns = 'http://www.w3.org/2000/svg';
  let svg = document.getElementById('whitebox');
  let startPoint, endPoint, line;

  svg.addEventListener('mousedown', function(event) {
    // Get the position of the SVG element on the page
    let svgRect = svg.getBoundingClientRect();

    // Set the start point of the line relative to the SVG element
    startPoint = {
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top
    };
    //console.log("StartPoint: " + startPoint);

    // Create a new line element
    line = document.createElementNS(ns, 'line');

    // Set the starting position of the line
    line.setAttribute('x1', startPoint.x);
    line.setAttribute('y1', startPoint.y);

    // Set the line color and width
    line.setAttribute('stroke', 'green');
    line.setAttribute('stroke-width', '4');

    // Add the line to the SVG element
    svg.appendChild(line);
    console.log("You drew a line");

    svg.addEventListener('mouseup', function(event) {
      // Get the position of the SVG element on the page
      let svgRect = svg.getBoundingClientRect();

      // Set the end point of the line relative to the SVG element
      endPoint = {
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top
      };

      // Set the ending position of the line
      line.setAttribute('x2', endPoint.x);
      line.setAttribute('y2', endPoint.y);

      svg.removeEventListener('mousemove', changeMove);
      svg.removeEventListener('mouseup', arguments.callee);
    });

    svg.addEventListener('mousemove', changeMove);
  });

  function changeMove(event) {
    // Get the position of the SVG element on the page
    let svgRect = svg.getBoundingClientRect();

    // Set the end point of the line relative to the SVG element
    endPoint = {
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top
    };

    // Set the ending position of the line
    line.setAttribute('x2', endPoint.x);
    line.setAttribute('y2', endPoint.y);
  }
}
