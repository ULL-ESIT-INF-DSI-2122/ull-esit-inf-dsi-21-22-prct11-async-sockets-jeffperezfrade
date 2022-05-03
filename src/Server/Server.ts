import * as net from 'net';
import * as chalk from 'chalk';
import {Note} from '../Note/Note.class';
import {NoteDatabase} from '../Note/NoteDatabase.class';
import {EventEmitterServer} from './EventEmitterServer.class';

export type ResponseType = {
  type: 'add' | 'modify' | 'delete' | 'print' | 'list';
  success: boolean;
  notes?: Note[];
}
/**
 * A server is created with the net module of Node.js.
 */
const server = net.createServer((connection) => {
  /**
   * An object of class MessageEventEmitterServer is created.
   */
  const socket = new EventEmitterServer(connection);

  console.log(chalk.green(`Client connected!`));

  /**
   * When the request event is received, the message sent by the client is processed.
   */
  socket.on('request', (note) => {
    const database = new NoteDatabase();
    const response: ResponseType = {
      type: 'add',
      success: true,
    };
    switch (note.type) {
      case 'add':
        // const newNote = new Note(note.user, note.title, note.body, note.color);
        if (!database.addNote(note)) {
          response.success = false;
        }
        break;
      case 'modify':
        response.type = 'modify';
        if (!database.modifyNote(note)) {
          response.success = false;
        }
        break;
      case 'delete':
        response.type = 'delete';
        if (!database.deleteNote(note)) {
          response.success = false;
        }
        break;
      case 'list':
        response.type = 'list';
        const listNotes: Note[] = database.listNotes(note.user);
        if (listNotes.length == 0) {
          response.success = false;
        } else {
          response.notes = listNotes;
        }
        break;
      case 'print':
        response.type = 'print';
        const noteContent = database.printNote(note);
        if (noteContent == false) {
          response.success = false;
        } else if (typeof noteContent !== 'boolean') {
          response.notes = [noteContent];
        }
        break;
      default:
        console.log(chalk.red(`Error: Command not supported!`));
        break;
    }

    /**
     * The response is sent to the client.
     */
    connection.write(JSON.stringify(response), (error) => {
      if (error) {
        console.log(chalk.red(`Error: Response not sent!`));
      } else {
        console.log(chalk.green(`Response sent!`));
        connection.end();
      }
    });
  });

  /**
   * If there is an error in the connection it is handled properly.
   */
  connection.on('error', (err) => {
    if (err) {
      console.log(`Connection failed! - ${err.message}`);
    }
  });

  /**
   * When a client disconnects a message informing about this is displayed
   * on the server.
   */
  connection.on('close', () => {
    console.log(chalk.green(`Client disconnected.`));
  });
});

/**
 * The server is listening on port 60300.
 */
server.listen(60300, () => {
  console.log(chalk.green(`Waiting clients...\n`));
});
