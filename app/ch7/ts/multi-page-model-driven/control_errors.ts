import {Component, Input, Host} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';


@Component({
  template: `<div>{{currentError}}</div>`,
  selector: 'control-errors'
})
export class ControlErrors {
  @Input() errors: Object;
  @Input() control: string;

  constructor(@Host() private formDir: FormGroupDirective) {}

  get currentError() {
    let control = this.formDir.form.controls[this.control];
    let errorMessages = [];
    if (control && control.touched) {
      errorMessages = Object.keys(this.errors)
        .map(k => control.hasError(k) ? this.errors[k] : null)
        .filter(error => !!error);
    }
    return errorMessages.pop();
  }
}
