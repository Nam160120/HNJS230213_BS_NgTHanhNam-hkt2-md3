import React, { useEffect, useState } from "react";
import axios from "axios";
import './MainNote.css';

const [notes, setNotes] = useState([]);
const [content, setContent] = useState("");
const [showLoading, setShowLoading] = useState(false);
const [showDialogSuccess, setShowDialogSuccess] = useState(false);

const loadData = async () => {
  setShowLoading(true);
  await axios
    .get("http://localhost:8000/api/v1/notes")
    .then((res) => {
      setNotes(res.data);
    })
    .catch((err) => console.log(err));
  setShowLoading(false);
};
useEffect(() => {
  loadData();
}, []);

const handleDelete = (id) => {
  axios
    .delete(`http://localhost:8000/api/v1/notes/${id}`)
    .then((res) => {
      if (res.data.status === "OK") {
        loadData();
        setTimeout(() => {
          setShowDialogSuccess(true);
        }, 200);
      }
    })
    .catch((err) => console.log(err));
};

const newNote = {
  Content: content,
};

const handleSubmit = () => {
  console.log(newNote);
  axios
    .post("http://localhost:8000/api/v1/notes/", newNote)
    .then((res) => {
      console.log(res.data);
      setContent("");
      loadData();
    })
    .catch((err) => console.log(err));
};

function MainNote(props) {
  return (
    <div>
      <h1>Note App</h1>
      <div>
        <label htmlFor="">Title</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button onClick={handleSubmit}>+</button>
      </div>
      <div className="container">
        {notes.data?.map((note) => (
          <div key={note.noteId}>
            <div>
              <div>{feedback.Points}</div>
              <div>
                <div
                  className="delete"
                  onClick={() => handleDelete(note.noteId)}
                ></div>
              </div>
            </div>
            <div>{note.Content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainNote;
