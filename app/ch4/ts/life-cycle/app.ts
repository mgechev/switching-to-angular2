import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'panel',
  inputs: ['title', 'caption'],
  template: '<ng-content></ng-content>'
})
class Panel {
  ngOnChanges(changes) {
    console.log('On changes', changes);
  }
  ngOnInit() {
    console.log('Initialized');
  }
  ngDoCheck() {
    console.log('Do check');
  }
  ngOnDestroy() {
    console.log('Destroy');
  }
  ngAfterContentInit() {
    console.log('After content init');
  }
  ngAfterContentChecked() {
    console.log('After content checked');
  }
  ngAfterViewInit() {
    console.log('After view init');
  }
  ngAfterViewChecked() {
    console.log('After view checked');
  }
}

@Component({
  selector: 'app',
  template: `
    <button (click)="toggle()">Toggle</button>
    <div *ngIf="counter % 2 == 0">
      <panel caption="Sample caption" title="Sample">Hello world!</panel>
    </div>
  `,
  directives: [Panel]
})
class App {
  counter: number = 0;
  toggle() {
    this.counter += 1;
  }
}

bootstrap(App);
