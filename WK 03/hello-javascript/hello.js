function sayHello(n) {
    const helloElement = document.querySelector("#hello");
    for (let i = 1; i <= n; i++) {
	let para = document.createElement("p");
	para.textContent = "Hello, World! " + i;
	helloElement.appendChild(para);
    }
}
