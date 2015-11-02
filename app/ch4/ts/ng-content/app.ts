import {Component, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';


@Component({
  selector: 'fancy-button',
  template: '<button><ng-content></ng-content></button>'
})
class SimpleProjection { }

@Component({
  selector: 'split-pane',
  template: `
    <div class="pane">
      <div class="right-pane">
        <ng-content select=".left"></ng-content>
      </div>
      <div class="right-pane">
        <ng-content select=".right"></ng-content>
      </div>
    </div>`
})
class SelectorProjection { }

@Component({
  selector: 'app',
  template: `
    <fancy-button>
      <span>I will <i>be</i> projected</span>
    </fancy-button>

    <split-pane>
      <p class="right">
        Right pane content
      </p>
      <p class="left">
        Left pane content
      </p>
    </split-pane>
  `,
  directives: [CORE_DIRECTIVES, SimpleProjection, SelectorProjection]
})
class App {
  constructor() {}
}

bootstrap(App);

