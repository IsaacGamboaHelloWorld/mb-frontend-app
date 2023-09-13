import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-otp-redeem-tuplus',
  templateUrl: './otp-redeem-tuplus.component.html',
  styleUrls: ['./otp-redeem-tuplus.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OtpRedeemTuplusComponent {
  @Input() controlOtp: FormControl;
  @Input() Isloading: Observable<boolean>;
  @Input() retryRedeemOtp: boolean;
  @Output() actionButtonOtp: EventEmitter<void> = new EventEmitter<void>();
}
