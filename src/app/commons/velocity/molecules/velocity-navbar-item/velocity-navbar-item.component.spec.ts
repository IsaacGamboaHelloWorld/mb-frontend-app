import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { VelocityNavbarItemComponent } from './velocity-navbar-item.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PageOpenAccountService } from '@commons/velocity/pages/utils/page-open-account.service';
import { GenericHomeService } from '@app/commons/utils/generic-home.service';

describe('VelocityNavbarItemComponent', () => {
  let component: VelocityNavbarItemComponent;
  let fixture: ComponentFixture<VelocityNavbarItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityNavbarItemComponent],
        imports: [IonicModule, TestingModule],
        providers: [PageOpenAccountService, GenericHomeService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityNavbarItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
