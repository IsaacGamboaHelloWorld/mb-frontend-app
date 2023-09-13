import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-custom-message',
  templateUrl: './velocity-custom-message.component.html',
  styleUrls: ['./velocity-custom-message.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityCustomMessageComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() id: number;
  @Input() deactivate: boolean;
  @Input() isLoading: boolean;
  @Output() viewCard: EventEmitter<void> = new EventEmitter<void>();
}
