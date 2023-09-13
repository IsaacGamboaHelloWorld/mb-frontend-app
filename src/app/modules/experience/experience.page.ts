import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { validateExperience } from '@modules/experience/mappers/redirect.mapper';
import { HOME } from '@commons/constants/navigatie-global';
import { IExperienceState } from '@modules/experience/store/experience.state';
import { AbstractExperienceComponent } from '@modules/experience/abstract-experience.component';
import { StepExperienceType } from '@modules/experience/constants/steps';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ExperiencePage extends AbstractExperienceComponent {
  private _subs: Subscription[] = [];

  constructor(
    private navController: NavController,
    protected injector: Injector,
    private navCtrl: NavController
  ) {
    super(injector);
  }

  get stepExperienceType(): typeof StepExperienceType {
    return StepExperienceType;
  }

  ionViewWillEnter(): void {
    this._listenStep();
    this.submitForm({});
  }

  ionViewDidLeave(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
    this.facade.resetExperience();
  }

  public showHeader(step: string): boolean {
    return !!step && step !== this.stepExperienceType.COMPLETED;
  }

  public back(): void {
    this.navController.navigateRoot([HOME]);
  }

  public showBigHeader(step: string): boolean {
    return (
      step === this.stepExperienceType.INIT_PIN_OTP_FLOW ||
      step === this.stepExperienceType.FILL_SECURITY_QUESTION ||
      step === this.stepExperienceType.FILL_OTP_DATA ||
      step === this.stepExperienceType.COMPLETED ||
      step ===
        this.stepExperienceType.RETRIES_LIMIT_EXCEED_ON_LOAD_ENROLLMENT_OTP ||
      step ===
        this.stepExperienceType
          .RETRIES_LIMIT_EXCEED_ON_FILL_SECURITY_QUESTION ||
      step === this.stepExperienceType.SERVICE_ERROR
    );
  }

  private _listenStep(): void {
    this._subs.push(
      this.facade.contentExperience$
        .pipe(
          filter((state: IExperienceState) => !state.loading),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          validateExperience(this.facade, data, this.navCtrl);
        })
    );
  }

  get listItems() {
    return new Array(4);
  }
}
