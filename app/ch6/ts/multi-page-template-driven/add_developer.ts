import {Host, Component, Directive} from '@angular/core';
import {NgControl, NgForm, NG_VALIDATORS} from '@angular/forms';
import {Developer} from './developer';
import {DeveloperCollection} from './developer_collection';

@Component({
  selector: 'dev-add',
  templateUrl: './add_developer.html',
  styles: [
    `input.ng-touched.ng-invalid,
     select.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ],
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
