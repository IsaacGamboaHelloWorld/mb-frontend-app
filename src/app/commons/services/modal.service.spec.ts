import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';

import { ModalService } from './modal.service';

class TestComponent {}

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ModalController,
          useValue: {
            create: () => ({ dismiss: () => {}, present: () => {} })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return component', async () => {
    await service.openModal(TestComponent, {});
    expect(service.modal).toBeDefined();
    setTimeout(() => {
      service.setActionButton('primary');
      service.actionButtonModal$.subscribe((data) => service.close());
    }, 100);
    service.actionCloseModal$.subscribe();
    service.close();
  });
});
