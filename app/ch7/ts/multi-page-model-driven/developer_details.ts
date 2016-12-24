import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Developer} from './developer';
import {DeveloperCollection} from './developer_collection';
import {DeveloperBasicInfo} from './developer_basic_info';
import {DeveloperAdvancedInfo} from './developer_advanced_info';

import 'rxjs/add/operator/take';

@Component({
  selector: 'dev-details',
  template: `
    <section class="col-md-4">
      <ul class="nav nav-tabs">
        <li><a [routerLink]="['./dev-basic-info']">Basic profile</a></li>
        <li><a [routerLink]="['./dev-details-advanced']">Advanced details</a></li>
      </ul>
      <router-outlet></router-outlet>
    </section>
  `,
})
export class DeveloperDetails {
  public dev: Developer;

  constructor(private route: ActivatedRoute, private developers: DeveloperCollection) {}

  ngOnInit() {
    this.route.params.take(1)
      .subscribe((params: any) => {
        this.dev = this.developers.getUserById(parseInt(params['id']));
      });
  }
}

export const devDetailsRoutes = [
  { path: '', redirectTo: 'dev-basic-info', pathMatch: 'full' },
  { component: DeveloperBasicInfo, path: 'dev-basic-info' },
  { component: DeveloperAdvancedInfo, path: 'dev-details-advanced' }
];

