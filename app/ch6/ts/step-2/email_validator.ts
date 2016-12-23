import {Directive} from '@angular/core';
import {NG_VALIDATORS} from '@angular/forms';

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
export class EmailValidator {}
