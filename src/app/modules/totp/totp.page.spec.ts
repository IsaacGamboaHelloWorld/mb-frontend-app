import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TotpPage } from './totp.page';
import { TotpService } from '@modules/totp/services/totp.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('TotpPage', () => {
  let component: TotpPage;
  let fixture: ComponentFixture<TotpPage>;
  let totpService: TotpService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TotpPage],
        imports: [IonicModule, TestingModule],
        providers: [TotpService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TotpPage);
      component = fixture.componentInstance;
      totpService = fixture.debugElement.injector.get(TotpService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ionViewWillEnter works correctly', () => {
    const spy = spyOn(totpService, 'fetchTotp').and.callThrough();
    component.ionViewDidLeave();
    component.ionViewWillEnter();
    expect(spy).toHaveBeenCalled();
  });
  it('getBucketTime return a number', () => {
    const bucketTime = TotpPage.getBucketTime();
    TotpPage.progress(12);
    expect(bucketTime).toBeInstanceOf(Number);
    expect(bucketTime).not.toBeNull();
    expect(bucketTime).not.toBeNaN();
  });
});
