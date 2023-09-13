import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PageVoucherComponent } from 'src/app/commons/velocity/templates/utils/components/page-voucher/page-voucher.component';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('PageVoucherComponent', () => {
  let component: PageVoucherComponent;
  let saveDataTemplateService: SaveDataTemplateService;
  let configTemplateService: ConfigTemplateService;
  let fixture: ComponentFixture<PageVoucherComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PageVoucherComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          PageVoucherComponent,
          ChangeDetectorRef,
          ConfigTemplateService,
          SaveDataTemplateService
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PageVoucherComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();

      saveDataTemplateService = TestBed.inject(SaveDataTemplateService);
      configTemplateService = TestBed.inject(ConfigTemplateService);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true ( ngOnInit() )', () => {
    let template = {
      toWho: null,
      howMuch: null,
      when: null,
      confirmation: null,
      success: null,
      stepActive: 'success',
      finish: false
    };
    saveDataTemplateService.saveDataTemplate(template);

    component.ngOnInit();
    saveDataTemplateService.setUpdateComponent(true);

    expect(saveDataTemplateService.dataTemplate.finish).toEqual(true);
  });

  it('Should return ( actionButtons equal primary )', (done: DoneFn) => {
    let config = {
      beforeUrl: '/',
      defaultUrl: '/',
      toWho: null,
      router: [],
      ionContent: null,
      lineTime: [],
      emitButtons: true
    };
    configTemplateService.setConfig(config);
    component.buttonPrimary();

    saveDataTemplateService.updateActionButtons$.subscribe((resp) => {
      expect(resp).toEqual('primary');
      done();
    });
  });

  it('Should return ( actionButtons equal secondary )', (done: DoneFn) => {
    let config = {
      beforeUrl: '/',
      defaultUrl: '/',
      toWho: null,
      router: [],
      ionContent: null,
      lineTime: [],
      emitButtons: true
    };
    configTemplateService.setConfig(config);
    component.buttonSecondary();
    saveDataTemplateService.updateActionButtons$.subscribe((resp) => {
      expect(resp).toEqual('secondary');
      done();
    });
  });

  it('Should step equal 2', () => {
    let config = {
      beforeUrl: '/',
      defaultUrl: '/',
      toWho: null,
      router: [],
      ionContent: null,
      lineTime: [],
      emitButtons: false
    };
    configTemplateService.setConfig(config);
    let routerC = {
      url: '/',
      step: 2
    };

    let data = {
      beforeUrl: '/',
      defaultUrl: '/',
      toWho: null,
      router: [routerC],
      ionContent: null,
      lineTime: [],
      emitButtons: false
    };
    configTemplateService.setConfig(data);

    component.buttonSecondary();
    expect(configTemplateService.step).toEqual(2);
  });

  it('should return step equal 1', () => {
    let template = {
      toWho: null,
      howMuch: null,
      when: null,
      confirmation: null,
      success: null,
      stepActive: 'success',
      finish: false
    };
    saveDataTemplateService.saveDataTemplate(template);

    let config = {
      beforeUrl: '/',
      defaultUrl: '/',
      toWho: null,
      router: [],
      ionContent: null,
      lineTime: [],
      emitButtons: false
    };
    configTemplateService.setConfig(config);
    component.buttonPrimary();
    expect(configTemplateService.step).toEqual(1);
  });

  it('Should return correct values in getters', () => {
    let toWhoMock = {
      voucher: null,
      buttonFirst: {
        name: 'buttonFirstMock',
        className: 'classNameFMock'
      },
      buttonSecond: {
        name: 'buttonSecondMock',
        className: 'classNameSMock'
      }
    };

    let template = {
      toWho: toWhoMock,
      howMuch: null,
      when: null,
      confirmation: null,
      success: 'successMock',
      stepActive: 'toWho',
      finish: false
    };
    saveDataTemplateService.saveDataTemplate(template);

    component.infoVoucher;

    expect(component.infoVoucher).toEqual({
      voucher: null,
      buttonFirst: {
        name: 'buttonFirstMock',
        className: 'classNameFMock'
      },
      buttonSecond: {
        name: 'buttonSecondMock',
        className: 'classNameSMock'
      }
    });

    let first = component.hasBtnFirst;
    expect(first).toEqual(true);
    let second = component.hasBtnSecond;
    expect(second).toEqual(true);
  });
});
