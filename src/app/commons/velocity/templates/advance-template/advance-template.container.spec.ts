import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvanceTemplateContainer } from '@commons/velocity/templates/advance-template/advance-template.container';
import { TestingModule } from '@test-helpers/testing.module';

describe('AdvanceTemplateComponent', () => {
  let component: AdvanceTemplateContainer;
  let fixture: ComponentFixture<AdvanceTemplateContainer>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdvanceTemplateContainer],
        imports: [IonicModule, TestingModule]
      }).compileComponents();

      fixture = TestBed.createComponent(AdvanceTemplateContainer);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
