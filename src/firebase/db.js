import {
  db
} from './firebase';

// User API
export const doCreateUser = (id, username, email, rule) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    rule,
  });

// Add note
export const addNote = (id, noteContent) => {
  let notesRef = db.ref(`users/${id}/notes`);
  let noteRef = notesRef.push();

  noteRef.set({
    noteContent
  });

  return noteRef;
}

// Remove note
export const removeNote = (id, noteId) => {
  let noteRef = db.ref(`users/${id}/notes/${noteId}`);

  noteRef.remove();
  // let notesRef = db.ref(`users/${id}/notes`);
}

// Get notes
export const getNotes = (id) =>
  db.ref(`users/${id}`).once('value').then(function (snap) {
    return snap.val();
  });

// Get all users
export const onceGetUsers = () =>
  db.ref('users').once('value');