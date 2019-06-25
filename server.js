var express = require('express');

var servidor = express();

servidor.get("/", express.static("dist"));

servidor.listen(3000, function(req, res) {
    console.log("Servidor rodando!");
})