import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, rule) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    rule,
  });

// Add note
export const addNote = (id, noteId, noteContent) =>
  db.ref(`users/${id}/notes/note${noteId}`).set({
    noteId,
    noteContent
  });


export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
