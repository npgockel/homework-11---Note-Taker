var express = require("express");
const app = express();
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
let db = require("./db/db.json");

app.use(express.static("public"));

const port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'))

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  console.log("r we getting from form ?", req.body);
  var note = req.body
  note.id = db.length+1
  db.push(req.body);
  console.log(db);
  res.send();
});

app.delete("/api/notes/:id", function (req, res) {
  console.log(req.params.id);
  db = db.filter(singleDude => singleDude.id != req.params.id )
  console.log(db);
  res.json(db);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
