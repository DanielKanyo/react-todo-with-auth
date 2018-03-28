import React from 'react';
import propTypes from "prop-types";

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
  }

   render() {
      return (
         <div>
           <p>{this.noteContent}</p>
         </div>
      );
   }
}

Note.propTypes = {
  noteContent: propTypes.string
}

export default Note;