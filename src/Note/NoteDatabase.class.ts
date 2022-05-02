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
    if (fs.existsSync(`database/${note.user}`)) {
      fs.appendFileSync(`database/${note.user}/${note.title}.json`, structureJSON);
    } else {
      fs.mkdirSync(`database/${note.user}`, {recursive: true});
      fs.appendFileSync(`database/${note.user}/${note.title}.json`, structureJSON);
    }
    console.log(chalk.green(`${note.title} note added to ${note.user} folder!`));
    return true;
  }

  public modifyNote(note: Note): boolean {
    if (!fs.existsSync(`database/${note.user}/${note.title}.json`)) {
      console.log(chalk.red(`Error: ${note.title} does not exist!`));
      return false;
    } else {
      const structureJSON: string = `{"title": "${note.title}", "body": "${note.body}", "color": "${note.color}"}`;
      fs.writeFileSync(`database/${note.user}/${note.title}.json`, structureJSON);
      console.log(chalk.green(`${note.title} modified!`));
      return true;
    }
  }

  public deleteNote(note: Note): boolean {
    if (!fs.existsSync(`database/${note.user}/${note.title}.json`)) {
      console.log(chalk.red(`Error: ${note.title} does not exist!`));
      return false;
    } else {
      fs.rmSync(`database/${note.user}/${note.title}.json`);
      console.log(chalk.green(`${note.title} note deleted!`));
      return true;
    }
  }

  public listNotes(user: string): Note[] | boolean {
    if (!fs.existsSync(`database/${user}`)) {
      console.log(chalk.red(`Error: User ${user} not found!`));
      return false;
    } else {
      const totalFiles: string[] = fs.readdirSync(`database/${user}`);
      const notes: Note[] = [];
      totalFiles.forEach((file) => {
        const content: string = fs.readFileSync(`database/${user}/${file}`, {encoding: 'utf-8'});
        const parsedJSON = JSON.parse(content);
        notes.push(new Note(user, parsedJSON.title, parsedJSON.body, parsedJSON.color));
      });
      return notes;
    }
  }

  public printNote(note: Note): Note | boolean {
    if (!fs.existsSync(`database/${note.user}/${note.title}.json`)) {
      console.log(chalk.red(`Error: ${note.title} does not exist!`));
      return false;
    } else {
      const content: string = fs.readFileSync(`database/${note.user}/${note.title}`, {encoding: 'utf-8'});
      const parsedJSON = JSON.parse(content);
      const newNote: Note = new Note(note.user, parsedJSON.title, parsedJSON.body, parsedJSON.color);
      return newNote;
    }
  }
}
