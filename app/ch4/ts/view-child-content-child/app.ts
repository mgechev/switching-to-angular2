import {Component, Directive, ViewChildren, ContentChildren, QueryList, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';

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
  viewChildren: QueryList;

  @ContentChildren(UserRating)
  contentChildren: QueryList;

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
  directives: [CORE_DIRECTIVES, UserPanel, UserRating]
})
class App {
  constructor() {}
}

bootstrap(App);

