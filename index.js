const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require("path")
const mysql2 = require("mysql2");
const Score = require('./models/Score.js');
const { sequelize, Mysql } = require('./config/db.js');
const { Sequelize } = require('sequelize');
const app = express();
const PORT = 3000;

async function Ip(){
  const consume = await fetch("https://api64.ipify.org/")
  const response = await consume.text()

  return response
}



// Array de palavras cognatas e não cognatas
const words = [
    { word: "Animal", cognate: true }, { word: "Book", cognate: false },
    { word: "Color", cognate: true }, { word: "Car", cognate: false },
    { word: "Doctor", cognate: true }, { word: "Bird", cognate: false },
    { word: "Music", cognate: true }, { word: "Chair", cognate: false },
    { word: "Hospital", cognate: true }, { word: "Door", cognate: false }
];

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set("views", path.join(__dirname + "/views"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")))





// Página principal do jogo
app.get('/', async(req, res) => {
    // const randomWord = words[Math.floor(Math.random() * words.length)];
    // res.render('game', { word: randomWord.word, isCognate: randomWord.cognate });
    const ip = await Ip()
    const mysql = await Mysql()

    // const [ player, rows ] = await mysql.query(`
    //   SELECT *
    //   FROM Score
    //   WHERE ipAddress = '${ip}'
    // `)

    const player = await Score.findOne({
      where: {
        ipAddress: ip
      }
    })

    if(player === null){
      res.redirect("/new/user")
    }else{
      const randomWord = words[Math.floor(Math.random() * words.length)];
      res.render('game', { word: randomWord.word, isCognate: randomWord.cognate });
    }
});
// novo usuario
app.get("/new/user", async(req, res)=>{
  res.render('newUser') 
})
app.post("/new/user", async(req, res)=>{
  const ip = await Ip()
  const { name } = req.body;
  const mysql = await Mysql()

  const newUser = await mysql.query(`
    INSERT INTO Score (player, ipAddress)
    VALUES ('${name}', '${ip}')
  `)
  console.log(newUser)

  res.redirect('/')
})
// Processar a resposta do jogador
app.post('/check', async (req, res) => {
    const { player, answer, correct } = req.body;
    let points = answer === correct ? 10 : 0;
    const mysql = await Mysql()
    const ip = await Ip()
    console.log(points)
    const playerScore = await mysql.query(`
      SELECT *
      FROM Score
      WHERE player = '${player}' AND ipAddress = '${ip}'
    `)

    const newScore = await mysql.query(`
      UPDATE Score
      SET points = points + ${points}
      WHERE player = '${player}' AND ipAddress = '${ip}'
    `)
    console.log(newScore)
    res.redirect('/leaderboard');
});

// Placar de líderes
app.get('/leaderboard', async(req, res) => {
  const mysql = await Mysql()

  const score = await mysql.query(`SELECT * FROM Score ORDER BY points DESC`)
  console.log(score)
  // const scores = await Score.findAll({ order: [['points', 'DESC']] });
  res.render('leaderboard', { score: score[0] });
});

// Sincroniza banco de dados e inicia o servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
});
