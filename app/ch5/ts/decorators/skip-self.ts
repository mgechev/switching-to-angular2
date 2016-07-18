import 'reflect-metadata';
import {
  ReflectiveInjector, Inject, Injectable, SkipSelf
} from '@angular/core';

class Context {
  constructor(@SkipSelf() public parentContext: Context) {}
}

let parentInjector = ReflectiveInjector.resolveAndCreate([
  { provide: Context, useValue: new Context(null) }
]);
let childInjector = parentInjector.resolveAndCreateChild([
  Context
]);

console.log(childInjector.get(Context).parentContext instanceof Context);
