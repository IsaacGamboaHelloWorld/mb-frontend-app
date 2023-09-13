import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDetectFocus]'
})
export class DetectFocusDirective {
  constructor(
    private _el: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {}
  @HostListener('focusin') onFocus(): void {
    document.querySelector('body').classList.add('relative-button');
  }
  @HostListener('focusout') onBlur(): void {
    document.querySelector('body').classList.remove('relative-button');
  }
}
