import {QueryList, ContentChildren, Directive, Inject, EventEmitter, Output, Component, forwardRef, View, Host, Attribute, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'pane',
  inputs: ['title'],
  template: '<ng-content/>'
})
class Pane {
  onChanges() {
    console.log('On changes');
  }
  onInit() {
    console.log('Initialized');
  }
  doCheck() {
    console.log('Do check');
  }
  onDestroy() {
    console.log('Destroy');
  }
  afterContentInit() {
    console.log('After content init');
  }
  afterContentChecked() {
    console.log('After content checked');
  }
  afterViewInit() {
    console.log('After view init');
  }
  afterViewChecked() {
    console.log('After view checked');
  }
}

@Component({
  selector: 'app',
  template: `
    <button (click)="toggle()">Toggle</button>
    <div *ng-if="counter % 2 == 0">
      <pane title="Sample">Hello world!</pane>
    </div>
  `,
  directives: [Pane, CORE_DIRECTIVES]
})
class App {
  counter: number = 0;
  toggle() {
    this.counter += 1;
  }
}

bootstrap(App);
