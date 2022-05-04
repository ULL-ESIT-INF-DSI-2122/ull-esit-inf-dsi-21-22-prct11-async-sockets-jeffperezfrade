import 'mocha';
import {expect} from 'chai';
import {EventEmitterClient} from '../src/Client/EventEmitterClient.class';
import {EventEmitter} from 'events';

describe('Client -> EventEmitterClient class tests', () => {
  it('When the message is received, an event is emitted', (done) => {
    const socket = new EventEmitter();
    const client = new EventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({'title': 'First note', 'body': 'Hello I am Jeff', 'color': 'blue'});
      done();
    });

    socket.emit('data', '{"title": "First note",');
    socket.emit('data', '"body": "Hello I am Jeff",');
    socket.emit('data', '"color": "blue"}');
    socket.emit('end');
  });
});
