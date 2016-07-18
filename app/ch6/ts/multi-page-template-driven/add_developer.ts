import {Host, Component, Directive} from '@angular/core';
import {NgControl, NgForm, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, NG_VALIDATORS} from '@angular/common';
import {Developer} from './developer';
import {DeveloperCollection} from './developer_collection';

function validateEmail(emailControl) {
  if (!emailControl.value || /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailControl.value)) {
    return null;
  } else {
    return { 'invalidEmail': true };
  }
}

@Directive({
  selector: '[email-input]',
  providers: [{ provide: NG_VALIDATORS, useValue: validateEmail, multi: true }]
})
class EmailValidator {}

@Component({
  template: `<div>{{currentError}}</div>`,
  selector: 'control-errors',
  inputs: ['control', 'errors']
})
class ControlErrors {
  errors: Object;
  control: string;
  constructor(@Host() private formDir: NgForm) {}
  get currentError() {
    let control = this.formDir.controls[this.control];
    let errorMessages = [];
    if (control && control.touched) {
      errorMessages = Object.keys(this.errors)
        .map(k => control.hasError(k) ? this.errors[k] : null)
        .filter(error => !!error);
    }
    return errorMessages.pop();
  }
}

@Component({
  selector: 'dev-add',
  templateUrl: './add_developer.html',
  styles: [
    `input.ng-touched.ng-invalid,
     select.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, EmailValidator, ControlErrors],
  providers: [FORM_PROVIDERS]
})
export class AddDeveloper {
  developer = new Developer();
  errorMessage: string;
  successMessage: string;
  submitted = false;
  technologies: string[] = [
    'JavaScript',
    'C',
    'C#',
    'Clojure'
  ];
  constructor(private developers: DeveloperCollection) {}
  addDeveloper() {
    this.developer.id = this.developers.getAll().length + 1;
    this.developers.addDeveloper(this.developer);
    this.successMessage = `Developer ${this.developer.realName} was successfully added`;
    this.submitted = true;
  }
}
