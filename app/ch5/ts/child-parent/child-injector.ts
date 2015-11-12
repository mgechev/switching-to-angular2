import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide
} from 'angular2/angular2';

class Http {}

@Injectable()
class UserService {
  constructor(public http: Http) {}
}

let injector = Injector.resolveAndCreate([
  Http
]);

let childInjector = injector.resolveAndCreateChild([
  UserService
]);

console.log(childInjector.get(UserService));
console.log(childInjector.get(Http) === injector.get(Http));
