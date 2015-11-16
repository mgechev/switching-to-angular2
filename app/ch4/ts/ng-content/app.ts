import {Component, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';


@Component({
  selector: 'fancy-button',
  template: '<button><ng-content></ng-content></button>'
})
class FancyButton { /* Extra behavior */ }

@Component({
  selector: 'pane',
  styles: [
    `.pane {
      width: auto;
      display: inline-block;
      border: 1px solid black;
    }
    .pane-title {
      border-bottom: 1px solid black;
      background-color: #eee;
    }
    .pane-content,
    .pane-title {
      padding: 5px;
    }`
  ],
  template: `
    <div class="pane">
      <div class="pane-title">
        <ng-content select="pane-title"></ng-content>
      </div>
      <div class="pane-content">
        <ng-content select="pane-content"></ng-content>
      </div>
    </div>`
})
class Pane { }

@Component({
  selector: 'app',
  template: `
    <fancy-button>
      <span>I will <i>be</i> projected</span>
    </fancy-button>
    <br>
    <pane>
      <pane-title>Sample title</pane-title>
      <pane-content>Content</pane-content>
    </pane>
  `,
  directives: [CORE_DIRECTIVES, FancyButton, Pane]
})
class App {
  constructor() {}
}

bootstrap(App);
