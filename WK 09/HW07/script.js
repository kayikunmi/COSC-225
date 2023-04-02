const canvas = document.getElementById("canvas");
const kochCurve = document.getElementById("koch-curve");

function createTransformedLine(scaleX, scaleY, translateX, translateY, rotate) {
  const newLine = kochCurve.cloneNode(true);
  newLine.setAttribute("transform", `scale(${scaleX}, ${scaleY}) translate(${translateX}, ${translateY}) rotate(${rotate})`);
  canvas.appendChild(newLine);
  return newLine;
}

function drawKochCurve(depth, startX, startY, endX, endY) {
  if (depth === 0) {
    createTransformedLine(1, 1, startX, startY, 0);
    return;
  } else {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const thirdX = startX + deltaX / 3;
    const thirdY = startY + deltaY / 3;
    const twoThirdX = startX + 2 * deltaX / 3;
    const twoThirdY = startY + 2 * deltaY / 3;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 3;
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    drawKochCurve(depth - 1, startX, startY, thirdX, thirdY);
    drawKochCurve(depth - 1, thirdX, thirdY, thirdX + length * Math.cos((angle - 60) * Math.PI / 180), thirdY + length * Math.sin((angle - 60) * Math.PI / 180));
    drawKochCurve(depth - 1, thirdX + length * Math.cos((angle - 60) * Math.PI / 180), thirdY + length * Math.sin((angle - 60) * Math.PI / 180), twoThirdX + length * Math.cos((angle + 60) * Math.PI / 180), twoThirdY + length * Math.sin((angle + 60) * Math.PI / 180));
    drawKochCurve(depth - 1, twoThirdX + length * Math.cos((angle + 60) * Math.PI / 180), twoThirdY + length * Math.sin((angle + 60) * Math.PI / 180), endX, endY);
  }
}

drawKochCurve(5, 50, 250, 450, 250);
