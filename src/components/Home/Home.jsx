import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { auth, db } from '../../firebase';
import "./Home.css";
import Note from '../Note/Note';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/iconic/plus';

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
    let previousNotes = this.state.notes;

    this.setState(() => ({ loggedInUserId: loggedInUserId }));

    db.getNotes(loggedInUserId).then(snap => {
      notes = snap.notes;
      for (var key in notes) {
        if (notes.hasOwnProperty(key)) {
          previousNotes.push({
            id: key,
            noteContent: notes[key].noteContent
          });
        }
      }
      this.setState({ notes: previousNotes });
    });
  }

  componentWillMount() {

  }

  addNote(e) {
    let previousNotes = this.state.notes;
    let inputValue = this.state.inputValue;

    if (inputValue) {
      db.addNote(this.state.loggedInUserId, this.state.inputValue).then(snap => {
        previousNotes.push({
          id: snap.key,
          noteContent: inputValue
        });

        this.setState({
          notes: previousNotes
        });
      });

      this.setState({ inputValue: '' });
    }

  }

  removeNote(noteId) {
    let loggedInUserId = this.state.loggedInUserId;
    let previousNotes = this.state.notes;

    db.removeNote(loggedInUserId, noteId);

    for (let i = 0; i < previousNotes.length; i++) {
      if (previousNotes[i].id === noteId) {
        previousNotes.splice(i, 1);
      }
    }

    this.setState({
      notes: previousNotes
    });
  }

  userInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <div>
        {/* <h1>Home</h1>
        <p>Logged in users id:</p> {this.state.loggedInUserId} */}

        <div className="note-input-container">
          <input
            type="text"
            value={this.state.inputValue}
            placeholder="Add note here..."
            className="note-input"
            onChange={this.userInput}
          />
          <button onClick={() => this.addNote()} className="add-note">
            <Icon icon={plus} />
          </button>
        </div>

        <div className="note-list-container">
          {
            this.state.notes.map(note => {
              return (
                <Note
                  noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id}
                  removeNote={this.removeNote}
                />
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