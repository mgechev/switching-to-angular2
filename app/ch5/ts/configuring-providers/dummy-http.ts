import 'reflect-metadata';
import {
  Injector, Inject, Injectable,
  OpaqueToken, forwardRef, provide
} from 'angular2/angular2';

class Http {}

class DummyHttp {}

@Injectable()
class UserService {
  constructor(private http: Http) {
    console.log(this.http instanceof DummyHttp);
  }
}

let injector = Injector.resolveAndCreate([
  UserService,
  provide(Http, { useClass: DummyHttp })
]);


injector.get(UserService);
