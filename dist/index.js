//Preenchendo a página com os dados da api
var requestReclameets = new XMLHttpRequest();
requestReclameets.open("get", "/reclameets");
requestReclameets.addEventListener("load", preencherPaginaComReclameets)
requestReclameets.send();

function preencherPaginaComReclameets() {
    if(requestReclameets.status == 200) {
        var reclameets = JSON.parse(requestReclameets.response);
        reclameets.forEach(function(reclameet) {
            criarReclameet(reclameet);
        });
    } else {
        alert("Deu ruim");
    }
}

function criarReclameet(reclameet) {
    //Criando um reclameet
    var reclameetElement = document.createElement('div');
    reclameetElement.className = "reclameet reclameet-" + reclameet.id;
    var domString = '<div class="detalhes">' +
        '<img class="foto" src="' + reclameet.usuario.foto +'" alt="Imagem usuário">' +
        '<p class="nome">' + reclameet.usuario.nome + '</p>' +
        '<p class="votos">' + reclameet.likes + '</p>' +
        '<button class="votar" onclick="darLike(' + reclameet.id + ')">' +
            '<img width="20" height="20" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png" alt="ícone coração">' + 
        '</button>' +
    '</div>' +
    '<p class="reclamacao">' + reclameet.texto + '</p>';
    reclameetElement.innerHTML = domString;


    //Adicionando o reclameet criado no div com a classe reclameets
    var divReclameets = document.querySelector('.reclameets');
    divReclameets.appendChild(reclameetElement);
}

//Dar like
function darLike(id) {
    var likeRequest = new XMLHttpRequest();
    likeRequest.open("post", "/like/" + id);
    likeRequest.addEventListener("load", aposDarLike);
    likeRequest.send();

    function aposDarLike() {
        if(likeRequest.status == 200) {
            var reclameetVotos = document.querySelector(".reclameet-" + id + " .votos");
            var resposta = JSON.parse(likeRequest.response);
            reclameetVotos.innerHTML = resposta.likes;
        }
    }
}