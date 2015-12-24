import {HostListener, Input, Injectable, ElementRef, Inject, Directive, Component} from 'angular2/core';
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
  selector: '[sa-tooltip]'
})
export class Tooltip {
  @Input('sa-tooltip')
  saTtooltip:string;
  private overlay: Overlay;

  constructor(private el: ElementRef, overlay: Overlay) {
    this.el = el;
    this.overlay = overlay;
    overlay.attach(el.nativeElement);
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.overlay.open(this.el, this.saTtooltip);
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.overlay.close();
  }
}

@Component({
  selector: 'app',
  templateUrl: './app.html',
  directives: [Tooltip]
})
class App {}

bootstrap(App, [Overlay]);
