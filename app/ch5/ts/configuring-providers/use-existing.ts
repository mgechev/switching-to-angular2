import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide
} from 'angular2/angular2';

class Http {}

class DummyService {}

@Injectable()
class UserService {
  constructor(public http: Http) {}
}

let injector = Injector.resolveAndCreate([
  DummyService,
  provide(Http, { useClass: DummyService }),
  UserService
]);

let us:UserService = injector.get(UserService);

console.log(us.http instanceof DummyService);
