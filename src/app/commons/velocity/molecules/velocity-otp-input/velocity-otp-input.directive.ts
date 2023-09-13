import { Directive, ElementRef, Input, HostBinding } from '@angular/core';
import { HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOtpInput]'
})
export class OtpInputDirective {
  private inputNE: HTMLInputElement;

  @HostBinding('class.filled')
  private get isFilled(): boolean {
    return this.inputNE.value.length > 0;
  }

  @Input()
  private pattern: RegExp = /^[0-9]$/;
  @Output()
  private inputChange: EventEmitter<string> = new EventEmitter();
  @Output()
  private deleteRequest: EventEmitter<string> = new EventEmitter();

  @HostListener('paste', ['$event'])
  private onPaste(event: ClipboardEvent): void {
    const cbData = event.clipboardData.getData('text');
    if (!cbData.match(this.pattern)) {
      event.preventDefault();
    } else {
      this.clearInput();
    }
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace' && this.inputNE.value.length === 0) {
      this.deleteRequest.emit();
    }
  }

  @HostListener('keypress', ['$event'])
  private onKeyPress(event: KeyboardEvent): void {
    if (!event.key.match(this.pattern)) {
      event.preventDefault();
      return;
    }
    this.clearInput();
  }

  @HostListener('input', ['$event'])
  private onChange(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const char =
      target.value.length > 1 ? target.value.slice(-1) : target.value;

    if (!char.match(this.pattern)) {
      this.clearInput();
      event.preventDefault();
    }
    if (target.value.length > 1) {
      this.inputNE.value = char;
      event.preventDefault();
    }
    this.inputChange.emit(target.value);
  }

  focusInput(): void {
    this.inputNE.focus();
  }
  clearInput(): void {
    this.inputNE.value = '';
  }

  constructor(private el: ElementRef) {
    this.inputNE = el.nativeElement;
  }
}
