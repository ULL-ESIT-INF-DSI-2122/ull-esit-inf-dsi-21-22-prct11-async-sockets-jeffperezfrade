import 'mocha';
import * as fs from 'fs';
import {expect} from 'chai';
import {NotesDatabase} from '../src/Note/NotesDatabase.class';
import {Note} from '../src/Note/Note.class';

describe('NotesDatabase class tests', () => {
  const notesDatabase = new NotesDatabase();
  const note1: Note = new Note('Jeff', 'Nota 1', 'Hola esta es mi primera nota', 'blue');
  const note2: Note = new Note('Jonh', 'Nota 2', 'Hola soy Jonh', 'red');
  const note3: Note = new Note('Jonh', 'Nota 3', 'Hola esta es mi tercera nota', 'yellow');

  it('The object should be created', () => {
    expect(notesDatabase).not.to.be.equal(null);
  });

  it('notesDatabase.addNote() should return true', () => {
    expect(notesDatabase.addNote(note1)).to.be.equal(true);
    expect(notesDatabase.addNote(note2)).to.be.equal(true);
    expect(notesDatabase.addNote(note3)).to.be.equal(true);
  });

  it('Database folder was created correctly', () => {
    expect(fs.existsSync(`database/`)).to.be.equal(true);
  });

  it('Try to add a note that already exists should return false', () => {
    const note1: Note = new Note('Jeff', 'Nota 1', 'Hola esta es mi primera nota', 'blue');
    expect(notesDatabase.addNote(note1)).to.be.equal(false);
  });

  it('notesDatabase.modifyNote() should return true', () => {
    const note2: Note = new Note('Jonh', 'Nota 2', 'Yellow note', 'yellow');
    expect(notesDatabase.modifyNote(note2)).to.be.equal(true);
  });

  it('notesDatabase.modifyNote() should return false because it does not exist', () => {
    const note2: Note = new Note('Jonh', 'Nota 99', 'Yellow note', 'yellow');
    expect(notesDatabase.modifyNote(note2)).to.be.equal(false);
  });

  it('notesDatabase.listNotes() returns [note1]', () => {
    expect(notesDatabase.listNotes('Jeff')).to.be.eql([note1]);
  });
  it('notesDatabase.listNotes() returns [note1]', () => {
    expect(notesDatabase.listNotes('Mike')).to.be.eql([]);
  });

  it('notesDatabase.printNote() should return the Title and the Body of the note', () => {
    expect(notesDatabase.printNote(note1)).to.be.eql(new Note('Jeff', 'Nota 1', 'Hola esta es mi primera nota', 'blue'));
  });

  it('notesDatabase.printNote() should return the Title and the Body of the note', () => {
    const note3: Note = new Note('Jack', 'Nota 3', 'Hola esta es mi primera nota', 'blue');
    expect(notesDatabase.printNote(note3)).to.be.eql(false);
  });

  it('notesDatabase.deleteNote() should return true', () => {
    expect(notesDatabase.deleteNote(note2)).to.be.equal(true);
  });

  it('notesDatabase.deleteNote() should return false because does not exist', () => {
    expect(notesDatabase.deleteNote(note2)).to.be.equal(false);
    // So we dont need to delete the folder every time we do tests.
    fs.rmdirSync('./database', {recursive: true});
  });
});
