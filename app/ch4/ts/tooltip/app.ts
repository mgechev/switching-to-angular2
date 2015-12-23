import {Injectable, ElementRef, Inject, Directive, Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

class Overlay {
  private el:HTMLElement;
  constructor() {
    var el = document.createElement('div');
    el.className = 'tooltip';
    this.el = el;
  }
  close() {
    this.el.hidden = true;
  }
  open(el, text) {
    this.el.innerHTML = text;
    this.el.hidden = false;
    var rect = el.nativeElement.getBoundingClientRect();
    this.el.style.left = rect.left + 'px';
    this.el.style.top = rect.top + 'px';
  }
  attach(target) {
    target.appendChild(this.el);
  }
  detach() {
    this.el.parentNode.removeChild(this.el);
  }
}

@Directive({
  selector: '[tooltip]',
  inputs: ['tooltip'],
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class Tooltip {
  private overlay: Overlay;
  private tooltip: string;
  constructor(private el:ElementRef, overlay: Overlay) {
    this.el = el;
    this.overlay = overlay;
  }
  onMouseEnter() {
    this.overlay.open(this.el, this.tooltip);
  }
  onMouseLeave() {
    this.overlay.close();
  }
}

@Component({
  selector: 'app',
  templateUrl: '<%= currentPath %>app.html',
  directives: [Tooltip]
})
class App {}

bootstrap(App);
