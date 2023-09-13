import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-box-input',
  templateUrl: './velocity-box-input.component.html',
  styleUrls: ['./velocity-box-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityBoxInputComponent {
  @Input() title: string;
  @Input() description: string;

  get hasDescription(): boolean {
    return !!this.description;
  }
}
