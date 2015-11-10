import 'reflect-metadata';
import {Injector, Inject, Injectable, forwardRef, provide} from 'angular2/angular2';

const BUFFER_SIZE = 3;

class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size:Number) {
    console.log(this.size);
  }
}

@Injectable()
class Socket {
  constructor(private buffer: Buffer) {}
}

let injector = Injector.resolveAndCreate([
  provide(BUFFER_SIZE, { useValue: 42 }),
  Buffer,
  Socket
]);

injector.get(Socket);
