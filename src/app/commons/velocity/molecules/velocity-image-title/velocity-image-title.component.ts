import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-image-title',
  templateUrl: './velocity-image-title.component.html',
  styleUrls: ['./velocity-image-title.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityImageTitleComponent {
  @Input() img: string;
  @Input() title: string;
  @Input() description: string;
  @Input() big?: boolean = false;

  constructor() {}

  get hasImage(): boolean {
    return !!this.img;
  }

  get hasTitle(): boolean {
    return !!this.title;
  }

  get hasDescription(): boolean {
    return !!this.description;
  }
}
