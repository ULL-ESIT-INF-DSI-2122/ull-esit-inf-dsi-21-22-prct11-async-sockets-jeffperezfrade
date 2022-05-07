import {EventEmitter} from 'events';
/**
 * This class emits a request.
 * It extends from EventEmitter.
 */
export class EventEmitterServer extends EventEmitter {
  /**
   * Constructor that receives a message in parts.
   * If there is a end of line jump, we know there is a completed message.
   * Then a request event is emitted.
   * @param connect Used as a socket.
   */
  constructor(connect: EventEmitter) {
    super();
    let msg: string = '';
    connect.on('data', (msgChunk) => {
      msg += msgChunk;
      let limit: number = msg.indexOf('\n');
      while (limit !== -1) {
        const auxMsg = msg.substring(0, limit);
        msg = msg.substring(limit + 1);
        this.emit('request', JSON.parse(auxMsg));
        limit = msg.indexOf('\n');
      }
    });
  }
}
