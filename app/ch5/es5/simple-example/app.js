var Markdown = ng.core.Class({
  constructor: function () {},
  toHTML: function (md) {
    return markdown.toHTML(md);
  }
});

var MarkdownPanel = ng.core.Component({
  selector: 'markdown-panel',
  viewProviders: [Markdown],
  styles: [
    '.panel {' +
      'width: auto;' +
      'display: inline-block;' +
      'border: 1px solid black;' +
    '}' +
    '.panel-title-wrapper {' +
      'border-bottom: 1px solid black;' +
      'background-color: #eee;' +
    '}' +
    '.panel-content-wrapper,' +
    '.panel-title-wrapper {' +
    '  padding: 5px;' +
    '}'
  ],
  template: '<div class="panel">' +
      '<div class="panel-title-wrapper">' +
        '<ng-content select=".panel-title"></ng-content>' +
      '</div>' +
      '<div class="panel-content-wrapper">' +
        '<ng-content select=".panel-content"></ng-content>' +
      '</div>' +
    '</div>'
})
.Class({
  constructor: [[ng.core.Optional(), ng.core.Self(), Markdown],
    ng.core.ElementRef, function (md, el) {
      this.md = md;
      this.el = el;
    }],
  ngAfterContentInit: function () {
    var el = this.el.nativeElement;
    var title = el.querySelector('.panel-title');
    var content = el.querySelector('.panel-content');
    title.innerHTML = this.md.toHTML(title.innerHTML);
    content.innerHTML = this.md.toHTML(content.innerHTML);
  }
});

var App = ng.core.Component({
  selector: 'app',
  template: `
    <markdown-panel>
      <section class="panel-title">### Small title</section>
      <section class="panel-content">
## Sample title
* First point
* Second point
      </section>
    </markdown-panel>
  `
})
.Class({
  constructor: function () {}
});

var AppModule = ng.core.NgModule({
  imports: [ng.platformBrowser.BrowserModule],
  declarations: [MarkdownPanel, App],
  bootstrap: [App]
})
.Class({
  constructor: function () {}
});

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);

