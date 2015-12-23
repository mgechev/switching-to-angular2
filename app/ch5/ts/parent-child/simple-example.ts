import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide
} from 'angular2/core';

class Http {}

@Injectable()
class UserService {
  constructor(public http: Http) {}
}

let parentInjector = Injector.resolveAndCreate([
  Http
]);

let childInjector = parentInjector.resolveAndCreateChild([
  UserService
]);

console.log(childInjector.get(UserService));
console.log(childInjector.get(Http) === parentInjector.get(Http));
