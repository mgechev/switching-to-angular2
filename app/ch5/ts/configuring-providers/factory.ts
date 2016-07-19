import 'reflect-metadata';
import {
  ReflectiveInjector, Inject, Injectable, OpaqueToken
} from '@angular/core';

const BUFFER_SIZE = new OpaqueToken('buffer-size');

class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size: Number) {}
}

class Certificate {}
class Crypto {}
@Injectable()
class Socket {
  isOpen: boolean;
  constructor(private buffer: Buffer) {}
  open() {
    this.isOpen = true;
  }
}

class TLSConnection {
  public socket: Socket;
  public crypto: Crypto;
  public certificate: Certificate;
}

let injector = ReflectiveInjector.resolveAndCreate([
  {
    provide: TLSConnection,
    useFactory: (socket: Socket, certificate: Certificate, crypto: Crypto) =>  {
      let connection = new TLSConnection();
      connection.certificate = certificate;
      connection.socket = socket;
      connection.crypto = crypto;
      socket.open();
      return connection;
    },
    deps: [Socket, Certificate, Crypto]
  },
  { provide: BUFFER_SIZE, useValue: 42 },
  Buffer,
  Socket,
  Certificate,
  Crypto
]);

console.log(injector.get(TLSConnection));
