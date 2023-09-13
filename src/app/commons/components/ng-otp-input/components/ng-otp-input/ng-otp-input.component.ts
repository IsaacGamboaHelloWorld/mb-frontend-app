import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KeysOtpPipe } from '@commons/components/ng-otp-input/pipes/keys-otp.pipe';
import { ConfigOtpInput } from '@commons/components/ng-otp-input/models/config';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-otp-input',
  templateUrl: './ng-otp-input.component.html',
  styleUrls: ['./ng-otp-input.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NgOtpInputComponent implements OnInit, AfterViewInit {
  @Input() config: ConfigOtpInput = { length: 4 };
  @Input() typeInput: 'tel' | 'password' = 'tel';
  @Input() icon: string;
  @Input() customControl: FormControl;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onInputChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() clickIcon: EventEmitter<void> = new EventEmitter<void>();
  otpForm: FormGroup;
  inputControls: FormControl[] = new Array(this.config.length);
  private _focus: boolean = false;
  componentKey: string =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36);
  constructor(private keysOtpPipe: KeysOtpPipe) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({});
    for (let index = 0; index < this.config.length; index++) {
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
    this.otpForm.valueChanges.subscribe((v: object) => {
      this.keysOtpPipe.transform(this.otpForm.controls).forEach((k) => {
        const val: string = this.otpForm.controls[k].value;
        if (val && val.length > 1) {
          if (val.length >= this.config.length) {
            this.setValue(val);
          } else {
            this.rebuildValue();
          }
        }
      });
    });
  }

  ngAfterViewInit(): void {
    if (!this.config.disableAutoFocus) {
      const containerItem = document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        containerItem.addEventListener('paste', (evt) => this.handlePaste(evt));
        const ele: any = containerItem.getElementsByClassName('otp-input')[0];
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  }

  private getControlName(idx: number): string {
    return `ctrl_${idx}`;
  }

  get hasIcon(): boolean {
    return !!this.icon;
  }

  get hasTouched(): string {
    return this.otpForm.touched ? 'ng-touched' : '';
  }

  get hasDirty(): string {
    return this.otpForm.dirty ? 'ng-dirty' : '';
  }

  get hasFocus(): boolean {
    return this._focus;
  }

  get classError(): string {
    return !!this.customControl &&
      Object.keys(this.customControl.errors || {}).length > 0 &&
      (this.customControl.dirty || this.customControl.touched)
      ? 'otp-control-error'
      : '';
  }

  public setFocus(): void {
    this._focus = true;
  }

  public markAsTouchedControl(): void {
    !!this.customControl && this.customControl.markAsTouched();
    this._focus = false;
  }
  public ifLeftArrow(event: KeyboardEvent): boolean {
    return this.ifKeyCode(event, 37);
  }

  public ifRightArrow(event: KeyboardEvent): boolean {
    return this.ifKeyCode(event, 39);
  }

  public ifBackspaceOrDelete(event: KeyboardEvent): boolean {
    return (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      this.ifKeyCode(event, 8) ||
      this.ifKeyCode(event, 46)
    );
  }

  public ifKeyCode(event: KeyboardEvent, targetCode: number): boolean {
    /* tslint:disable */
    const key = event.keyCode || event.charCode;
    return key === targetCode;
    /* tslint:enable */
  }

  public onKeyDown($event: KeyboardEvent): boolean {
    const isSpace: boolean = this.ifKeyCode($event, 32);
    if (isSpace) {
      // prevent space
      return false;
    }
  }

  public onKeyUp($event: any, inputIdx: number): void {
    const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
    const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
    if (this.ifRightArrow($event)) {
      this.setSelected(nextInputId);
      return;
    }
    if (this.ifLeftArrow($event)) {
      this.setSelected(prevInputId);
      return;
    }
    const isBackspace = this.ifBackspaceOrDelete($event);
    if (isBackspace && !$event.target.value) {
      this.setSelected(prevInputId);
      this.rebuildValue();
      return;
    }
    if (!$event.target.value) {
      return;
    }
    if (this.ifValidEntry($event)) {
      this.setSelected(nextInputId);
    }
    this.rebuildValue();
  }

  public appendKey(id: string): string {
    return `${id}_${this.componentKey}`;
  }

  public setSelected(eleId: string): void {
    this.focusTo(eleId);
    const ele: any = document.getElementById(eleId);
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }

  public ifValidEntry(event: any): boolean {
    const inp = String.fromCharCode(event.keyCode);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp) ||
      (this.config.allowKeyCodes &&
        this.config.allowKeyCodes.includes(event.keyCode)) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    );
  }

  public focusTo(eleId: string): void {
    const ele: HTMLElement = document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }

  // method to set component value
  public setValue(value: any): void {
    if (this.config.allowNumbersOnly && isNaN(value)) {
      return;
    }
    this.otpForm.reset();
    if (!value) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, ''); // remove whitespace
    Array.from(value).forEach((c, idx) => {
      if (this.otpForm.get(this.getControlName(idx))) {
        this.otpForm.get(this.getControlName(idx)).setValue(c);
      }
    });
    if (!this.config.disableAutoFocus) {
      const containerItem = document.getElementById(`c_${this.componentKey}`);
      const indexOfElementToFocus =
        value.length < this.config.length
          ? value.length
          : this.config.length - 1;
      const ele: any = containerItem.getElementsByClassName('otp-input')[
        indexOfElementToFocus
      ];
      if (ele && ele.focus) {
        ele.focus();
      }
    }
    this.rebuildValue();
  }

  public rebuildValue(): void {
    let val = '';
    this.keysOtpPipe.transform(this.otpForm.controls).forEach((k) => {
      if (this.otpForm.controls[k].value) {
        let ctrlVal = this.otpForm.controls[k].value;
        const isLengthExceed = ctrlVal.length > 1;
        let isCaseTransformEnabled =
          !this.config.allowNumbersOnly &&
          this.config.letterCase &&
          (this.config.letterCase.toLocaleLowerCase() === 'upper' ||
            this.config.letterCase.toLocaleLowerCase() === 'lower');
        ctrlVal = ctrlVal[0];
        const transformedVal = isCaseTransformEnabled
          ? this.config.letterCase.toLocaleLowerCase() === 'upper'
            ? ctrlVal.toUpperCase()
            : ctrlVal.toLowerCase()
          : ctrlVal;
        if (isCaseTransformEnabled && transformedVal === ctrlVal) {
          isCaseTransformEnabled = false;
        } else {
          ctrlVal = transformedVal;
        }
        val += ctrlVal;
        if (isLengthExceed || isCaseTransformEnabled) {
          this.otpForm.controls[k].setValue(ctrlVal);
        }
      }
    });
    this.onInputChange.emit(val);
    !!this.customControl && this.customControl.setValue(val);
    !!this.customControl && this.customControl.markAsDirty();
  }

  public handlePaste(e: ClipboardEvent): void {
    // Get pasted data via clipboard API
    const clipboardData = e.clipboardData || window['clipboardData'];
    let pastedData;
    if (clipboardData) {
      pastedData = clipboardData.getData('Text');
    }
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData) {
      return;
    }
    this.setValue(pastedData);
  }
}
