import {EventEmitter} from 'events';

export class EventEmitterServer extends EventEmitter {
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
