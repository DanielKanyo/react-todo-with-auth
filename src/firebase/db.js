import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, rule) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    rule,
  });

// Add note
export const addNote = (id, noteContent) =>
  db.ref(`users/${id}/notes`).push().set({
    noteContent
  });

export const getNotes = (id) =>
  db.ref(`users/${id}`).once('value').then(function(snap) {
    return snap.val();
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
