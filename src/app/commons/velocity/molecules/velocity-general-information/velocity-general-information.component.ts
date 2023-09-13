import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input
} from '@angular/core';

@Component({
  selector: 'velocity-general-information',
  templateUrl: './velocity-general-information.component.html',
  styleUrls: ['./velocity-general-information.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityGeneralInformationComponent {
  @Input() img: string;
  @Input() title: string;
  @Input() value: string;
  @Input() description: string;

  get hasDescription(): boolean {
    return !!this.description;
  }
}
