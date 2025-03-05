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
  { word: "Hospital", cognate: true }, { word: "Door", cognate: false },
  { word: "Telephone", cognate: true }, { word: "Apple", cognate: false },
  { word: "Radio", cognate: true }, { word: "House", cognate: false },
  { word: "Hotel", cognate: true }, { word: "Tree", cognate: false },
  { word: "Comedy", cognate: true }, { word: "Grass", cognate: false },
  { word: "History", cognate: true }, { word: "Sky", cognate: false },
  { word: "Family", cognate: true }, { word: "Train", cognate: false },
  { word: "University", cognate: true }, { word: "Sun", cognate: false },
  { word: "Theater", cognate: true }, { word: "Road", cognate: false },
  { word: "Energy", cognate: true }, { word: "Fish", cognate: false },
  { word: "Territory", cognate: true }, { word: "Window", cognate: false },
  { word: "Festival", cognate: true }, { word: "Mountain", cognate: false },
  { word: "Television", cognate: true }, { word: "Bottle", cognate: false },
  { word: "Automobile", cognate: true }, { word: "Cloud", cognate: false },
  { word: "Restaurant", cognate: true }, { word: "Pencil", cognate: false },
  { word: "Cinema", cognate: true }, { word: "Flower", cognate: false },
  { word: "Delicious", cognate: true }, { word: "River", cognate: false },
  { word: "National", cognate: true }, { word: "Dog", cognate: false },
  { word: "Elegant", cognate: true }, { word: "Laptop", cognate: false },
  { word: "Future", cognate: true }, { word: "Mirror", cognate: false },
  { word: "Positive", cognate: true }, { word: "Table", cognate: false },
  { word: "Negative", cognate: true }, { word: "Wall", cognate: false },
  { word: "Sentimental", cognate: true }, { word: "Bridge", cognate: false },
  { word: "Electric", cognate: true }, { word: "Garden", cognate: false },
  { word: "Romantic", cognate: true }, { word: "Beach", cognate: false },
  { word: "Fantastic", cognate: true }, { word: "Moon", cognate: false },
  { word: "Original", cognate: true }, { word: "Stone", cognate: false },
  { word: "Artificial", cognate: true }, { word: "Fork", cognate: false },
  { word: "Delicate", cognate: true }, { word: "Cup", cognate: false },
  { word: "Cultural", cognate: true }, { word: "Spoon", cognate: false },
  { word: "Logical", cognate: true }, { word: "Knife", cognate: false },
  { word: "Natural", cognate: true }, { word: "Hat", cognate: false },
  { word: "Human", cognate: true }, { word: "Shoe", cognate: false },
  { word: "Symbol", cognate: true }, { word: "Clock", cognate: false },
  { word: "Universal", cognate: true }, { word: "Candle", cognate: false },
  { word: "Scientific", cognate: true }, { word: "Grasshopper", cognate: false },
  { word: "Optimistic", cognate: true }, { word: "Leaf", cognate: false },
  { word: "Magnet", cognate: true }, { word: "Frog", cognate: false },
  { word: "Patriotic", cognate: true }, { word: "Glove", cognate: false },
  { word: "Generous", cognate: true }, { word: "Backpack", cognate: false },
  { word: "Transparent", cognate: true }, { word: "Cactus", cognate: false },
  { word: "Friendly", cognate: true }, { word: "Turtle", cognate: false },
  { word: "Confident", cognate: true }, { word: "Bread", cognate: false },
  { word: "Curious", cognate: true }, { word: "Water", cognate: false },
  { word: "Intelligent", cognate: true }, { word: "Sand", cognate: false },
  { word: "Brilliant", cognate: true }, { word: "Salt", cognate: false },
  { word: "Ambitious", cognate: true }, { word: "Pepper", cognate: false },
  { word: "Harmonious", cognate: true }, { word: "Roof", cognate: false },
  { word: "Mechanical", cognate: true }, { word: "Fence", cognate: false },
  { word: "Photographic", cognate: true }, { word: "Vase", cognate: false },
  { word: "Technological", cognate: true }, { word: "Mat", cognate: false },
  { word: "Magnificent", cognate: true }, { word: "Ladder", cognate: false },
  { word: "Spectacular", cognate: true }, { word: "Broom", cognate: false },
  { word: "Educational", cognate: true }, { word: "Sponge", cognate: false },
  { word: "Logical", cognate: true }, { word: "Curtain", cognate: false },
  { word: "Philosophical", cognate: true }, { word: "Shelf", cognate: false },
  { word: "Universal", cognate: true }, { word: "Bucket", cognate: false },
  { word: "Medical", cognate: true }, { word: "Rug", cognate: false },
  { word: "Political", cognate: true }, { word: "Helmet", cognate: false }
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

  const user = await Score.findOne({
    where: {
      player: name
    }
  })

  if(user === null){
    const newUser = await Score.create({
      player: name,
      ipAddress: ip,
      points: 0
    })
    console.log(newUser)
    res.redirect('/')
  }else{
    const userUpdate = await Score.update({
      ipAddress: ip
    }, {
      where: {
        player: name
      }
    })
    res.redirect("/")
  }
})
// Processar a resposta do jogador
app.post('/check', async (req, res) => {
    const { player, answer, correct } = req.body;
    let points = answer === correct ? 10 : 0;
    const mysql = await Mysql()
    const ip = await Ip()
    console.log(points)

    const updateScore = await mysql.query(`
      UPDATE scores
      SET points = points + ${points}
      WHERE player = '${player}'
    `)
    console.log(updateScore)
    res.redirect('/leaderboard');
});

// Placar de líderes
app.get('/leaderboard', async(req, res) => {
  const mysql = await Mysql()

  const score = await mysql.query(`SELECT * FROM scores ORDER BY points DESC`)
  console.log(score)
  // const scores = await Score.findAll({ order: [['points', 'DESC']] });
  res.render('leaderboard', { score: score[0] });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));