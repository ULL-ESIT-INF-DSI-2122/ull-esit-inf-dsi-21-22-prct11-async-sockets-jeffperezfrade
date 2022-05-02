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
        const notes: Note[] | boolean = noteDatabase.listNotes(note.user);
        if (noteDatabase.listNotes(note.user) == false || notes.length == 0) {
          response.success = false;
        }
      }
    }
  });
});
