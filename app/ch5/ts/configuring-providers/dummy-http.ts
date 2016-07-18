import 'reflect-metadata';
import {
  ReflectiveInjector, Inject, Injectable,
  OpaqueToken, forwardRef
} from '@angular/core';

class Http {}

class DummyHttp {}

@Injectable()
class UserService {
  constructor(private http: Http) {
    console.log(this.http instanceof DummyHttp);
  }
}

let injector = ReflectiveInjector.resolveAndCreate([
  UserService,
  { provide: Http, useClass: DummyHttp }
]);


injector.get(UserService);
