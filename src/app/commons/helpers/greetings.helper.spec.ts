import { initGreeting } from '@commons/helpers/greetings.helper';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@test-helpers/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SPECIAL_DATES } from '../constants/special-dates';

describe('initGreeting', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IonicModule, TestingModule],
        providers: [TranslateService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  it('should be return text morning', () => {
    jasmine.clock().install();
    const translateService: TranslateService = TestBed.inject(TranslateService);
    const hour = new Date('Fri Sep 03 2020 10:08:08 GMT-0500');
    jasmine.clock().mockDate(hour);
    expect(
      initGreeting(
        'morning',
        'afternoon',
        'night',
        'birthday',
        SPECIAL_DATES,
        translateService
      )
    ).toBe('morning');
    jasmine.clock().uninstall();
  });

  it('should be return text afternoon', () => {
    jasmine.clock().install();
    const translateService: TranslateService = TestBed.inject(TranslateService);
    const hour = new Date('Fri Sep 03 2020 12:08:08 GMT-0500');
    jasmine.clock().mockDate(hour);
    expect(
      initGreeting(
        'morning',
        'afternoon',
        'night',
        'birthday',
        SPECIAL_DATES,
        translateService
      )
    ).toBe('afternoon');
    jasmine.clock().uninstall();
  });

  it('should be return text night', () => {
    jasmine.clock().install();
    const translateService: TranslateService = TestBed.inject(TranslateService);
    const hour = new Date('Fri Sep 03 2020 20:08:08 GMT-0500');
    jasmine.clock().mockDate(hour);
    expect(
      initGreeting(
        'morning',
        'afternoon',
        'night',
        'birthday',
        SPECIAL_DATES,
        translateService
      )
    ).toBe('night');
    jasmine.clock().uninstall();
  });
});
