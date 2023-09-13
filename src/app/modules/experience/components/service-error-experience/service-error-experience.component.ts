import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NavController } from '@ionic/angular';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PageView } from '@commons/decorators/page-view.decorator';
import { UrlExperience } from '@commons/constants/url-experience';
import { HOME } from '@commons/constants/navigatie-global';
import { AbstractExperienceComponent } from '@modules/experience/abstract-experience.component';

@PageView(UrlExperience.SERVICE_ERROR, UrlExperience.SERVICE_ERROR)
@Component({
  selector: '[app-service-error-experience]',
  templateUrl: './service-error-experience.component.html',
  styleUrls: ['./service-error-experience.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceErrorExperienceComponent extends AbstractExperienceComponent
  implements OnInit {
  public errorCode: string;
  private _subs: Subscription[] = [];

  constructor(
    private navController: NavController,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this._obtainData();
  }

  public back(): void {
    this.navController.navigateRoot([HOME]);
  }

  private _obtainData(): void {
    this._subs.push(
      this.facade.contentExperience$
        .pipe(
          filter((state) => !state.loading),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          !!data.content.additionalErrorCode
            ? (this.errorCode = data.content.additionalErrorCode)
            : (this.errorCode = data.content.errorCode);
        })
    );
  }
}
