import {EventEmitter} from 'events';

export class EventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let response: string = '';
    connection.on('data', (resChunk) => {
      response += resChunk;
    });

    connection.on('end', () => {
      this.emit('message', JSON.parse(response));
    });
  }
}
