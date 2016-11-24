import {Component, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'dev-add',
  template: `Add Developer`
})
export class AddDeveloper {}

@NgModule({
  declarations: [AddDeveloper],
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AddDeveloper
    }
  ])]
})
export class AddDeveloperModule {}
