import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateNote";
import axios from "axios";
// import {Container,Row,Col} from "react-bootstrap";

function App() {
  const [notes, setNotes] = useState([]);
  axios.get("http://mern-notes-keeper.herokuapp.com/").then(res=>setNotes(res.data));
  
  function addNote(newNote) {
    const notes = {
      title: newNote.title,
      content: newNote.content,
    };
    axios.post("http://mern-notes-keeper.herokuapp.com/add", notes).then(
      axios.get("http://mern-notes-keeper.herokuapp.com/").then((res) => {
        res.data.length > 0 && setNotes(res.data);
      })
    );
  }

  function deleteNote(id) {
    axios
      .delete("http://mern-notes-keeper.herokuapp.com/" + id);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
    
  );
}

export default App;
