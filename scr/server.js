const express = require ("express")
const server = express ()

//Configurar pasta publica para ser encontrada pelo server
server.use (express.static ("public"))

//Utilizando template engine
const nunjucks = require ("nunjucks")
nunjucks.configure ("scr/views", {
  express: server,
  noCache: true
})

//Configurar caminhos da minha aplicação
//Página inicial
//req: requisição
//res: resposta
//__dirname: Nome do diretório atual - Variável global criada internamente
server.get ("/", (req, res) => {
  return res.render ("index.html") // no index:{{ title }} aqui:{ title: "Seu marketplace de coleta de resíduos"}
})

server.get ("/createPoint", (req, res) => {
  return res.render ("createPoint.html")
})

server.get ("/searchResults", (req, res) => {
  return res.render ("searchResults.html")
})

//ligar o servidor
server.listen (3000)