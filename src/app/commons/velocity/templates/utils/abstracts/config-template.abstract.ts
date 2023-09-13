import {
  ComponentFactoryResolver,
  Directive,
  Injector,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { NavController } from '@ionic/angular';

import { InjectComponentDirective } from '@commons/velocity/templates/basic-template/directives/inject-component.directive';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ConfigTemplateAbstract {
  @ViewChild(InjectComponentDirective) tabHost: InjectComponentDirective;
  private _viewContainerRef: ViewContainerRef;
  private _componentFactoryResolver: ComponentFactoryResolver;
  private _configService: ConfigTemplateService;
  private _navCtrl: NavController;
  private _saveDataTemplateService: SaveDataTemplateService;

  protected constructor(protected injector: Injector) {
    this._viewContainerRef = injector.get(ViewContainerRef);
    this._componentFactoryResolver = injector.get(ComponentFactoryResolver);
    this._configService = injector.get(ConfigTemplateService);
    this._navCtrl = injector.get(NavController);
    this._saveDataTemplateService = injector.get(SaveDataTemplateService);
  }

  protected injectComponent(componentType: Type<any>): void {
    if (!!componentType) {
      this._viewContainerRef.detach();
      this._viewContainerRef.clear();
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        componentType
      );
      this._viewContainerRef = this.tabHost.viewContainerRef;

      const componentRef = this._viewContainerRef.createComponent(
        componentFactory
      );
    }
  }

  get step(): number {
    return this._configService.step;
  }

  get configTemplate(): IConfigTemplate {
    return this._configService.config;
  }

  public resetTemplate(): void {
    this._saveDataTemplateService.resetDataTemplate();
    this._configService.resetConfig();
  }

  public actionButton(): void {
    this._saveDataTemplateService.setActionConfirm(true);
  }
}
