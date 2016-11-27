import {Component, NgModule, Input} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'panel',
  template: '<ng-content></ng-content>'
})
class Panel {
  @Input() title: string;
  @Input() caption: string;

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
  `
})
class App {
  counter: number = 0;

  toggle() {
    this.counter += 1;
  }
}

@NgModule({
  declarations: [Panel, App],
  imports: [BrowserModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

