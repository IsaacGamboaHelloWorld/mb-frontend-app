import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from 'src/app/modules/main-container/services/products.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('AllProductsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ProductsService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return Observable< IRespondServiceProducts >', (done: DoneFn) => {
    service.allProducts().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    const url = urlBuilder.services(environment.api.services.products.all);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({
      success: true,
      products: null,
      errorMessage: ''
    });
  });

  it('should be return Observable< IProduct >', () => {
    service
      .detailProduct('test', '1234')
      .subscribe((data) => expect(data).toBeNull());

    const url = urlBuilder.services(environment.api.services.products.detail);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should be return Observable< IPockets >', () => {
    service.fetchPockets().subscribe((data) => expect(data).toBeNull());

    const url = urlBuilder.services(environment.api.services.pockets.home);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should be return an Observable IPocketDetailResponse', () => {
    service.pocketDetail(null).subscribe((data) => expect(data).toBeNull());

    const url = urlBuilder.services(environment.api.services.pockets.detail);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should be return Observable< IRollLoans >', () => {
    service.fetchRollLoans().subscribe((data) => expect(data).toBeNull());

    const url = urlBuilder.services(
      environment.api.services.products.payrollloans
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });
});
