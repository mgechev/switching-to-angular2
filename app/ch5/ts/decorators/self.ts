import 'reflect-metadata';
import {
  ReflectiveInjector, Inject, Injectable, Self
} from '@angular/core';

abstract class Channel {}

class Http extends Channel {}

class WebSocket extends Channel {}

@Injectable()
class UserService {
  constructor(@Self() public channel: Channel) {}
}

let parentInjector = ReflectiveInjector.resolveAndCreate([
  { provide: Channel, useClass: Http }
]);
let childInjector = parentInjector.resolveAndCreateChild([
  { provide: Channel, useClass: WebSocket },
  UserService
]);

console.log(childInjector.get(UserService).channel instanceof WebSocket);
