const ns = "http://www.w3.org/2000/svg";

const box = document.querySelector("#dot-box");
box.addEventListener("click", drawDot);

function drawDot(e) {
    console.log("you drew a dot");
    let dot = document.createElementNS(ns, 'circle');
    let x = e.clientX;
    let y = e.clientY;
    dot.setAttributeNS(null, "fill", "pink");
    
    dot.classList.add("dot");
    box.appendChild(dot);
    // cx = e.clientX;
    // cy = e.clientY;
    // updateLocation(cx, cy);
    
    

    /* complete this */

}
