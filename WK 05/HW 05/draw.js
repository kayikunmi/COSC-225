function drawLine(){
  let ns = 'http://www.w3.org/2000/svg';
  let svg = document.getElementById('whitebox');
  let startPoint, endPoint, line;

  svg.addEventListener('click', startDrawing);

  function startDrawing(event){
    let svgRect = svg.getBoundingClientRect();

    // the start point has to be relative to the position of the box
    startPoint ={
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top
    };

    line = document.createElementNS(ns, 'line');

    // set the starting position of the line
    line.setAttribute('x1', startPoint.x);
    line.setAttribute('y1', startPoint.y);
    line.setAttribute('stroke', 'green');
    line.setAttribute('stroke-width', '2');

    svg.appendChild(line);
    svg.addEventListener('mousemove', continueDrawing);
    svg.addEventListener('click', stopDrawing);
    console.log("Called startDrawing");
  }

  function continueDrawing(event){
    let svgRect = svg.getBoundingClientRect();

    // the end point has to be relative to the position of the box
    endPoint ={
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top
    };

    // set the ending position of the line
    line.setAttribute('x2', endPoint.x);
    line.setAttribute('y2', endPoint.y);
    console.log("Called continueDrawing");
  }

  function stopDrawing(event){
    let svgRect = svg.getBoundingClientRect();

    // the end point has to be relative to the position of the box
    endPoint ={
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top
    };

    // set the ending position of the line
    line.setAttribute('x2', endPoint.x);
    line.setAttribute('y2', endPoint.y);

    svg.removeEventListener('mousemove', continueDrawing);
    svg.removeEventListener('click', stopDrawing);
    console.log("Called stopDrawing");

    // add click listener to start new line
    line.addEventListener('click', startDrawing);
    svg.removeChild(line);
  }
}
