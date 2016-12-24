import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Response} from '@angular/http';
import {GitHubGateway} from './github_gateway';
import {Developer} from './developer';
import {DeveloperCollection} from './developer_collection';

import {Subscription} from 'rxjs/Subscription';
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
  selector: 'dev-add',
  templateUrl: './add_developer.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ],
  providers: [GitHubGateway]
})
export class AddDeveloper implements OnInit, OnDestroy {
  submitted = false;
  importDevForm: FormGroup;
  addDevForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  technologies: string[] = [
    'JavaScript',
    'C',
    'C#',
    'Clojure'
  ];

  private subscription: Subscription;

  constructor(private githubAPI: GitHubGateway, private developers: DeveloperCollection, fb: FormBuilder) {
    this.importDevForm = fb.group({
      githubHandle: ['', Validators.required],
      fetchFromGitHub: [false]
    });
    this.addDevForm = fb.group({
      realName: ['', Validators.required],
      email: ['', validateEmail],
      technology: ['', Validators.required],
      popular: [false]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get isFormValid() {
    return (this.importDevForm.controls['fetchFromGitHub'].value && this.importDevForm.valid) ||
      (!this.importDevForm.controls['fetchFromGitHub'].value && this.addDevForm.valid)
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

  ngOnInit() {
    this.toggleControls(this.importDevForm.controls['fetchFromGitHub'].value);
    this.subscription = this.importDevForm.controls['fetchFromGitHub']
      .valueChanges.subscribe(this.toggleControls.bind(this));
  }

  private toggleControls(importEnabled: boolean) {
    const addDevControls = this.addDevForm.controls;
    if (importEnabled) {
      this.importDevForm.controls['githubHandle'].enable();
      Object.keys(addDevControls).forEach((c: string) => addDevControls[c].disable());
    } else {
      this.importDevForm.controls['githubHandle'].disable();
      Object.keys(addDevControls).forEach((c: string) => addDevControls[c].enable());
    }
  }
}
