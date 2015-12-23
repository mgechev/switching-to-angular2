import 'reflect-metadata';
import {
  Injector, Inject, Injectable,
  OpaqueToken, forwardRef, provide
} from 'angular2/core';

const BUFFER_SIZE = new OpaqueToken('buffer-size');

@Injectable()
class Socket {
  constructor(@Inject(forwardRef(() => BUFFER_SIZE)) private buffer: Buffer) {}
}

// undefined
console.log(Buffer);

class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size:Number) {
    console.log(this.size);
  }
}

// [Function: Buffer]
console.log(Buffer);

let injector = Injector.resolveAndCreate([
  provide(BUFFER_SIZE, { useValue: 42 }),
  Buffer,
  Socket
]);

injector.get(Socket);
