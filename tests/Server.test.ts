import 'mocha';
import {expect} from 'chai';
import {EventEmitterServer} from '../src/Server/EventEmitterServer.class';
import {EventEmitter} from 'events';

describe('Server => EventEmitterServer class tests', () => {
  it('When the message is received, an event is emitted', (done) => {
    const socket = new EventEmitter();
    const server = new EventEmitterServer(socket);

    server.on('request', (message) => {
      expect(message).to.be.eql({'title': 'First note', 'body': 'This is my first note', 'color': 'red'});
      done();
    });
    socket.emit('data', '{"title": "First note",');
    socket.emit('data', '"body": "This is my first note",');
    socket.emit('data', '"color": "red"}');
    socket.emit('data', '\n');
  });
});
