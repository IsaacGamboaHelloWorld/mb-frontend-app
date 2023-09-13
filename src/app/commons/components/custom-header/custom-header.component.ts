import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomHeaderComponent {
  @Input() size: 'medium' | 'big';

  constructor() {}
}
