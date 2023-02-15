function sayHello(n) {
    const helloElement = document.querySelector("#grid"); //this is the name of the grid
    console.log("#hello");
    for (let i = 1; i <= n; i++) {
	    let para = document.createElement("p"); //crate paragraph elemt
	    para.textContent = "Hello, World! " + i;
	    helloElement.appendChild(para);
    }
}
