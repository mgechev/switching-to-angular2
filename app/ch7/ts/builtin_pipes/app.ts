import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  template: `
    <ul>
      <li>CurrencyPipe - {{ currencyValue | currency: 'USD' }}</li>
      <li>DatePipe - {{ dateValue | date: 'shortTime'  }}</li>
      <li>DecimalPipe - {{ decimalValue | number: '3.1-2' }}</li>
      <li>JsonPipe - {{ jsObject | json }}</li>
      <li>LowerCasePipe - {{ uppercaseValue | lowercase }}</li>
      <li>UpperCaseFilter - {{ lowercaseValue | uppercase }}</li>
      <li>PercentPipe - {{ percentValue | percent: '2.1-2' }}</li>
      <li>SlicePipe - {{ array | slice: 1: 2 }}</li>
    </ul>
  `
})
class App {
  currencyValue = 42;
  dateValue = new Date('02/11/2010');
  decimalValue = 42.1618;
  jsObject  = { foo: 'bar' };
  uppercaseValue = 'FOOBAR';
  lowercaseValue = 'foobar';
  percentValue = 42;
  array = [1, 2, 3];
}

@NgModule({
  imports: [BrowserModule],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
