function salvarReclameet() {
    var textoHTML = document.querySelector("#reclameet").value;
    var novoRequest = new XMLHttpRequest();
    novoRequest.open("post", "/novo")
    novoRequest.addEventListener("load", aposSalvarReclameet);
    novoRequest.setRequestHeader("Content-Type", "application/json");
    novoRequest.send(JSON.stringify({
        texto: textoHTML
    }));

    function aposSalvarReclameet() {
        if(novoRequest.status == 200) {
            window.location = "/";
        }
    }
}