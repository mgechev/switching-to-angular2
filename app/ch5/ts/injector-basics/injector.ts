/// <reference path="../../../../node_modules/reflect-metadata/reflect-metadata.d.ts" />

import 'reflect-metadata';
import {Injector, Injectable, provide} from 'angular2/angular2';

@Injectable()
class Demo {
  constructor(private foo: Number) {

  }
}

let injector = Injector.resolveAndCreate([
  provide(Number, { useValue: 42 }),
  Demo
]);

console.log(injector.get(Demo));
