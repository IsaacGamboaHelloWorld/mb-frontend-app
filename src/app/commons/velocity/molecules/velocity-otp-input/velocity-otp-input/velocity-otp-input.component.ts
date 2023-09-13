import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { OtpInputDirective } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input.directive';

@Component({
  selector: 'app-velocity-otp-input',
  templateUrl: './velocity-otp-input.component.html',
  styleUrls: ['./velocity-otp-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityOtpInputComponent implements OnInit, OnDestroy {
  public counter: number[] = new Array(0);

  private otpDigits: number;
  private subscription: Subscription;
  public inputValues: string[] = new Array(0);
  private inputFocus: boolean[] = new Array(0);

  @ViewChildren(OtpInputDirective)
  private inputs: QueryList<OtpInputDirective>;

  @Input() private control: FormControl = new FormControl();
  @Input() id: string;
  @Input() disabled: boolean = false;
  @Input()
  set digits(digits: number) {
    this.otpDigits = digits;
    this.inputValues = new Array(digits);
    this.counter = new Array(digits);
  }
  @Input() square: boolean = false;
  @Input() type: 'password' | 'tel' = 'password';
  @Input() platform: string = 'android';
  @Input() autocomplete: string = 'off';
  @Output()
  oneTimeCode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  actionFocus: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._watchChanges();
  }

  ngOnDestroy(): void {
    !!this.subscription && this.subscription.unsubscribe();
  }

  get focus(): boolean {
    return this.square && !!this.inputFocus.find((i: boolean) => i);
  }

  get isAndroid(): boolean {
    return this.platform === 'android';
  }

  public onInput(e: InputEvent): void {
    const otpValue = e.data;
    const isComplete =
      this.autocomplete === 'one-time-code' &&
      !!otpValue &&
      otpValue?.length === this.otpDigits;
    isComplete && this.control.setValue(otpValue);
    isComplete && this.oneTimeCode.emit(isComplete);
  }

  public clearInput(): void {
    this.inputValues.fill('');
    this.inputs.forEach((input) => input.clearInput());
    this.setOtpValue();
    this.control.markAsPristine();
  }

  public onOTPInputChange(value: string, index: number): void {
    this.inputValues[index] = value;
    this.setOtpValue();
    const next = index + 1;
    if (this.inputValues[index].length > 0 && next < this.inputs.length) {
      this.inputs.toArray()[next].focusInput();
    }
  }

  public onOTPDeleteRequest(index: number): void {
    this.inputValues[index] = '';
    this.setOtpValue();
    const prev = index - 1;
    if (prev >= 0) {
      this.inputs.toArray()[prev].clearInput();
      this.inputValues[prev] = '';
      this.inputs.toArray()[prev].focusInput();
    }
  }

  public validateData(value: any): boolean {
    return !!value ? value : '';
  }

  public focusState(index: number, state: boolean): void {
    this.actionFocus.emit(index);
    this.inputFocus[index] = state;
  }

  private setOtpValue(): void {
    const otp = this.inputValues.reduce((acc, value) => acc + value, '');

    if (otp.length < this.otpDigits) {
      this.control.setValue('');
    } else {
      this.control.setValue(otp);
      this.control.markAsDirty();
    }
  }

  private _watchChanges(): void {
    !!this.control &&
      this.control?.value?.length === this.counter?.length &&
      (this.counter = Array.from(this.control.value));
    !!this.control &&
      (this.subscription = this.control.valueChanges
        .pipe(
          filter(
            (data) =>
              (!!data && data?.length === this.counter?.length) ||
              data.length === 0
          ),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          data?.length === this.counter?.length &&
            (this.counter = Array.from(this.control.value));
          data?.length === 0 && (this.counter = new Array(this.otpDigits));
          this.cd.detectChanges();
        }));
  }
}
