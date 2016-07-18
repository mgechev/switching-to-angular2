import 'reflect-metadata';
import {
  ReflectiveInjector, Inject, Injectable
} from '@angular/core';

class Http {}

@Injectable()
class UserService {
  constructor(public http: Http) {}
}

let parentInjector = ReflectiveInjector.resolveAndCreate([
  Http
]);

let childInjector = parentInjector.resolveAndCreateChild([
  UserService
]);

console.log(childInjector.get(UserService));
console.log(childInjector.get(Http) === parentInjector.get(Http));
