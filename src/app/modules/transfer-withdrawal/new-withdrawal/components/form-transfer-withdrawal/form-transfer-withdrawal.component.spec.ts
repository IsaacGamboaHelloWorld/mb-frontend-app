import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormTransferWithdrawalComponent } from './form-transfer-withdrawal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '@test-helpers/testing.module';
import { TransferWithdrawalFacade } from '@modules/transfer-withdrawal/new-withdrawal/transfer-withdrawal.facade';
import { TransferWithdrawalFacadeMock } from '@test-helpers/mocks/facade/transfer-withdrawal.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

describe('FormTransferWithdrawalComponent', () => {
  let component: FormTransferWithdrawalComponent;
  let fixture: ComponentFixture<FormTransferWithdrawalComponent>;
  let saveDataTemplateService: SaveDataTemplateService;

  let dataTemplateMock = {
    toWho: {
      from: 'mockFrom',
      documentId: 'mockDocument',
      amount: {
        value: 'mockAmount'
      }
    },
    howMuch: null,
    when: null,
    confirmation: null,
    success: null,
    stepActive: 'toWho',
    finish: false
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormTransferWithdrawalComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: TransferWithdrawalFacade,
            useClass: TransferWithdrawalFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormTransferWithdrawalComponent);
      saveDataTemplateService = TestBed.inject(SaveDataTemplateService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return amount value', () => {
    saveDataTemplateService.saveDataTemplate(dataTemplateMock);
    component.ngOnInit();
    let amount = component.amount.value;
    expect(amount).toEqual('mockAmount');
  });

  it('should return documentId value', () => {
    saveDataTemplateService.saveDataTemplate(dataTemplateMock);
    component.ngOnInit();
    let documentId = component.documentId.value;
    expect(documentId).toEqual('mockDocument');
  });

  it('should return currency', () => {
    let currency = component.configCurrency;
    expect(currency).toEqual({
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalMark: ',',
      delimiter: '.',
      numeralPositiveOnly: true,
      prefix: '$ ',
      noImmediatePrefix: true,
      numeralDecimalScale: 0
    });
  });

  it('should return click', () => {
    let click = component.changeAccount();
    expect(click).toEqual(undefined);
  });
});
