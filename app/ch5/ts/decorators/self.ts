import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide, Host
} from 'angular2/angular2';

abstract class Channel {}

class Http extends Channel {}

class WebSocket extends Channel {}

@Injectable()
class UserService {
  constructor(@Host() public channel: Channel) {}
}

let parentInjector = Injector.resolveAndCreate([
  provide(Channel, { useClass: Http })
]);
let childInjector = parentInjector.resolveAndCreateChild([
  provide(Channel, { useClass: WebSocket }),
  UserService
]);

console.log(childInjector.get(UserService).channel instanceof WebSocket);
