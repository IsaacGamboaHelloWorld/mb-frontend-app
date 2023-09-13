import { Injectable, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';

import {
  IConfigTemplate,
  initConfigTemplate,
  IRouterTemplate
} from '@commons/velocity/templates/utils/entities/config.entities';

@Injectable({
  providedIn: 'root'
})
export class ConfigTemplateService {
  @ViewChild(IonContent) ionContent: IonContent;
  private _config: IConfigTemplate = initConfigTemplate;
  private _step: number = 1;

  constructor(private _navController: NavController) {}

  get config(): IConfigTemplate {
    return this._config;
  }

  get step(): number {
    return this._step;
  }

  public setStep(step: number): void {
    this._step = step;
  }

  public changeStep(router: IRouterTemplate, addDefault: boolean = true): void {
    this.setStep(router.step);
    addDefault
      ? this._navController
          .navigateForward([this._config.defaultUrl + router.url])
          .then()
      : this._navController.navigateRoot([router.url]).then();
    this.config.ionContent?.scrollToTop();
  }

  public setConfig(config: IConfigTemplate): void {
    this._config = config;
  }

  public resetConfig(): void {
    this._config = initConfigTemplate;
    this._step = 1;
  }

  public back(): void {
    const step = this._step - 1;
    if (step < 1) {
      this.changeStep(
        {
          url: this._config?.beforeUrl,
          step: 1
        },
        false
      );
    } else {
      this.changeStep(this._config.router[step - 1]);
    }
  }
}
