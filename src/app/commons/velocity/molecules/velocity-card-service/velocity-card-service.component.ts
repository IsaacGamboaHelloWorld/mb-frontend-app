import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'velocity-card-service',
  templateUrl: './velocity-card-service.component.html',
  styleUrls: ['./velocity-card-service.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardServiceComponent {
  @Input() img: string;
  @Input() title: string;
  @Input() description: string;
  @Input() id: string = '';
  @Input() enabled: boolean = true;
  @Input() hasPermission: boolean = true;
  @Input() url: string;
  @Output() actionClick: EventEmitter<{
    enable: boolean;
    url: string;
  }> = new EventEmitter<{
    enable: boolean;
    url: string;
  }>();

  get hasDescription(): boolean {
    return !!this.description;
  }

  get hasAnimation(): boolean {
    return this.img?.split('.')[1] === 'json';
  }
}
