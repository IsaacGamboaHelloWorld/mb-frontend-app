import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-line-time',
  templateUrl: './velocity-line-time.component.html',
  styleUrls: ['./velocity-line-time.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityLineTimeComponent {
  @Input() step: number = 1;
  @Input() items: string[] = [];
  @Input() classIcon: string = 'icon-check';

  constructor() {}

  public isSuccess(index: number): string | number {
    return this.step > index + 1 ? '<i class="icon-vel-check"></i>' : index + 1;
  }
}
