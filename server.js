var express = require('express');
var bodyParser = require('body-parser');

var servidor = express();
servidor.use(bodyParser.json());

servidor.get("/", express.static("dist"));

var usuarios = [
    { id: 0, nome: "Soham Patterson", foto: "https://randomuser.me/api/portraits/men/72.jpg" },
    { id: 1, nome: "Gabriel Chapman", foto: "https://randomuser.me/api/portraits/men/66.jpg" },
    { id: 2, nome: "Ashley Carpenter", foto: "https://randomuser.me/api/portraits/women/40.jpg" },
    { id: 3, nome: "Ken Rose", foto: "https://randomuser.me/api/portraits/men/68.jpg" },
    { id: 4, nome: "Raymond Diaz", foto: "https://randomuser.me/api/portraits/men/31.jpg" },
];

var reclameets = [
    { id: 0, usuario: 0, texto: "Esse site não é bonito o suficiente", likes: 3 },
    { id: 1, usuario: 4, texto: "A vida tem gráficos bons demais, sou mais fã de 8bits", likes: 5 },
    { id: 2, usuario: 2, texto: "Por que a água é tão molhada? Eu preferiria que fosse mais seca", likes: 0 },
    { id: 3, usuario: 3, texto: "Por que devo esperar tanto pra jogar Elden Ring, estou com muito hype agora!", likes: 1 },
    { id: 4, usuario: 1, texto: "As reclamações desse site não são boas o suficiente", likes: 2 },
]

servidor.get("/reclameets", function(req, res) {
    res.send(reclameets);
});

servidor.post("/novo", function(req, res) {
    var novo = req.body;
    if(novo) {
        novo.id = reclameets[reclameets.length - 1].id + 1;
        novo.likes = 0;
        reclameets.push(novo);
        res.sendStatus(200);
    }
    res.sendStatus(400);
});

servidor.post("/like/:id", function(req, res) {
    var reclameet = reclameets.find((r) => r.id == req.params.id);
    if(reclameet) {
        reclameet.likes += 1;
        res.sendStatus(200);
    }
    res.sendStatus(400);
});

servidor.listen(3000, function(req, res) {
    console.log("Servidor rodando!");
})