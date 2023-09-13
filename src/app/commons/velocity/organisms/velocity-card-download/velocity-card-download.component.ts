import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-card-download',
  templateUrl: './velocity-card-download.component.html',
  styleUrls: ['./velocity-card-download.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardDownloadComponent {
  @Input() img: string;
  @Input() account: string;
  @Input() imgAccount: string;
  @Input() id: string;
  @Input() isLoading: boolean;
  @Input() isDisabled: boolean;
  @Input() btnText: boolean;
  @Output() actionBtn: EventEmitter<void> = new EventEmitter<void>();

  get hasImgAccount(): boolean {
    return !!this.imgAccount;
  }
}
