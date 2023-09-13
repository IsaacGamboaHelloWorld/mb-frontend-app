import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  private navigationKeys: string[] = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  inputElement: HTMLElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }
  @HostListener('keydown', ['$event']) onKeyDown = (e: KeyboardEvent) => {
    if (
      this.navigationKeys.indexOf(e?.key) > -1 ||
      (e?.key === 'a' && e?.ctrlKey) ||
      (e?.key === 'c' && e?.ctrlKey) ||
      (e?.key === 'v' && e?.ctrlKey) ||
      (e?.key === 'x' && e?.ctrlKey) ||
      (e?.key === 'a' && e?.metaKey) ||
      (e?.key === 'c' && e?.metaKey) ||
      (e?.key === 'v' && e?.metaKey) ||
      (e?.key === 'x' && e?.metaKey)
    ) {
      return;
    }
    /* eslint-disable */
    (e?.shiftKey || e?.keyCode < 48 || e?.keyCode > 57) &&
      (e?.keyCode < 96 || e?.keyCode > 105) &&
      e?.preventDefault();
    /* eslint-enable */
  };
  @HostListener('paste', ['$event']) onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      ?.getData('text/plain')
      ?.replace(/\D/g, '');
    document.execCommand('insertText', false, pastedInput);
  };
  @HostListener('drop', ['$event']) onDrop = (event: DragEvent) => {
    event.preventDefault();
    const textData = event.dataTransfer?.getData('text')?.replace(/\D/g, '');
    this.inputElement.focus();
    document.execCommand('insertText', false, textData);
  };
}
