import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LimitExceedComponent } from './limit-exceed.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('LimitExceedComponent', () => {
  let component: LimitExceedComponent;
  let fixture: ComponentFixture<LimitExceedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LimitExceedComponent],
        imports: [IonicModule, TestingModule]
      }).compileComponents();

      fixture = TestBed.createComponent(LimitExceedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
