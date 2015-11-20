import {Component, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'panel',
  inputs: ['title', 'caption'],
  template: '<ng-content/>'
})
class Panel {
  onChanges(changes) {
    console.log('On changes', changes);
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
      <panel caption="Sample caption" title="Sample">Hello world!</panel>
    </div>
  `,
  directives: [Panel, CORE_DIRECTIVES]
})
class App {
  counter: number = 0;
  toggle() {
    this.counter += 1;
  }
}

bootstrap(App);
