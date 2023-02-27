const ns = "http://www.w3.org/2000/svg";

const box = document.querySelector("#dot-box");
box.addEventListener("click", clickBox);

function clickBox(e) {
    const para = document.querySelector("#text-box");
    para.innerHTML = para.innerHTML + "you clicked the box!<br/>"
}
