import {Component, Directive, ViewChildren, ContentChildren, QueryList} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'user-badge',
  template: '<h2>View child</h2>'
})
class UserBadge {}

@Component({
  selector: 'user-rating',
  template: '<h2>Content child</h2>'
})
class UserRating {}

@Component({
  selector: 'user-panel',
  template: '<user-badge/>',
  directives: [UserBadge]
})
class UserPanel {
  @ViewChildren(UserBadge)
  viewChildren: QueryList<UserBadge>;

  @ContentChildren(UserRating)
  contentChildren: QueryList<UserRating>;

  afterViewInit() {
    // view children are initialized
  }

  afterContentInit() {
    // content children are initialized
  }
}


@Component({
  selector: 'app',
  template: '<user-panel><user-rating></user-panel>',
  directives: [UserPanel, UserRating]
})
class App {
  constructor() {}
}

bootstrap(App);

