import {Component, Inject, forwardRef, Host} from '@angular/core';
import {DeveloperDetails} from './developer_details';
import {Developer} from './developer';

@Component({
  selector: 'dev-details-advanced',
  styles: [`
      .row span {
        display: inline-block;
        margin-left: 5px;
      }
    `
  ],
  template: `
    <h2>{{dev.githubHandle}}</h2>
    <div class="container">
      <div class="row">
        <i class="fa fa-user"></i><span>{{dev.realName}}</span>
      </div>
      <div class="row">
        <i class="fa fa-rocket"></i><span>{{dev.technology}}</span>
      </div>
      <div class="row">
        <i class="fa fa-envelope"></i><span>{{dev.email || 'none'}}</span>
      </div>
      <div class="row">
        <i class="fa fa-star"></i><span>{{dev.popular ? 'Yes' : 'Not  yet' }}</span>
      </div>
    </div>
  `
})
export class DeveloperAdvancedInfo {
  dev: Developer;
  constructor(@Inject(forwardRef(() => DeveloperDetails)) @Host() parent: DeveloperDetails) {
    this.dev = parent.dev;
  }
}
