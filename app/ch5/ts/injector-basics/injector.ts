import 'reflect-metadata';
import {
  Injector,
  Inject,
  Injectable,
  OpaqueToken,
  provide
} from 'angular2/core';

const BUFFER_SIZE = new OpaqueToken('buffer-size');

class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size: Number) {
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
