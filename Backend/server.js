const express = require("express");

const server = express();

const port = 8000;

const connection = require("./connectionMySQL");

const bodyParser = require("body-parser");

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true }));

server.get("/api/v1/notes", (req, res) => {
  const queryString = "select * from notes";

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        results: result.length,
        data: result,
      });
    }
  });
});

//
server.get("/api/v1/notes/:id", (req, res) => {
  let { id } = req.params;
  const queryString = `select * from Note where NoteId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        data: result,
      });
    }
  });
});

//
server.delete("/api/v1/notes/:id", (req, res) => {
  let { id } = req.params;

  const queryString = `delete from Note where NoteId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Xóa thành công",
      });
    }
  });
});

//
server.post("/api/v1/notes", (req, res) => {
  const { Content, Points } = req.body;

  const newNote = [Content];

  const queryString = "insert into Note(Content) values (?);";

  connection.query(queryString, newNote, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: "OK",
        message: "Thêm mới thành công",
      });
    }
  });
});

//
server.put("/api/v1/notes/:id", (req, res) => {
  const { id } = req.params;

  const { Content } = req.body;

  const newNote = [Content, id];

  const queryString = "update Note set Content=? where NoteId=?";

  connection.query(queryString, newNote, (err) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Cập nhật thành công",
      });
    }
  });
});

server.listen(port, (err, res) => {
  console.log(`http://localhost:${port}`);
});
