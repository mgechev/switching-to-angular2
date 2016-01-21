import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide, SkipSelf
} from 'angular2/core';

class Context {
  constructor(@SkipSelf() public parentContext: Context) {}
}

let parentInjector = Injector.resolveAndCreate([
  provide(Context, { useValue: new Context(null) })
]);
let childInjector = parentInjector.resolveAndCreateChild([
  Context
]);

console.log(childInjector.get(Context).parentContext instanceof Context);
