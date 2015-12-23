import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide, SkipSelf
} from 'angular2/core';

abstract class Channel {}

class Http extends Channel {}

class WebSocket extends Channel {}

@Injectable()
class UserService {
  constructor(@SkipSelf() public channel: Channel) {}
}

let parentInjector = Injector.resolveAndCreate([
  provide(Channel, { useClass: Http })
]);
let childInjector = parentInjector.resolveAndCreateChild([
  provide(Channel, { useClass: WebSocket }),
  UserService
]);

console.log(childInjector.get(UserService).channel instanceof Http);
