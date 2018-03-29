import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { auth, db } from '../../firebase';
import "./Home.css";
import Note from '../Note/Note';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUserId: '',
      inputValue: '',
      notes: []
    };
    this.addNote = this.addNote.bind(this);
    this.userInput = this.userInput.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    let loggedInUserId = auth.getCurrentUserId();
    let notes;
    const prevNotes = this.state.notes;

    this.setState(() => ({ loggedInUserId: loggedInUserId }));

    db.getNotes(loggedInUserId).then(snap => {
      notes = snap.notes;
      for (var key in notes) {
        if (notes.hasOwnProperty(key)) {
          prevNotes.push({
            id: key,
            noteContent: notes[key].noteContent
          });
        }
      }
      this.setState({ notes: prevNotes });
    });
  }

  addNote(e) {
    // const prevNotes = this.state.notes;
    db.addNote(this.state.loggedInUserId, this.state.inputValue);
    // prevNotes.push({ id: prevNotes.length + 1, noteContent: this.state.inputValue });
    // this.setState({ notes: prevNotes });
    this.setState({ inputValue: '' });
  }

  removeNote(noteId) { }

  userInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Logged in users id:</p> {this.state.loggedInUserId}

        <div className="note-input-container">
          <input
            type="text"
            value={this.state.inputValue}
            placeholder="add note"
            className="note-input"
            onChange={this.userInput}
          />
          <button onClick={() => this.addNote()} className="add-note">+</button>
        </div>

        <div className="note-list-container">
          {
            this.state.notes.map(note => {
              return (
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);