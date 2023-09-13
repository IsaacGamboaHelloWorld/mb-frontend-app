import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMovementsState } from '@modules/detail/product-detail/store/states/movements.state';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { Params } from '@angular/router';

@Injectable()
export class ProductDetailFacadeMock extends MainContainerFacadeMock {
  public movements$: Observable<IMovementsState> = new BehaviorSubject(null);
  public routerParams$: Observable<Params> = new BehaviorSubject(null);

  public fetchMovements(): void {}
  public resetMovements(): void {}
  public fetchPockets(): void {}
}
