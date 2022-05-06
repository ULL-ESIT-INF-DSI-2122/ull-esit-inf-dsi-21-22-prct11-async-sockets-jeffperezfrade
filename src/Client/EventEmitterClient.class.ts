import {EventEmitter} from 'events';
/**
 * This class emit a message event.
 */
export class EventEmitterClient extends EventEmitter {
  /**
   * This constructor receives parts of one message with a data event, finally it emits a message event
   * to indicate that the complete message is received.
   * @param connection object of EventEmitter used as a socket.
   */
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
