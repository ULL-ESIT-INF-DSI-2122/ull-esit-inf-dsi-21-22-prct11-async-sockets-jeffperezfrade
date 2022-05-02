import * as fs from 'fs';
import * as chalk from 'chalk';
import {Note} from '../Note/Note.class';

export class NoteDatabase {
  constructor() {
    // Empty constructor comment due to Code Smells.
  }

  public addNote(note: Note): boolean {
    if (fs.existsSync(`database/${note.user}/${note.title}.json`)) {
      console.log(chalk.red(`The note already exists!`));
      return false;
    }
    const structureJSON: string = `{"title": "${note.title}", "body": "${note.body}", "color": "${note.color}"}`;
  }
}

