import {Host, Component, Directive} from '@angular/core';
import {NgFormModel, FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES, FORM_PROVIDERS, NG_VALIDATORS} from '@angular/common';
import {Response, HTTP_PROVIDERS} from '@angular/http';
import {GitHubGateway} from './github_gateway';
import {Developer} from './developer';
import {DeveloperCollection} from './developer_collection';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

function validateEmail(emailControl) {
  if (!emailControl.value || /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailControl.value)) {
    return null;
  } else {
    return { 'invalidEmail': true };
  }
}

@Component({
  template: `<div>{{currentError}}</div>`,
  selector: 'control-errors',
  inputs: ['control', 'errors'],
})
class ControlErrors {
  errors: Object;
  control: string;
  constructor(@Host() private formDir: NgFormModel) {}
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

@Component({
  selector: 'dev-add',
  templateUrl: './add_developer.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ],
  directives: [FORM_DIRECTIVES, ControlErrors],
  providers: [GitHubGateway, FORM_PROVIDERS, HTTP_PROVIDERS]
})
export class AddDeveloper {
  submitted = false;
  importDevForm: ControlGroup;
  addDevForm: ControlGroup;
  errorMessage: string;
  successMessage: string;
  technologies: string[] = [
    'JavaScript',
    'C',
    'C#',
    'Clojure'
  ];
  constructor(private githubAPI: GitHubGateway, private developers: DeveloperCollection, fb: FormBuilder) {
    this.importDevForm = fb.group({
      'githubHandle': ['', Validators.required],
      'fetchFromGitHub': [false]
    });
    this.addDevForm = fb.group({
      'realName': ['', Validators.required],
      'email': ['', validateEmail],
      'technology': ['', Validators.required],
      'popular': [false]
    });
  }
  addDeveloper() {
    let model;
    if (this.importDevForm.controls['fetchFromGitHub'].value) {
      model = this.importDevForm.value;
      if (this.developers.getUserByGitHubHandle(model.githubHadle)) {
        this.errorMessage = `Developer with githubHandle ${model.githubHadle} already exists`;
        return;
      }
      this.submitted = true;
      this.githubAPI.getUser(model.githubHandle)
//        .catch((error, source) => {
//          console.log(error)
//          return error;
//        })
        .map((r: Response) => r.json())
        .subscribe((res: any) => {
          let dev = new Developer();
          dev.githubHandle = res.login;
          dev.email = res.email;
          dev.popular = res.followers >= 1000;
          dev.realName = res.name;
          dev.id = res.id;
          dev.avatarUrl = res.avatar_url;
          this.developers.addDeveloper(dev);
          this.successMessage = `Developer ${dev.githubHandle} successfully imported from GitHub`;
        });
    } else {
      this.submitted = true;
      model = this.addDevForm.value;
      model.id = this.developers.getAll().length + 1;
      let dev = new Developer();
      Object.assign(dev, model);
      this.developers.addDeveloper(dev);
      this.successMessage = `Developer ${model.realName} was successfully added`;
    }
    return false;
  }
}
