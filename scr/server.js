const express = require ("express")
const server = express ()

//Pegar o banco de dados
const db = require ("./database/db.js")

//Configurar pasta publica para ser encontrada pelo server
server.use (express.static ("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use (express.urlencoded ({ extended: true }))

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
  
  //Querry Strings da nossa URL
  //req.query

  return res.render ("createPoint.html")
})

server.post ("/savePoint", (req, res) => {
  //O corpo do nosso formulário
  //req.body

  //Inserir dados no banco de dados
  const query = `
    INSERT INTO places (
      name,
      image,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  
  const values = [ 
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
   ]

  function afterInsertData(err) {
    if (err) {
      return console.log
    }
    
    return res.render ("createPoint.html", { saved: true })
  }

  db.run (query, values, afterInsertData)
  
})

server.get ("/searchResults", (req, res) => {

  const search = req.query.search

  if (search == "") {
    //Pesquisa vazia
    return res.render ("searchResults.html", { total: 0 })
  }

  //pegar dados do banco de dados
  db.all (`SELECT * FROM places WHERE city LIKE '%${ search }%'`, function (err, rows) {
    if (err) {
      return console.log
    }

    const total = rows.length

    //Mostrar a página html com os dados do banco de dados
    return res.render ("searchResults.html", { places: rows, total: total })
  })

})

//ligar o servidor
server.listen (3000)