const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())


app.get("/", (req, res) => {
  res.send("Hello Express");
});

//情報を全て取得する
app.get("/news", (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            pool.query("SELECT * from info", (error, results) => {
                return res.status(200).json(results.rows);
              });            
        } catch (error) {
            console.error(error)
        }
});


//特定の情報を取得する
app.get("/news/:id", (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * from info WHERE id = $1", [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
});


app.listen(PORT, () => {
  console.log("server is running on PORT" + PORT);
});
