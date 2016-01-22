import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide, OpaqueToken
} from 'angular2/core';

const VALIDATOR = new OpaqueToken('validator');

interface EmployeeValidator {
  (person: Employee): boolean;
};

class Employee {
  name: string;
  constructor(@Inject(VALIDATOR) private validators: EmployeeValidator[]) {}
  validate() {
    return this.validators
      .map(v => v(this))
      .filter(value => !!value);
  }
}

let injector = Injector.resolveAndCreate([
  provide(VALIDATOR, { multi: true, useValue: (person: Employee) => {
    if (!person.name) {
      return 'The name is required';
    }
  }}),
  provide(VALIDATOR, { multi: true, useValue: (person: Employee) => {
    if (!person.name || person.name.length < 1) {
      return 'The name should be more than 1 symbol long';
    }
  }}),
  Employee
]);

console.log(injector.get(Employee).validate());
