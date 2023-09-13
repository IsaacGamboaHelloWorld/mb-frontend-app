import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { OtpRedeemTuplusComponent } from './otp-redeem-tuplus.component';
import { TestingModule } from '@test-helpers/testing.module';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';

describe('OtpRedeemTuplusComponent', () => {
  let component: OtpRedeemTuplusComponent;
  let fixture: ComponentFixture<OtpRedeemTuplusComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtpRedeemTuplusComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: TuplusFacade
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
      fixture = TestBed.createComponent(OtpRedeemTuplusComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
