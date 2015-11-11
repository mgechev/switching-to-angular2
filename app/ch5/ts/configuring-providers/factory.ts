import 'reflect-metadata';
import {
  Injector, Inject, Injectable, OpaqueToken, provide
} from 'angular2/angular2';

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

class TLSConnectionBuilder {
  private certificate: Certificate;
  private socket: Socket;
  private crypto: Crypto[];
  setCertificate(certificate: Certificate) {
    this.certificate = certificate;
  }
  setSocket(socket: Socket) {
    if (socket.isOpen) {
      this.socket = socket;
    } else {
      throw new Error('The socket is closed');
    }
  }
  setCrypto(crypto: Crypto[]) {
    this.crypto = crypto;
  }
  build() {
    let connection = new TLSConnection();
    connection.certificate = this.certificate;
    connection.socket = this.socket;
    connection.crypto = this.crypto.filter(c => {
      // find the most secure set...
      return true;
    }).pop();
    return connection;
  }
}

class TLSConnection {
  public socket: Socket;
  public crypto: Crypto;
  public certificate: Certificate;
}

let injector = Injector.resolveAndCreate([
  provide(TLSConnection, {
    useFactory: (builder:TLSConnectionBuilder, socket: Socket, certificate: Certificate, crypto: Crypto) =>  {
      builder.setCertificate(new Certificate());
      socket.open();
      builder.setSocket(socket);
      builder.setCrypto([crypto]);
      return builder.build();
    },
    deps: [TLSConnectionBuilder, Socket, Certificate, Crypto]
  }),
  provide(BUFFER_SIZE, { useValue: 42 }),
  TLSConnectionBuilder,
  Buffer,
  Socket,
  Certificate,
  Crypto
]);

console.log(injector.get(TLSConnection));
