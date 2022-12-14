const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(cors())


app.get("/", (req, res) => {
  res.send("Hello Express");
});

//ユーザー情報を全て取得する
app.get("/news", (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            // res.status(201).send('ok')
            // res.status(200).json({title: "i"})
            // res.json({title: "i"})
            pool.query("SELECT * from info", (error, results) => {
                return res.status(200).json(results.rows);
              });
        } catch (error) {
            console.error(error)
        }
});

// router.get('/', (req, res) => {
//     try {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//         res.status(201).send('ok')
//     } catch (error) {
//         console.error(error)
//     }
// })

//特定のユーザーを取得する
app.get("/news/:id", (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * from info WHERE id = $1", [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
});

// //ユーザーを追加する
// app.post("/users", (req, res) => {
//   const { name, email, age } = req.body;
//   //ユーザーが既に存在しているかどうか確認
//   pool.query(
//     "SELECT s from users s WHERE s.email = $1",
//     [email],
//     (error, results) => {
//       if (results.rows.length) {
//         return res.send("既にユーザーが存在しています");
//       }

//       pool.query(
//         "INSERT INTO users(name,email,age) values($1,$2,$3)",
//         [name, email, age],
//         (error, results) => {
//           if (error) throw error;
//           res.status(201).send("ユーザーの作成に成功しました");
//         }
//       );
//     }
//   );
// });

// //ユーザーを削除する
// app.delete("/users/:id", (req, res) => {
//     const id = req.params.id;

//     pool.query("SELECT * from users WHERE id = $1", [id], (error, results) => {
//         if (error) throw error;
//         // return res.status(200).json(results.rows);
//         const isUserExised = results.rows.length;
//         if(!isUserExised) {
//             return res.send("ユーザーが存在しません")
//         }
        
//         pool.query("DELETE from users WHERE id = $1", [id], (error, results) => {
//             if (error) throw error;
//             return res.status(200).send("削除に成功しました");
//           });

//       });
  
    
//   });

//   //ユーザーを更新する
// app.put("/users/:id", (req, res) => {
//     const id = req.params.id;
//     const name = req.body.name;

//     pool.query("SELECT * from users WHERE id = $1", [id], (error, results) => {
//         if (error) throw error;
//         // return res.status(200).json(results.rows);
//         const isUserExised = results.rows.length;
//         if(!isUserExised) {
//             return res.send("ユーザーが存在しません")
//         }
        
//         pool.query("UPDATE users SET name = $1 WHERE id = $2", [name,id], (error, results) => {
//             if (error) throw error;
//             return res.status(200).send("更新に成功しました");
//           });

//       });
  
    
//   });


app.listen(PORT, () => {
  console.log("server is running on PORT" + PORT);
});