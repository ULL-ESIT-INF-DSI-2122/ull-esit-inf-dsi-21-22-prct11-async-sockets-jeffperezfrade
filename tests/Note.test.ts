import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/Note/Note.class';

describe('Note class tests', () => {
  const nota = new Note('Jeff', 'Primera nota', 'Hola esta es mi primera nota', 'blue');

  it('The object is not null', () => {
    expect(nota).not.to.be.equal(null);
  });

  it('nota.user return Jeff', () => {
    expect(nota.user).to.be.equal('Jeff');
  });

  it('nota.title should return Primera nota', () => {
    expect(nota.title).to.be.equal('Primera nota');
  });

  it('nota.body should return Hola esta es mi primera nota', () => {
    expect(nota.body).to.be.equal('Hola esta es mi primera nota');
  });

  it('nota.color should return blue', () => {
    expect(nota.color).to.be.equal('blue');
  });
});
