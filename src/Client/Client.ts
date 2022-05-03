import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as net from 'net';
import {EventEmitterClient} from './EventEmitterClient.class';
import {Colors} from '../Note/Note.class';

export type RequestType = {
  type: 'add' | 'modify' | 'delete' | 'print' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: Colors;
}

const client = net.connect({port: 60300});

const socket = new EventEmitterClient(client);

let request: RequestType = {
  type: 'add',
  user: '',
};

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User who is going to add the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'The text of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'The color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.body === 'string' && typeof argv.title === 'string' &&
        typeof argv.user === 'string' && typeof argv.color === 'string') {
      if (argv.color == 'red' || argv.color == 'green' ||
          argv.color == 'blue' || argv.color == 'yellow') {
        request = {
          type: 'add',
          user: argv.user,
          title: argv.title,
          body: argv.body,
          color: argv.color,
        };
      } else {
        console.log(chalk.red('Note color must be red, green, yellow, or blue'));
      }
    }
  },
});

yargs.command({
  command: 'modify',
  describe: 'Modify a note',

  builder: {
    user: {
      describe: 'User who is going to modify a note',
      demandOption: true,
      type: 'string',
    },

    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },

    body: {
      describe: 'The text of the note',
      demandOption: true,
      type: 'string',
    },

    color: {
      describe: 'The color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.body === 'string' && typeof argv.color === 'string' &&
          typeof argv.user === 'string' && typeof argv.title === 'string') {
      if (argv.color != 'blue' && argv.color != 'red' && argv.color != 'yellow' && argv.color != 'green') {
        console.log(chalk.bold.red('Note color must be red, green, blue, or yellow.'));
      } else {
        request = {
          type: 'modify',
          user: argv.user,
          title: argv.title,
          body: argv.body,
          color: argv.color,
        };
      }
    }
  },
});

yargs.command({
  command: 'delete',
  describe: 'Delete a note',
  builder: {
    user: {
      describe: 'User who is going to delete the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      request = {
        type: 'delete',
        user: argv.user,
        title: argv.title,
      };
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List the titles of the notes',
  builder: {
    user: {
      describe: 'User who will show his notes',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      request = {
        type: 'list',
        user: argv.user,
      };
    }
  },
});

yargs.command({
  command: 'print',
  describe: 'Print a specific note from the list',
  builder: {
    user: {
      describe: 'User who will print a note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      request = {
        type: 'print',
        user: argv.user,
        title: argv.title,
      };
    }
  },
});

/**
 * Process the arguments passed from the command line to the application.
 */
yargs.parse();

client.write(JSON.stringify(request) + `\n`, (error) => {
  if (error) {
    console.log(chalk.red(`Error: The note cannot be sent!`));
  }
});

socket.on('message', (jsonRequest) => {
  switch (jsonRequest.type) {
    case 'add':
      if (jsonRequest.success) {
        console.log( chalk.bold.green('New note added!'));
      } else {
        console.log(chalk.bold.red('Note title taken! '));
      }
      break;
    case 'modify':
      if ( jsonRequest.success) {
        console.log(chalk.bold.green( 'Note modified!'));
      } else {
        console.log( chalk.bold.red('The note you want to modify does not exist!'));
      }
      break;
    case 'delete':
      if (jsonRequest.success ) {
        console.log(chalk.bold.green('Note deleted!') );
      } else {
        console.log( chalk.bold.red('Note not found'));
      }
      break;
    case 'list':
      if (jsonRequest.success) {
        console.log('Your notes are:' );
        jsonRequest.notes.forEach((note: any) => {
          console.log( chalk.bold.keyword(note.color)(note.title));
        });
      } else {
        console.log(chalk.bold.red('You have never saved a note!') );
      }
      break;
    case 'print':
      if (jsonRequest.success) {
        console.log( chalk.bold.keyword(jsonRequest.notes[0].color)(jsonRequest.notes[0].title +
                                                      '\n' + jsonRequest.notes[0].body));
      } else {
        console.log( chalk.bold.red('Note not found!') );
      }
      break;
    default:
      console.log(chalk.bold.red('Error: Command not supported!'));
      break;
  }
});

client.on( 'error', (err) => {
  console.log(`Error: Connection failed!: ${err.message}` );
});