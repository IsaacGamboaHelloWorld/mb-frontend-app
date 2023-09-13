import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { IDataUser } from '@modules/main-container/entities/user.entities';
import { POCKETS_HOME } from '@commons/constants/navigatie-global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { IPocketsByProduct } from '@commons/entities/pockets.entities';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class OnBoardingPage implements OnInit {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _username: string;
  private _showingSlides: boolean = false;
  private _pockets: IPocketsByProduct;
  public slideOpts: any = {
    initialSlide: 0,
    effect: 'slide',
    spaceBetween: -35
  };
  constructor(
    private facade: PocketsFacade,
    private router: Router,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit(): void {
    this._obtainUserName();
    this._obtainProduct();
  }

  private _obtainUserName(): void {
    this.facade.dataUser$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: IDataUser) => (this._username = data?.firstName));
  }

  private async _obtainProduct(): Promise<void> {
    const activeProduct = await this.secureStorage.get(KEYS.ACTIVE_PRODUCT);
    !!activeProduct && this._obtainPockets(JSON.parse(activeProduct));
  }

  private _obtainPockets(product: { id: string; type: string }): void {
    this.facade
      .findPocket$(product.id, product.type)
      .pipe(takeUntil(this._destroy$))
      .subscribe((pockets: IPocketsByProduct) => (this._pockets = pockets));
  }

  get showingSlides(): boolean {
    return this._showingSlides;
  }

  get userName(): string {
    return this._username;
  }

  get buttonText(): string {
    return this._pockets?.pockets?.length > 0
      ? 'POCKETS.ONBOARDING.VIEW_POCKETS'
      : 'POCKETS.ONBOARDING.NEW_POCKET';
  }

  public showSlides(): void {
    this._showingSlides = !this.showingSlides;
  }

  public goHome(): void {
    this.secureStorage.put(KEYS.SHOW_ONBOARDING_POCKETS, 'true', true);
    this.router.navigate([POCKETS_HOME]);
  }

  public close(): void {
    this.router.navigate(['/']);
  }
}
