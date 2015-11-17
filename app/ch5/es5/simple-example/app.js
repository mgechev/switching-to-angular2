var Markdown = ng.Class({
  constructor: function () {},
  toHTML: function (md) {
    return markdown.toHTML(md);
  }
});

var MarkdownPane = ng.Component({
  selector: 'markdown-pane',
  viewProviders: [Markdown],
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
.Class({
  constructor: [ng.Inject(Markdown), ng.Inject(ng.ElementRef), function (md, el) {
    this.md = md;
    this.el = el;
  }],
  afterContentInit: function () {
    var el = this.el.nativeElement;
    var title = el.querySelector('pane-title');
    var content = el.querySelector('pane-content');
    title.innerHTML = this.md.toHTML(title.innerHTML);
    content.innerHTML = this.md.toHTML(content.innerHTML);
  }
})

var App = ng.Component({
  selector: 'app',
  template: `
    <markdown-pane>
      <pane-title>### Small title</pane-title>
      <pane-content>
## Sample title
* First point
* Second point
      </pane-content>
    </markdown-pane>
  `,
  directives: [ng.CORE_DIRECTIVES, MarkdownPane]
})
.Class({
  constructor: function () {}
})

ng.bootstrap(App);
