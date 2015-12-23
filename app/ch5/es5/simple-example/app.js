var Markdown = ng.Class({
  constructor: function () {},
  toHTML: function (md) {
    return markdown.toHTML(md);
  }
});

var MarkdownPanel = ng.Component({
  selector: 'markdown-panel',
  viewProviders: [Markdown],
  styles: [
    '.panel {' +
      'width: auto;' +
      'display: inline-block;' +
      'border: 1px solid black;' +
    '}' +
    '.panel-title {' +
      'border-bottom: 1px solid black;' +
      'background-color: #eee;' +
    '}' +
    '.panel-content,' +
    '.panel-title {' +
    '  padding: 5px;' +
    '}'
  ],
  template: '<div class="panel">' +
      '<div class="panel-title">' +
        '<ng-content select="panel-title"></ng-content>' +
      '</div>' +
      '<div class="panel-content">' +
        '<ng-content select="panel-content"></ng-content>' +
      '</div>' +
    '</div>'
})
.Class({
  constructor: [[ng.Optional(), ng.Self(), ng.Inject(Markdown)],
    ng.Inject(ng.ElementRef), function (md, el) {
      this.md = md;
      this.el = el;
    }],
  afterContentInit: function () {
    var el = this.el.nativeElement;
    var title = el.querySelector('panel-title');
    var content = el.querySelector('panel-content');
    title.innerHTML = this.md.toHTML(title.innerHTML);
    content.innerHTML = this.md.toHTML(content.innerHTML);
  }
});

var App = ng.Component({
  selector: 'app',
  template: `
    <markdown-panel>
      <panel-title>### Small title</panel-title>
      <panel-content>
## Sample title
* First point
* Second point
      </panel-content>
    </markdown-panel>
  `,
  directives: [ng.CORE_DIRECTIVES, MarkdownPanel]
})
.Class({
  constructor: function () {}
})

ng.bootstrap(App);
