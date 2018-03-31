import React from 'react';
import propTypes from "prop-types";
import './Note.css';

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(noteId) {
    this.props.removeNote(noteId);
  }

   render() {
      return (
         <div className="note-item-container">
           <div className="note-item-content">{this.noteContent}</div>
           <button onClick={() => this.handleRemoveNote(this.noteId)} className="note-item-remove-btn">x</button>
         </div>
      );
   }
}

Note.propTypes = {
  noteContent: propTypes.string
}

export default Note;