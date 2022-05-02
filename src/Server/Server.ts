import * as net from 'net';
import * as chalk from 'chalk';
import {Note} from '../Note/Note.class';
import {NoteDatabase} from '../Note/NoteDatabase.class';
import {EventEmitterServer} from './EventEmitterServer.class';

export type Response = {
  type: 'list' | 'delete' | 'print' | 'add' | 'modify';
  success: boolean;
  notes?: Note [];
}

const server = net.createServer((connection) => {
  const socket = new EventEmitterServer(connection);

  console.log(chalk.green(`Client connected!`));

  socket.on('request', (note) => {
    const noteDatabase: NoteDatabase = new NoteDatabase();
    const response: Response = {
      type: 'add',
      success: true,
    };
    switch (note.type) {
      case 'list': {
        response.type = 'list';
        if (noteDatabase.listNotes(note.user).length == 0) {
          response.success = false;
        } else {
          response.notes = noteDatabase.listNotes(note.user);
        }
        break;
      }
      case 'delete': {
        response.type = 'delete';
        if (!noteDatabase.deleteNote(note)) {
          response.success = false;
        }
        break;
      }
      case 'print': {
        response.type = 'print';
        const noteRead = noteDatabase.printNote(note);
        if (noteDatabase.printNote(note) == false) {
          response.success = false;
        } else if (typeof noteRead !== 'boolean') {
          response.notes = [noteRead];
        }
        }
      }
    }
  });
});
