import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '@app/commons/services/modal.service';
import {
  POCKETS_HOME,
  POCKETS_ONBOARDING
} from '@commons/constants/navigatie-global';
import { KEYS } from '@commons/constants/global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { IProductDetailInformation } from '@modules/detail/product-detail/entities/product-detail.entities';

@Component({
  selector: 'app-cont-modal-pockets',
  templateUrl: './cont-modal-pockets.component.html',
  styleUrls: ['./cont-modal-pockets.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContModalPocketsComponent {
  @Input() product: IProductDetailInformation;
  @Input() footnotes: string = '';
  @Input() btn: string;

  constructor(
    public modalService: ModalService,
    private router: Router,
    private securityStorageService: AdlSecureStorageService
  ) {}

  public async redirect(): Promise<void> {
    !Boolean(
      await this.securityStorageService.get(KEYS.SHOW_ONBOARDING_POCKETS)
    )
      ? await this.router.navigate([POCKETS_ONBOARDING])
      : await this.router.navigate([POCKETS_HOME]);
  }
}
