import {Component, Host} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  template: `<div>{{currentError}}</div>`,
  selector: 'control-errors',
  inputs: ['control', 'errors']
})
export class ControlErrors {
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