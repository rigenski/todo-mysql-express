const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_mysql",
});

con.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

//  ENDPOINT GET ALL DATA
app.get("/api/v2/todo", (req, res) => {
  con.query("SELECT * FROM todo", (err, result) => {
    if (err) {
      res.send({ status: "error", result: err.message });
    } else {
      res.send({ status: "succes", result });
    }
  });
});

//  ENDPOINT GET DATA BY ID
app.get("/api/v2/todo/:id", (req, res) => {
  con.query(`SELECT * FROM todo WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      res.send({ status: "error", result: err.message });
    } else {
      res.send({ status: "succes", result });
    }
  });
});

//  ENDPOINT POST TO ADD DATA
app.post("/api/v2/todo", (req, res) => {
  let data = {
    name: req.body.name,
    result: req.body.result,
  };

  con.query("INSERT INTO todo SET ?", data, (err, data) => {
    if (err) {
      res.send({ status: "error", data: err.message });
    } else {
      res.send({ status: "succes", data });
    }
  });
});

//  ENDPOINT PUT TO UPDATA DATA
app.put("/api/v2/todo/:id", (req, res) => {
  let sql = `UPDATE todo SET name="${req.body.name}", result="${req.body.result}" WHERE id="${req.params.id}"`;
  con.query(sql, (err, result) => {
    if (err) {
      res.send({ status: "error", result: err.message });
    } else {
      res.send({ status: "succes", result });
    }
  });
});

//  ENDPOINT DELETE DATA
app.delete("/api/v2/todo/:id", (req, res) => {
  con.query(`DELETE FROM todo WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      res.send({ status: "error", result: err.message });
    } else {
      res.send({ status: "succes", result });
    }
  });
});

app.listen(4000, (err) => {
  console.log("done, in the server 4000");
});
