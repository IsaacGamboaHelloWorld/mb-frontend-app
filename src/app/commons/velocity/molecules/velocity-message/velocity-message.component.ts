import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-message',
  templateUrl: './velocity-message.component.html',
  styleUrls: ['./velocity-message.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityMessageComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() date: string;
  @Input() icon: string;
  @Input() id: string;
  @Input() read: boolean = false;
  @Input() showCheck: boolean = false;
  @Input() check: boolean = false;
  @Output() viewMessage: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleCheck: EventEmitter<{
    id: string;
    check: boolean;
  }> = new EventEmitter<{
    id: string;
    check: boolean;
  }>();
}
