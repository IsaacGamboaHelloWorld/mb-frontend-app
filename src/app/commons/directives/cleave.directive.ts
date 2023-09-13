import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';

import Cleave from 'cleave.js';

@Directive({
  selector: '[appCleave]'
})
export class CleaveDirective implements OnDestroy {
  @Input() set cleave(cleave: any) {
    this._cleave = cleave;
    this._setCleave();
  }
  private _cleave: any;
  private _cleaveInstance: Cleave;

  constructor(private elementRef: ElementRef) {}

  ngOnDestroy(): void {
    if (!!this._cleaveInstance) {
      this._cleaveInstance.destroy();
    }
  }

  private _setCleave(): void {
    const el = this.elementRef.nativeElement;
    this._cleaveInstance = new Cleave(el, {
      ...this._cleave,
      onValueChanged: (e: any) => {
        el.value = e.target.value;
      }
    });
  }
}
