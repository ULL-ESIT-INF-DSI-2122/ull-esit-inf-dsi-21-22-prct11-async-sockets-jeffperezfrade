import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/Note/Note.class';

describe('Note class tests', () => {
  const note = new Note('Jeff', 'Primera nota', 'Hola esta es mi primera nota', 'blue');

  it('The object is not null', () => {
    expect(note).not.to.be.equal(null);
  });

  it('note.user return Jeff', () => {
    expect(note.user).to.be.equal('Jeff');
  });

  it('note.title should return Primera nota', () => {
    expect(note.title).to.be.equal('Primera nota');
  });

  it('note.body should return Hola esta es mi primera nota', () => {
    expect(note.body).to.be.equal('Hola esta es mi primera nota');
  });

  it('note.color should return blue', () => {
    expect(note.color).to.be.equal('blue');
  });
});
