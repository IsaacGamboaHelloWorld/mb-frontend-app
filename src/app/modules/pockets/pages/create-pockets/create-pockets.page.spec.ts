import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CreatePocketsPage } from './create-pockets.page';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { HomePocketsFacadeMock } from '@test-helpers/mocks/facade/home-pockets.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

describe('CreatePocketsPage', () => {
  let component: CreatePocketsPage;
  let fixture: ComponentFixture<CreatePocketsPage>;
  let configTemplateService: ConfigTemplateService;
  let pocketsFacadeService: PocketsFacade;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CreatePocketsPage],
        imports: [IonicModule, TestingModule],
        providers: [
          ConfigTemplateService,
          {
            provide: PocketsFacade,
            useClass: HomePocketsFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(CreatePocketsPage);
      component = fixture.componentInstance;
      configTemplateService = fixture.debugElement.injector.get(
        ConfigTemplateService
      );
      pocketsFacadeService = fixture.debugElement.injector.get(PocketsFacade);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
