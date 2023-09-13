import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-modal-leave',
  templateUrl: './velocity-modal-leave.component.html',
  styleUrls: ['./velocity-modal-leave.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityModalLeaveComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() close: boolean = false;
  @Input() iconType: 'success' | 'information' | 'warning' | 'error' =
    'success';
  @Input() subtitle: string;
  @Input() description: string;
  @Input() firstBtn: string;
  @Input() secondBtn: string;
  @Input() hasLink: boolean = false;
  @Input() hasInLineLink: boolean = false;
  @Input() areButtonsWidthComplete: boolean = false;
  @Input() linkWithButtonFull: boolean = false;
  @Output() actionFirstBtn: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionSecondBtn: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionClose: EventEmitter<void> = new EventEmitter<void>();

  get hasSecondBtn(): boolean {
    return !!this.secondBtn;
  }

  get hasFirstBtn(): boolean {
    return !!this.firstBtn;
  }

  get hasSubtitle(): boolean {
    return !!this.subtitle;
  }

  get hasIcon(): boolean {
    return !!this.icon;
  }
}
