import 'reflect-metadata';
import {
  ReflectiveInjector, Inject, Injectable,
  OpaqueToken, forwardRef
} from '@angular/core';

const BUFFER_SIZE = new OpaqueToken('buffer-size');

@Injectable()
class Socket {
  constructor(@Inject(forwardRef(() => Buffer)) private buffer: Buffer) {}
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

let injector = ReflectiveInjector.resolveAndCreate([
  { provide: BUFFER_SIZE, useValue: 42 },
  Buffer,
  Socket
]);

console.log(injector.get(Socket));
