import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-toast',
  templateUrl: './velocity-toast.component.html',
  styleUrls: ['./velocity-toast.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityToastComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() type:
    | 'toast-normal'
    | 'toast-warning'
    | 'toast-success'
    | 'toast-error' = 'toast-normal';

  get hasIcon(): boolean {
    return !!this.icon;
  }

  get hasTitle(): boolean {
    return !!this.title;
  }

  get hasDescription(): boolean {
    return !!this.description;
  }
}
