import {QueryList, ContentChildren, Directive, Inject, EventEmitter, Output, Component, forwardRef, View, Host, Attribute, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'tab',
  template: `
    <div [hidden]="!isActive">
      <ng-content/>
    </div>
  `
  inputs: ['title']
})
class Tab {
  title: string;
  isActive: boolean = false;
}

@Component({
  selector: 'tabs',
  directives: [CORE_DIRECTIVES],
  styles: [
    `
      .tab {
        display: inline-block;
      }
      .tab-header {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .tab-header .is-active {
        background-color: #eee;
      }
      .tab-header li {
        display: inline-block;
        cursor: pointer;
        padding: 5px;
        border: 1px solid #ccc;
      }
      .tab-content {
        border: 1px solid #ccc;
        border-top: none;
        padding: 5px;
      }
    `
  ],
  template: `
    <div class="tab">
      <ul class="tab-header">
        <li *ng-for="#tab of tabs; #index = index"
          [class.is-active]="active == index" (click)="select(index)">
          {{tab.title}}
        </li>
      </ul>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
class Tabs {
  @Output('changed')
  tabChanged: EventEmitter = new EventEmitter();

  @ContentChildren(Tab)
  tabs: QueryList<Tab>;

  active: number;
  constructor() {
    this.active = 0;
  }
  select(index) {
    let tabs: Tab[] = this.tabs.toArray();
    tabs[this.active].isActive = false;
    this.active = index;
    tabs[index].isActive = true;
    this.tabChanged.next(tabs[index]);
  }
  onInit() {

  }
  onChanges() {

  }
  doCheck() {

  }
  onDestroy() {

  }
  afterContentInit() {

  }
  afterContentChecked() {

  }
  afterViewInit() {

  }
  afterViewChecked() {

  }
}

@Component({
  selector: 'sample',
  template: `<div>
    H1
    <h1><ng-content/></h1>
  </div>`
})
class Sample {
  onInit() {
    console.log('Initialized');
  }
  onChanges() {
    console.log('On changes...');
  }
  doCheck() {
    console.log('Do check...');
    debugger;
  }
  onDestroy() {
    console.log('destroy...');
  }
  afterContentInit() {
    console.log('after content init...');
  }
  afterContentChecked() {
    console.log('after content checked...');
  }
  afterViewInit() {
    console.log('after view init...');
  }
  afterViewChecked() {
    console.log('after view checked...');
  }
}

@Component({
  selector: 'app',
  template: `
    <button (click)="toggle()">Toggle</button>
    <div *ng-if="counter % 2 == 0">
      <sample>Bar</sample>
    </div>
  `,
  directives: [Tab, Tabs, CORE_DIRECTIVES, Sample]
})
class App {
  counter: number = 0;
  toggle() {
    this.counter += 1;
  }
  tabChanged(tab) {
    console.log(tab);
  }
}

bootstrap(App);

